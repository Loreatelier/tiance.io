const nav = document.querySelector(".floating-nav");
const mobileNavDisclosure = document.querySelector(".mobile-nav-disclosure");
const navMenuToggle = document.querySelector(".nav-menu-toggle");
const mobileNavMenu = document.querySelector(".mobile-nav-menu");
const videoButton = document.querySelector("[data-video]");
const revealItems = document.querySelectorAll(".reveal");

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
