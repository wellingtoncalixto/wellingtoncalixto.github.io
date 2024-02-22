import { Resize } from "./resize.js";
import FormSubmit from "./form.js";
import Menu from "./menu.js";

const resize = new Resize();
resize.init();

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
});
formSubmit.init();

const menu = new Menu();
menu.init();
