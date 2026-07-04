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
const applicationModal = document.querySelector("[data-application-modal]");
const applicationModalBody = document.querySelector("[data-application-modal-body]");
const applicationModalOpen = document.querySelector("[data-application-modal-open]");
const applicationModalClose = document.querySelector("[data-application-modal-close]");

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

const validateContactForm = () => {
  const fields = Array.from(contactForm?.querySelectorAll("input[required], textarea[required]") || []);
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

  if (!validateContactForm()) {
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
  navMenuToggle?.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
};

mobileNavDisclosure?.addEventListener("toggle", () => {
  const isOpen = mobileNavDisclosure.open;
  nav?.classList.toggle("is-menu-open", isOpen);
  navMenuToggle?.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
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
