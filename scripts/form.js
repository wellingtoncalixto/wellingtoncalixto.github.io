class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    const control = document.createElement("div");
    control.dataset.control = "success-message";
    control.classList.add("cta-medium");
    control.innerHTML += `<h1>Mensagem enviada!</h1>`;
    this.form.appendChild(control);
  }

  async removeSuccessMessage() {
    const control = document.querySelector(`[data-control="success-message"]`);
    setTimeout(() => {
      control.remove();
    }, 3000);
  }

  displayError() {
    const control = document.createElement("div");
    control.dataset.control = "error-message";
    control.classList.add("cta-medium");
    control.innerHTML += `<h1>Não foi possível enviar sua mensagem.</h1>`;
    this.form.appendChild(control);
  }

  removeErrorMessage() {
    const control = document.querySelector(`[data-control="error-message"]`);
    setTimeout(() => {
      control.remove();
    }, 3000);
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  resetButton(event) {
    event.target.disabled = false;
    event.target.innerText = "Enviar";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
      this.removeSuccessMessage();
    } catch (error) {
      this.displayError();
      this.removeErrorMessage();
      throw new Error(error);
    }
    this.resetButton(event);
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
});
formSubmit.init();
