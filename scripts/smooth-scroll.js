export default class SmoothScroll {
  constructor() {
    this.linksInternos = document.querySelectorAll('.menu-list a[href^="#"]');
  }

  bindEvents() {
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  addEventListener() {
    this.linksInternos.forEach((link) => {
      link.addEventListener("click", this.scrollToSection);
    });
  }

  init() {
    this.bindEvents();
    this.addEventListener();
  }
}
