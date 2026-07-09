(function () {
  if (window.TIANCE_ANALYTICS_DISABLED) {
    return;
  }

  const endpoint = window.TIANCE_PUBLIC_CONFIG_ENDPOINT || "/api/public-config";
  const pendingEvents = [];
  let googleAnalyticsReady = false;

  const normalizeEventName = (eventName) =>
    String(eventName || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "");

  const cleanProperties = (properties) => {
    const cleaned = {};

    Object.entries(properties || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return;
      }

      cleaned[key] = typeof value === "string" ? value.slice(0, 120) : value;
    });

    return cleaned;
  };

  const sendGoogleAnalyticsEvent = (eventName, properties) => {
    if (typeof window.gtag !== "function" || !googleAnalyticsReady) {
      pendingEvents.push([eventName, properties]);
      return;
    }

    window.gtag("event", eventName, cleanProperties(properties));
  };

  window.tianceTrack = (eventName, properties = {}) => {
    const normalizedName = normalizeEventName(eventName);

    if (!normalizedName) {
      return;
    }

    sendGoogleAnalyticsEvent(normalizedName, {
      page_title: document.title,
      page_location: window.location.href,
      ...properties,
    });
  };

  const flushPendingEvents = () => {
    while (pendingEvents.length > 0) {
      const [eventName, properties] = pendingEvents.shift();
      window.gtag("event", eventName, cleanProperties(properties));
    }
  };

  const installGoogleAnalytics = (measurementId) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      measurementId
    )}`;
    script.addEventListener("load", () => {
      googleAnalyticsReady = true;
      flushPendingEvents();
    });
    document.head.append(script);
  };

  const installSearchConsoleMeta = (verificationToken) => {
    if (!verificationToken) {
      return;
    }

    if (document.querySelector('meta[name="google-site-verification"]')) {
      return;
    }

    const meta = document.createElement("meta");
    meta.name = "google-site-verification";
    meta.content = verificationToken;
    document.head.append(meta);
  };

  const installMicrosoftClarity = (projectId) => {
    if (!projectId || typeof window.clarity === "function") {
      return;
    }

    window.clarity = function clarity() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
    document.head.append(script);
  };

  const trackApplicationClick = (link) => {
    window.tianceTrack("cta_clicked", {
      cta_type: link.dataset.applicationCta,
      cta_source: link.dataset.applicationSource,
      link_url: link.href,
      link_text: link.textContent.trim(),
    });
  };

  const trackContactLinkClick = (link) => {
    if (link.dataset.applicationCta) {
      return;
    }

    const href = link.getAttribute("href") || "";
    let contactMethod = "";

    if (href.startsWith("mailto:")) {
      contactMethod = "email";
    } else if (href.includes("t.me/")) {
      contactMethod = "telegram";
    } else if (href.includes("discord.gg/")) {
      contactMethod = "discord";
    }

    if (!contactMethod) {
      return;
    }

    window.tianceTrack("contact_link_clicked", {
      contact_method: contactMethod,
      link_url: link.href,
      link_text: link.textContent.trim(),
    });
  };

  document.addEventListener("click", (event) => {
    const target =
      event.target instanceof Element ? event.target : event.target?.parentElement;

    if (!target) {
      return;
    }

    const applicationLink = target.closest("[data-application-cta]");
    if (applicationLink) {
      trackApplicationClick(applicationLink);
      return;
    }

    const contactLink = target.closest("a[href]");
    if (contactLink) {
      trackContactLinkClick(contactLink);
    }
  });

  fetch(endpoint, {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  })
    .then((response) => (response.ok ? response.json() : null))
    .then((config) => {
      if (!config?.ok) {
        return;
      }

      installSearchConsoleMeta(config.googleSiteVerification);

      if (config.googleAnalyticsId) {
        installGoogleAnalytics(config.googleAnalyticsId);
      }

      if (config.clarityProjectId) {
        installMicrosoftClarity(config.clarityProjectId);
      }
    })
    .catch(() => {
      // Analytics must never block the site.
    });
})();
