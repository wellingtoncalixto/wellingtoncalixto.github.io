import { SlideNave } from "./slide.js";

export default class Utils {
  constructor() {
    this.bindEvents();
  }

  removeSlideClass() {
    const slideContainer = document.querySelector(".slide-container");
    const slideList = document.querySelector(".slide-list");
    slideContainer.classList.remove("slide-container");
    slideList.classList.remove("slide-list");
  }

  addSlideClass() {
    const cardContainer = document.querySelector(".cards-container");
    const cardList = document.querySelector(".cards-list");
    cardContainer.classList.add("slide-container");
    cardList.classList.add("slide-list");
  }

  initSlide() {
    this.slide = new SlideNave(".slide-list", ".slide-container");
    this.slide.init();
    this.slide.addControl();
  }

  removeSlideControl() {
    const dataControl = document.querySelector('[data-control="slide"]');
    dataControl.remove();
  }

  removeStyle() {
    const cardList = document.querySelector(".cards-list");
    cardList.style.transition = null;
    cardList.style.transform = `translate3d(0, 0, 0)`;
  }

  bindEvents() {
    this.removeSlideControl = this.removeSlideControl.bind(this);
    this.initSlide = this.initSlide.bind(this);
    this.addSlideClass = this.addSlideClass.bind(this);
    this.removeSlideClass = this.removeSlideClass.bind(this);
    this.removeStyle = this.removeStyle.bind(this);
  }
}
