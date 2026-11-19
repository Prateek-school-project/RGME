document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu");
const navigationLinks = document.querySelector(".links");

if (menuButton && navigationLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigationLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigationLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navigationLinks.classList.remove("open"));
  });
}

const slides = [...document.querySelectorAll(".hero-slide")];
const slideDots = [...document.querySelectorAll(".hero-dot")];
let activeSlide = 0;
let slideTimer;

function showSlide(index) {
  if (!slides.length) return;

  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const isActive = i === activeSlide;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  slideDots.forEach((dot, i) => {
    const isActive = i === activeSlide;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

function startSlider() {
  if (slides.length < 2) return;
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(activeSlide + 1), 6500);
}

if (slides.length) {
  slideDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startSlider();
    });
  });

  document.querySelector("[data-prev]")?.addEventListener("click", () => {
    showSlide(activeSlide - 1);
    startSlider();
  });

  document.querySelector("[data-next]")?.addEventListener("click", () => {
    showSlide(activeSlide + 1);
    startSlider();
  });

  startSlider();
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const admissionForm = document.querySelector("[data-admission-form]");
if (admissionForm) {
  admissionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = admissionForm.querySelector("[data-form-message]");
    message.textContent = "Thank you for your enquiry. This demo form does not send or store submissions; please use the school's official channels for current admission enquiries.";
    message.hidden = false;
    admissionForm.reset();
  });
}

const revealElements = document.querySelectorAll(
  ".section-head, .intro-grid > *, .cards > .card, .achievement-item, .gallery-item, .notice-panel",
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => {
    element.classList.add("scroll-reveal");
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("in-view"));
}
