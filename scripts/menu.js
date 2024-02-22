import debounce from "./debounce.js";

export default class Menu {
  constructor() {
    this.linksInternos = document.querySelectorAll(".menu-list a");
    this.menu = document.querySelector(".menu-list");
    this.menuHamburguerIcon = document.getElementById("hamburguer-menu");
    this.closeMenuIcon = document.getElementById("close-menu");
  }

  bindEvents() {
    this.hidenMenu = this.hidenMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.onResizeMenu = debounce(this.onResizeMenu.bind(this), 100);
  }

  showMenu() {
    this.menu.classList.add("mobile-menu");
    this.closeMenuIcon.classList.remove("display-none");
    this.menuHamburguerIcon.classList.add("display-none");
  }

  hidenMenu() {
    this.menu.classList.remove("mobile-menu");
    this.closeMenuIcon.classList.add("display-none");
    this.menuHamburguerIcon.classList.remove("display-none");
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

  onResizeMenu() {
    if (window.innerWidth < 768) {
      this.addEventListeners();
    } else {
      this.hidenMenu();
      this.removeEventListeners();
    }
  }
  init() {
    this.bindEvents();
    this.addEventListeners();
  }
}
