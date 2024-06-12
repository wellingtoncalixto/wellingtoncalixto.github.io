import debounce from "./debounce.js";

export default class Menu {
  constructor() {
    this.header = document.querySelector("header");
    this.linksInternos = document.querySelectorAll(".menu-list a");
    this.menu = document.querySelector(".menu-list");
    this.menuHamburguerIcon = document.getElementById("hamburguer-menu");
    this.closeMenuIcon = document.getElementById("close-menu");
  }

  bindEvents() {
    this.hidenMenu = this.hidenMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.onResizeMenu = debounce(this.onResizeMenu.bind(this), 100);
    this.addActiveClassOnScroll = debounce(
      this.addActiveClassOnScroll.bind(this),
      1
    );
  }

  showMenu() {
    this.menu.classList.add("mobile-menu");
    this.closeMenuIcon.classList.remove("display-none");
    this.menuHamburguerIcon.classList.add("display-none");
    document.querySelector("body").style.overflow = "hidden";
  }

  hidenMenu() {
    this.menu.classList.remove("mobile-menu");
    this.closeMenuIcon.classList.add("display-none");
    this.menuHamburguerIcon.classList.remove("display-none");
    document.querySelector("body").style.overflow = "scroll";
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResizeMenu);
    this.menuHamburguerIcon.addEventListener("click", this.showMenu);
    this.closeMenuIcon.addEventListener("click", this.hidenMenu);

    this.linksInternos.forEach((link) => {
      link.addEventListener("click", this.hidenMenu);
    });
  }

  removeEventListeners() {
    window.removeEventListener("resize", this.onResizeMenu);
    this.menuHamburguerIcon.removeEventListener("click", this.showMenu);
    this.closeMenuIcon.removeEventListener("click", this.hidenMenu);

    this.linksInternos.forEach((link) => {
      link.removeEventListener("click", this.hidenMenu);
    });
  }

  addScrollEventListener() {
    document.addEventListener("scroll", this.addActiveClassOnScroll);
  }

  addActiveClassOnScroll() {
    let scrollPos = window.pageYOffset;

    if (scrollPos > 1) {
      this.header.classList.add("active");
    } else {
      this.header.classList.remove("active");
    }
  }

  onResizeMenu() {
    if (window.innerWidth <= 768) {
      this.bindEvents();
      this.addEventListeners();
    } else {
      this.hidenMenu();
      this.removeEventListeners();
    }
  }
  init() {
    this.bindEvents();
    this.addEventListeners();
    this.addScrollEventListener();
  }
}
