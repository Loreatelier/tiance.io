const nav = document.querySelector(".floating-nav");
const mobileNavDisclosure = document.querySelector(".mobile-nav-disclosure");
const navMenuToggle = document.querySelector(".nav-menu-toggle");
const mobileNavMenu = document.querySelector(".mobile-nav-menu");
const videoButton = document.querySelector("[data-video]");
const revealItems = document.querySelectorAll(".reveal");
const applicationCtas = document.querySelectorAll("[data-application-cta]");
const contactTabButtons = document.querySelectorAll("[data-contact-tab]");
const contactPanels = document.querySelectorAll("[data-contact-panel]");
const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const applicationForm = document.querySelector("[data-application-form]");
const applicationStatus = document.querySelector("[data-application-status]");
const contactCopyButtons = document.querySelectorAll("[data-copy]");
const applicationModal = document.querySelector("[data-application-modal]");
const applicationModalBody = document.querySelector("[data-application-modal-body]");
const applicationModalOpen = document.querySelector("[data-application-modal-open]");
const applicationModalClose = document.querySelector("[data-application-modal-close]");
const testimonialTrack = document.querySelector(".testimonial-track");
const faqDetails = document.querySelectorAll(".faq-list details");
const localeChoiceLinks = document.querySelectorAll("[data-locale-choice]");

const requestTypeByCta = {
  review: "Review Application",
  general: "General Application",
  pricing: "Pricing Estimate",
};

const sourceByCta = {
  hero: "Hero Apply for Review",
  workflow: "Workflow Apply",
  pricing: "Pricing Estimate",
  footer: "Footer Apply for Review",
};

localeChoiceLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const locale = link.dataset.localeChoice;
    if (locale === "en" || locale === "zh") {
      document.cookie = `tiance_locale=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`;
    }
  });
});

const trackTianceEvent = (eventName, properties = {}) => {
  if (typeof window.tianceTrack === "function") {
    window.tianceTrack(eventName, properties);
  }
};

const applicationFormUrl = window.TIANCE_APPLICATION_FORM_URL;

if (applicationFormUrl) {
  applicationCtas.forEach((cta) => {
    const requestType = requestTypeByCta[cta.dataset.applicationCta];
    const sourceCta = sourceByCta[cta.dataset.applicationSource];

    try {
      const url = new URL(applicationFormUrl, window.location.href);
      if (requestType) {
        url.searchParams.set("request_type", requestType);
      }
      if (sourceCta) {
        url.searchParams.set("source_cta", sourceCta);
      }
      url.searchParams.set("source_url", window.location.href);
      cta.href = url.toString();
    } catch {
      cta.href = applicationFormUrl;
    }
  });
}

contactTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeTab = button.dataset.contactTab;
    trackTianceEvent("contact_tab_selected", { tab_name: activeTab });

    contactTabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    contactPanels.forEach((panel) => {
      const isActive = panel.dataset.contactPanel === activeTab;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});

faqDetails.forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    faqDetails.forEach((item) => {
      if (item !== detail) {
        item.open = false;
      }
    });
  });
});

const openContactTab = (activeTab) => {
  const targetButton = document.querySelector(`[data-contact-tab="${activeTab}"]`);

  if (!targetButton) {
    return;
  }

  contactTabButtons.forEach((item) => {
    const isActive = item === targetButton;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  contactPanels.forEach((panel) => {
    const isActive = panel.dataset.contactPanel === activeTab;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

if (window.location.hash === "#apply") {
  openContactTab("apply");
}

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#apply") {
    openContactTab("apply");
  }
});

const copyText = async (value) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

contactCopyButtons.forEach((button) => {
  const defaultLabel = button.getAttribute("aria-label") || "Copy";

  button.addEventListener("click", async () => {
    const value = button.dataset.copy;

    if (!value) {
      return;
    }

    try {
      await copyText(value);
      button.classList.add("is-copied");
      button.setAttribute("aria-label", "Copied");
      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", defaultLabel);
      }, 1400);
    } catch {
      button.setAttribute("aria-label", "Copy failed");
      window.setTimeout(() => {
        button.setAttribute("aria-label", defaultLabel);
      }, 1400);
    }
  });
});

const getContactFieldLabel = (field) => field.closest("label")?.querySelector("span")?.textContent?.trim() || "This field";

const getContactFieldError = (field) => {
  if (field.validity.valueMissing) {
    return `${getContactFieldLabel(field)} is required.`;
  }

  if (field.validity.typeMismatch) {
    return "Enter a valid email address.";
  }

  return "";
};

const clearContactFieldError = (field) => {
  const label = field.closest("label");
  const error = label?.querySelector(".field-error-popover");
  label?.classList.remove("has-field-error");
  error?.remove();
  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");
};

const showContactFieldError = (field, message) => {
  const label = field.closest("label");

  if (!label) {
    return;
  }

  const fieldKey = field.name || field.id || "field";
  const errorId = `contact-${fieldKey}-error`;
  let error = label.querySelector(".field-error-popover");

  if (!error) {
    error = document.createElement("span");
    error.className = "field-error-popover";
    error.id = errorId;
    error.setAttribute("role", "status");
    label.append(error);
  }

  label.classList.add("has-field-error");
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", errorId);
  error.textContent = message;
};

const validateContactForm = (form = contactForm) => {
  const fields = Array.from(form?.querySelectorAll("input[required], textarea[required]") || []);
  let firstInvalidField;

  fields.forEach((field) => {
    const message = getContactFieldError(field);

    if (message) {
      showContactFieldError(field, message);
      firstInvalidField ||= field;
    } else {
      clearContactFieldError(field);
    }
  });

  if (firstInvalidField) {
    firstInvalidField.scrollIntoView({ block: "center", behavior: "smooth" });
    firstInvalidField.focus({ preventScroll: true });
    return false;
  }

  return true;
};

contactForm?.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") {
      const message = getContactFieldError(field);
      if (message) {
        showContactFieldError(field, message);
      } else {
        clearContactFieldError(field);
      }
    }
  });
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateContactForm(contactForm)) {
    if (contactStatus) {
      contactStatus.textContent = "";
    }
    return;
  }

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());
  const endpoint = window.TIANCE_CONTACT_ENDPOINT || "/api/contact";

  if (contactStatus) {
    contactStatus.textContent = "Preparing your message...";
  }

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      contactForm.reset();
      contactForm.querySelectorAll("input, textarea").forEach(clearContactFieldError);
      if (contactStatus) {
        contactStatus.textContent = "Message sent. We'll follow up by email.";
      }
      trackTianceEvent("form_submitted", {
        form_type: "contact",
        submission_transport: "api",
      });
      return;
    } catch {
      if (contactStatus) {
        contactStatus.textContent = "Direct send is unavailable. Opening your email app instead.";
      }
    }
  }

  const subject = encodeURIComponent(`TIANCE contact request from ${payload.company || payload.name || "website"}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name || ""}`,
      `Company: ${payload.company || ""}`,
      `Business type: ${payload.companyType || ""}`,
      `Email: ${payload.email || ""}`,
      `Phone: ${payload.phone || ""}`,
      "",
      payload.message || "",
    ].join("\n")
  );
  trackTianceEvent("form_submitted", {
    form_type: "contact",
    submission_transport: "mailto",
  });
  window.location.href = `mailto:hello@tiance.io?subject=${subject}&body=${body}`;
});

applicationForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateContactForm(applicationForm)) {
    if (applicationStatus) {
      applicationStatus.textContent = "";
    }
    return;
  }

  const formData = new FormData(applicationForm);
  const sourceParams = new URLSearchParams(window.location.search);
  const regions = formData.getAll("regions");
  const payload = {
    name: String(formData.get("name") || ""),
    company: String(formData.get("company") || ""),
    companyType: String(formData.get("businessCategory") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("handle") || ""),
    message: [
      "TIANCE Merchant Application",
      "",
      `Website or product URL: ${formData.get("website") || ""}`,
      `Business category: ${formData.get("businessCategory") || ""}`,
      `Current payment situation: ${formData.get("paymentSituation") || ""}`,
      `Monthly processing volume: ${formData.get("monthlyVolume") || ""}`,
      `Target customer regions: ${regions.length ? regions.join(", ") : "Not provided"}`,
      `Request type: ${sourceParams.get("request_type") || "Review Application"}`,
      `Source CTA: ${sourceParams.get("source_cta") || "Contact application tab"}`,
      `Source URL: ${sourceParams.get("source_url") || document.referrer || window.location.href}`,
      "",
      "What they need help with:",
      String(formData.get("message") || ""),
    ].join("\n"),
  };
  const endpoint = window.TIANCE_CONTACT_ENDPOINT || "/api/contact";

  if (applicationStatus) {
    applicationStatus.textContent = "Submitting your application...";
  }

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      applicationForm.reset();
      applicationForm.querySelectorAll("input, textarea").forEach(clearContactFieldError);
      if (applicationStatus) {
        applicationStatus.textContent = "Application received. We'll follow up by email.";
      }
      trackTianceEvent("form_submitted", {
        form_type: "application",
        submission_transport: "api",
      });
      return;
    } catch {
      if (applicationStatus) {
        applicationStatus.textContent = "Direct send is unavailable. Opening your email app instead.";
      }
    }
  }

  const subject = encodeURIComponent(`TIANCE merchant application from ${payload.company || payload.name}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Company: ${payload.company}`,
      `Email: ${payload.email}`,
      `Telegram / Discord: ${payload.phone}`,
      "",
      payload.message,
    ].join("\n")
  );
  trackTianceEvent("form_submitted", {
    form_type: "application",
    submission_transport: "mailto",
  });
  window.location.href = `mailto:hello@tiance.io?subject=${subject}&body=${body}`;
});

if (applicationFormUrl && applicationModalBody) {
  applicationModalBody.replaceChildren();
  const applicationIframe = document.createElement("iframe");
  applicationIframe.title = "TIANCE Merchant Application";
  applicationIframe.src = applicationFormUrl;
  applicationModalBody.append(applicationIframe);
}

applicationModalOpen?.addEventListener("click", () => {
  trackTianceEvent("application_modal_opened", {
    source: "contact_apply_panel",
  });
  if (typeof applicationModal?.showModal === "function") {
    applicationModal.showModal();
  }
});

applicationModalClose?.addEventListener("click", () => {
  applicationModal?.close();
});

applicationModal?.addEventListener("click", (event) => {
  if (event.target === applicationModal) {
    applicationModal.close();
  }
});

window.addEventListener("scroll", () => {
  nav?.classList.toggle("is-scrolled", window.scrollY > 20);
});

const setMobileMenu = (isOpen) => {
  nav?.classList.toggle("is-menu-open", isOpen);
  if (mobileNavDisclosure) {
    mobileNavDisclosure.open = isOpen;
  }
  const label = isOpen
    ? activeLocale === "zh"
      ? "关闭导航菜单"
      : "Close navigation menu"
    : activeLocale === "zh"
      ? "打开导航菜单"
      : "Open navigation menu";
  navMenuToggle?.setAttribute("aria-label", label);
};

mobileNavDisclosure?.addEventListener("toggle", () => {
  const isOpen = mobileNavDisclosure.open;
  nav?.classList.toggle("is-menu-open", isOpen);
  const label = isOpen
    ? activeLocale === "zh"
      ? "关闭导航菜单"
      : "Close navigation menu"
    : activeLocale === "zh"
      ? "打开导航菜单"
      : "Open navigation menu";
  navMenuToggle?.setAttribute("aria-label", label);
});

mobileNavMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMobileMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMobileMenu(false);
  }
});

document.addEventListener("click", (event) => {
  if (nav && !nav.contains(event.target)) {
    setMobileMenu(false);
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px 28% 0px", threshold: 0.01 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
  if (item.getBoundingClientRect().top < window.innerHeight * 1.25) {
    item.classList.add("is-visible");
  } else {
    revealObserver.observe(item);
  }
});

videoButton?.addEventListener("click", () => {
  videoButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.97)" },
      { transform: "scale(1)" },
    ],
    { duration: 220, easing: "ease-out" }
  );
});

if (testimonialTrack && !testimonialTrack.dataset.cloned) {
  const testimonialCards = Array.from(testimonialTrack.children);
  testimonialCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    testimonialTrack.append(clone);
  });
  testimonialTrack.dataset.cloned = "true";
}
