const templateButton = document.createElement("template");

templateButton.innerHTML = `
  <button><slot></slot></button>
`;

class Button extends HTMLElement {
  constructor() { //inicializando
    super();
    this.attachShadow({ mode: "open" }); //mode "open" para conseguir ser acessado pelo js
    this.shadowRoot.appendChild(templateButton.content.cloneNode(true)); //clonado o elemento { deep: true } para clonar todos os elementos filhos

    let cssModulo = document.createElement("link");
    cssModulo.rel = "stylesheet";
    cssModulo.href = "/src/components/Button/Button.css";

    this.shadowRoot.appendChild(cssModulo);
  }
  connectedCallback() {
    const btn = this.shadowRoot.querySelector("btn-rounded");
  
  }
}

customElements.define("btn-rounded", Button); //metodo para definir um novo elemento customizado
