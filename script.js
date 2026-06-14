const nav = document.querySelector(".floating-nav");
const videoButton = document.querySelector("[data-video]");
const revealItems = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  nav?.classList.toggle("is-scrolled", window.scrollY > 20);
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
