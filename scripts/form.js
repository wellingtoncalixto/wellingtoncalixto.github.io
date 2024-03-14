export default class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
    this.validField = this.validField.bind(this);
  }

  displaySuccess() {
    const control = document.createElement("div");
    control.dataset.control = "success-message";
    control.classList.add("cta-medium");
    control.innerHTML += `<h1>Mensagem enviada!</h1>`;
    this.form.appendChild(control);
  }

  removeSuccessMessage() {
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

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  valideteWhiteSpace(value) {
    const re = /\S(.*\S)?/;
    return re.test(value);
  }

  insertInvalidNameSpan(element, span) {
    const errorMessageName = document.getElementById(`error-input-name`);
    if (!errorMessageName) {
      span.innerHTML = "Por favor, preencha o campo Nome.";
      span.id = `error-input-${element.id}`;
      element.parentNode.insertBefore(span, element.nextSibling);
      return;
    }
  }

  insertInvalidEmailSpan(element, span) {
    span.id = `error-input-${element.id}`;
    span.innerHTML = "";
    let errorMessageEmail = document.getElementById(`error-input-email`);

    if (!errorMessageEmail) {
      element.parentNode.insertBefore(span, element.nextSibling);
      errorMessageEmail = document.getElementById(`error-input-email`);
    }

    if (element.value === "") {
      span.innerHTML = "Por favor, preencha o campo Email";
      errorMessageEmail.replaceWith(span);
      return;
    } else if (!this.validateEmail(element.value)) {
      span.innerHTML = "Endereço de e-mail invalido.";
      errorMessageEmail.replaceWith(span);
      return;
    }
  }

  insertInvalidMessageSpan(element, span) {
    const errorMessage = document.getElementById(`error-input-message`);
    if (!errorMessage) {
      span.innerHTML = "Por favor, preencha o campo de Mensagem.";
      span.id = `error-input-${element.id}`;
      element.parentNode.insertBefore(span, element.nextSibling);
      return;
    }
  }

  insertInvaliMessage(element) {
    const span = document.createElement("span");
    span.classList.add("validation-error-message");
    span.classList.add("small-label-upercase");
    if (element.id === "name") {
      this.insertInvalidNameSpan(element, span);
      return;
    } else if (element.id === "email") {
      this.insertInvalidEmailSpan(element, span);
    } else if (element.id === "message") {
      this.insertInvalidMessageSpan(element, span);
    }
  }

  deleteInvalidMessage(element) {
    document.getElementById(`error-input-${element.id}`).remove();
  }

  changeButtonState() {
    const fields = Array.from(this.form.querySelectorAll("input, textarea"));
    const values = fields.map((field) => {
      return !this.valideteWhiteSpace(field.value) ||
        field.classList.contains("not-valid")
        ? false
        : true;
    });
    if (values.includes(false)) {
      this.formButton.disabled = true;
    } else {
      this.formButton.disabled = false;
    }
  }

  validField(event) {
    const element = event.srcElement;

    if (element.id === "email" && !this.validateEmail(element.value)) {
      element.classList.add("not-valid");
      this.insertInvaliMessage(element);
    } else if (!this.valideteWhiteSpace(element.value)) {
      element.classList.add("not-valid");
      this.insertInvaliMessage(element);
    } else if (!element.checkValidity()) {
      element.classList.add("not-valid");
      this.insertInvaliMessage(element);
    } else if (
      element.checkValidity() &&
      element.classList.contains("not-valid")
    ) {
      element.classList.remove("not-valid");
      this.deleteInvalidMessage(element);
    }
    this.changeButtonState();
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
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  resetButton(event) {
    event.target.disabled = true;
    event.target.innerText = "Enviar";
  }

  resetFields() {
    this.form.reset();
  }

  async sendForm(event) {
    event.preventDefault();
    if (!!document.querySelectorAll(".not-valid")) {
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
        this.resetFields();
        this.displaySuccess();
        this.removeSuccessMessage();
      } catch (error) {
        this.displayError();
        this.removeErrorMessage();
        throw new Error(error);
      }
      this.resetButton(event);
    }
  }

  init() {
    if (this.form) {
      this.formButton.addEventListener("click", this.sendForm);
      this.formButton.disabled = true;
      const fields = Array.from(this.form.querySelectorAll("input, textarea"));
      fields.forEach((field) => {
        field.addEventListener("keyup", this.validField);
      });
    }
    return this;
  }
}
