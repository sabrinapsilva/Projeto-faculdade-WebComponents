const templateInput = document.createElement("template");

templateInput.innerHTML = `
    <div class="input__container">
        <div>
            <slot name="icon-input"></slot>
            <label for=""><slot></slot></label>
        </div>
        <input type="text" invalid="true" />
        <slot name="select"></slot>
        <p class="input__error-message"></p>
    </div>
`;

class Input extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); //mode "open" para conseguir ser acessado pelo js
    this.shadowRoot.appendChild(templateInput.content.cloneNode(true)); //clonando o elemento { deep: true } para clonar todos os elementos filhos

    let cssModulo = document.createElement("link");
    cssModulo.rel = "stylesheet";
    cssModulo.href = "/src/components/Input/Input.css";

    this.shadowRoot.appendChild(cssModulo);
  }

  connectedCallback() { //chamado sempre que elemento for adicionado na tela
    const input = this.shadowRoot.querySelector("input");
    const errorMessage = this.shadowRoot.querySelector(".input__error-message");

    input.setAttribute("type", this.getAttribute("type"));
    input.setAttribute("name", this.getAttribute("name"));

    if(this.getAttribute("type") == "select") {
      input.remove();
    }

    if(input !== "") input.removeAttribute("invalid");
    
    const checkFields = {
      name: (value) => {
        if(value.length < 3) { 
          errorMessage.innerHTML = "nome invalido";
          input.setAttribute("invalid", true);
          return;
        }
        input.removeAttribute("invalid");
      },
      email: (value) => {
        if(!/\S+@\S+\.\S+/.test(value)){
          errorMessage.innerHTML = "email invalido";
          input.setAttribute("invalid", true);
          return;
        }
        input.removeAttribute("invalid");
      },
      password: (value) => {
        if(value.length < 3) { 
          errorMessage.innerHTML = "senha invalido";
          input.setAttribute("invalid", true);
          return;
        }
        input.removeAttribute("invalid");
      },
      default: (value) => {
        if(value == "") { 
          errorMessage.innerHTML = "preencha o campo";
          input.setAttribute("invalid", true);
          return;
        }
        input.removeAttribute("invalid");
      }
    }
    
    input.oninput = () => {
      if(document.querySelector(".error-message")) document.querySelector(".error-message").classList.remove("active");
      if(errorMessage.innerHTML) errorMessage.innerHTML = "";
      if(checkFields[this.getAttribute("name")]) {
        checkFields[this.getAttribute("name")](input.value);
      } else {
        checkFields.default(input.value);
      }
    }
  }
}

customElements.define("input-custom", Input); //metodo para definir um novo elemento customizado
