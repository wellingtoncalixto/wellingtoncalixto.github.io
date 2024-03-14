import debounce from "./debounce.js";
import Utils from "./utils.js";

export class Resize extends Utils {
  constructor() {
    super();
    this.resizeId = null;
  }

  bindEvents() {
    this.onResize = debounce(this.onResize.bind(this), 100);
  }

  onResize() {
    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(() => {
      if (window.innerWidth <= 768) {
        if (document.querySelector(".slide-container") === null) {
          this.addSlideClass();
          this.initSlide();
        }
      } else if (window.innerWidth > 768) {
        if (document.querySelector(".slide-container") !== null) {
          this.slide.end();
          this.removeSlideControl();
          this.removeSlideClass();
          this.removeStyle();
        }
      }
    }, 500);
  }

  checkInitWidth() {
    if (window.innerWidth < 992) {
      this.addSlideClass();
      this.initSlide();
    }
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  init() {
    this.addResizeEvent();
    this.checkInitWidth();
  }
}
