const templateHeader = document.createElement("template");

templateHeader.innerHTML = `
  <nav class="navbar">
    <img src="/src/assets/logo.png" />
    <slot class="navbar__text" name="text"></slot>
    <slot class="navbar__image-close" name="image"></slot>
  </nav>
`;

class Header extends HTMLElement {
  constructor() { //inicializando
    super();
    this.attachShadow({ mode: "open" }); //mode "open" para conseguir ser acessado pelo js
    this.shadowRoot.appendChild(templateHeader.content.cloneNode(true)); //clonado o elemento { deep: true } para clonar todos os elementos filhos 
    
    let cssModulo = document.createElement('link')
    cssModulo.rel = 'stylesheet'
    cssModulo.href = '/src/components/Header/Header.css'

    this.shadowRoot.appendChild(cssModulo)
  }
  
  connectedCallback() { //chamado sempre que elemento for adicionado na tela
    let getUser = localStorage.getItem("user");
    getUser = JSON.parse(getUser);

    if(getUser) {
      const nameUser = getUser.name.charAt(0).toUpperCase() + getUser.name.substr(1);
      document.querySelector("main-header p").innerHTML = `Ola, ${nameUser}`;
    }
  }
}

customElements.define("main-header", Header); //metodo para definir um novo elemento customizado
