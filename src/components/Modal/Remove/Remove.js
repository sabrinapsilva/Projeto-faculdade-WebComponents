const templateModalRemove = document.createElement("template");

function remove() {
  const getParamType = new URL(window.location.href).searchParams.get("type");
  const getParamId = new URL(window.location.href).searchParams.get("id");

  if (getParamType == "user") {
    let users = JSON.parse(localStorage.getItem("users")).users;

    users = users.filter((user) => user.id !== getParamId);
    localStorage.setItem("users", JSON.stringify({ users: users }));
  } else {
    let products = JSON.parse(localStorage.getItem("products")).products;

    products = products.filter((product) => product.id !== getParamId);
    localStorage.setItem("products", JSON.stringify({ products: products }));
  }
  window.location.reload();
}

function closeModal() {
  const modal = this.document.querySelector("modal-remove");
  modal.shadowRoot.querySelector(".modal").style.display = "none";
  window.history.replaceState({}, "", `${window.location.pathname}`);
}

templateModalRemove.innerHTML = `
    <div class="modal">
        <main-header>
            <img onclick="closeModal()" class="modal__close" src="/src/assets/close.svg" slot="image" />
        </main-header>
        <div class="modal__content">
            <h2><slot></slot></h2>
            <div class="modal__btns">
                <button onclick="remove()">Sim</button>
                <button onclick="closeModal()">Não</button>
            </div>
        </div>
    </div>
`;

class ModalRemove extends HTMLElement {
  constructor() {
    //inicializando
    super();
    this.attachShadow({ mode: "open" }); //mode "open" para conseguir ser acessado pelo js
    this.shadowRoot.appendChild(templateModalRemove.content.cloneNode(true)); //clonado o elemento { deep: true } para clonar todos os elementos filhos

    let cssModulo = document.createElement("link");
    cssModulo.rel = "stylesheet";
    cssModulo.href = "/src/components/Modal/Remove/Remove.css";

    this.shadowRoot.appendChild(cssModulo);
  }

  connectedCallback() {}
}

customElements.define("modal-remove", ModalRemove); //metodo para definir um novo elemento customizado
