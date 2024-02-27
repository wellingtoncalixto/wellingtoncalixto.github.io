import { Resize } from "./resize.js";
import FormSubmit from "./form.js";
import Menu from "./menu.js";
import { SmoothScroll, AnimatedScroll } from "./scroll.js";

const resize = new Resize();
resize.init();

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
});
formSubmit.init();

const menu = new Menu();
menu.init();

const scroll = new SmoothScroll();
scroll.init();

const animatedScroll = new AnimatedScroll();
animatedScroll.init();
