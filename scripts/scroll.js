export class SmoothScroll {
  constructor() {
    this.linksInternosMenu = document.querySelectorAll(
      '.menu-list a[href^="#"]'
    );
    this.linksInternosButtons = document.querySelectorAll(
      '.introducao-buttons a[href^="#"]'
    );
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
    this.linksInternosMenu.forEach((link) => {
      link.addEventListener("click", this.scrollToSection);
    });
    this.linksInternosButtons.forEach((link) => {
      link.addEventListener("click", this.scrollToSection);
    });
  }

  init() {
    this.bindEvents();
    this.addEventListener();
  }
}

export class AnimatedScroll {
  constructor() {
    this.sections = document.querySelectorAll("main section");
    this.windowMetade = window.innerHeight * 0.6;
    this.animaScroll = this.animaScroll.bind(this);
  }
  initAnimacaoScroll() {
    if (this.sections.length) {
      this.animaScroll();
    }
  }

  animaScroll() {
    this.sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const isSectionVisible = sectionTop - this.windowMetade < 0;
      if (isSectionVisible) section.classList.add("ativo");
    });
  }

  addEventListener() {
    window.addEventListener("scroll", this.animaScroll);
  }

  init() {
    this.initAnimacaoScroll();
    this.addEventListener();
  }
}
