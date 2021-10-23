const templateModalProduct = document.createElement("template");

const saveProduct = (event) => {
  event.preventDefault();

  const modal = this.document.querySelector("modal-create-edit");
  const type = modal.getAttribute("type");
  const errorMessage = this.document.querySelector(".error-message");
  const inputs = event.target.querySelectorAll("input-custom");
  let name = { value: "", valid: false };
  let quantity = { value: "", valid: false };
  let expirationDate = { value: "", valid: false };
  let category = { value: "", valid: false };

  inputs.forEach((input) => {
    const getInputName = input.shadowRoot.querySelector("input[name='name']");
    const getInputQuantity = input.shadowRoot.querySelector(
      "input[name='quantity']"
    );
    const getInputExpirationDate = input.shadowRoot.querySelector(
      "input[name='expirationDate']"
    );
    const getInputCategory = input.shadowRoot.querySelector(
      "input[name='category']"
    );

    if (getInputName) {
      name.valid = type == "edit" ? true : !Boolean(getInputName.getAttribute("invalid"));
      name.value = getInputName.value;
    } else if (getInputQuantity) {
      quantity.valid = type == "edit" ? true : !Boolean(getInputQuantity.getAttribute("invalid"));
      quantity.value = getInputQuantity.value;
    } else if (getInputExpirationDate) {
      expirationDate.valid = type == "edit" ? true : !Boolean(
        getInputExpirationDate.getAttribute("invalid")
      );
      expirationDate.value = getInputExpirationDate.value;
    } else {
      category.valid = type == "edit" ? true : !Boolean(getInputCategory.getAttribute("invalid"));
      category.value = getInputCategory.value;
    }
  });

  if (name.valid && quantity.valid && expirationDate.valid && category.valid) {
    if (type == "create") {
      addProduct({ name, quantity, expirationDate, category });
    } else {
      editProduct({ name, quantity, expirationDate, category });
    }
  } else {
    errorMessage.classList.add("active");
  }
};

const addProduct = (product) => {
  const getProducts = JSON.parse(localStorage.getItem("products"));
  const productObj = {
    id: Math.floor(Date.now() * Math.random()).toString(36),
    name: product.name.value,
    quantity: product.quantity.value,
    expirationDate: product.expirationDate.value,
    category: product.category.value,
  };

  if (getProducts) {
    getProducts.products.push(productObj);
    localStorage.setItem("products", JSON.stringify(getProducts));
  } else {
    localStorage.setItem(
      "products",
      JSON.stringify({ products: [productObj] })
    );
  }
  document
    .querySelector("modal-create-edit")
    .shadowRoot.querySelector(".modal")
    .classList.remove("active");
  window.location.reload();
};

const editProduct = (product) => {
  const getParamId = new URL(window.location.href).searchParams.get("id");
  const productOld = JSON.parse(localStorage.getItem("products")).products.filter(
    (product) => product.id == getParamId
  )[0];
  const productObj = {
    id: productOld.id,
    name: product.name.value,
    quantity: product.quantity.value,
    expirationDate: product.expirationDate.value,
    category: product.category.value,
  };
  const products = JSON.parse(localStorage.getItem("products")).products.filter(
    (product) => product.id !== getParamId
  );

  localStorage.setItem("products", JSON.stringify({ products: [ ...products, productObj] }));
  document
  .querySelector("modal-create-edit")
  .shadowRoot.querySelector(".modal")
  .classList.remove("active");
  window.location.reload();
}

templateModalProduct.innerHTML = `
    <div class="modal">
        <main-header>
            <img class="modal__close" src="/src/assets/close.svg" slot="image" />
        </main-header>
        <div class="modal__content">
            <h2><slot></slot></h2>
            <form onsubmit="saveProduct(event)">
              <input-custom name="name">Nome</input-custom>
              <div class="modal__content__group">
                <input-custom type="number" name="quantity">Quantidade</input-custom>
                <input-custom type="date" name="expirationDate">
                  Data de validade
                </input-custom>
              </div>
              <input-custom name="category">Categoria</input-custom>
              <slot name="errorMessage"></slot>
              <div class="modal__btns">
                  <button type="submit">Salvar</button>
              </div>
            </form>
        </div>
    </div>
`;

class ModalCreateEdit extends HTMLElement {
  constructor() {
    //inicializando
    super();
    this.attachShadow({ mode: "open" }); //mode "open" para conseguir ser acessado pelo js
    this.shadowRoot.appendChild(templateModalProduct.content.cloneNode(true)); //clonado o elemento { deep: true } para clonar todos os elementos filhos

    let cssModulo = document.createElement("link");
    cssModulo.rel = "stylesheet";
    cssModulo.href = "/src/components/Modal/CreateEdit/CreateEdit.css";

    this.shadowRoot.appendChild(cssModulo);
  }

  connectedCallback() {
    const modal = document.querySelector("modal-create-edit");
    const close = this.shadowRoot.querySelector(".modal__close");

    close.addEventListener("click", (e) => {
      modal.shadowRoot.querySelector(".modal").classList.remove("active");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}`
      );
    });
  }

  static get observedAttributes() {
    return ["open", "title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const modal = document.querySelector("modal-create-edit");

    if (this.getAttribute("open") == "true") {
      modal.shadowRoot.querySelector(".modal").classList.add("active");

      if (modal.getAttribute("type") == "edit") {
        const inputs = this.shadowRoot.querySelectorAll("input-custom");
        const getParamId = new URL(window.location.href).searchParams.get("id");
        let product = JSON.parse(localStorage.getItem("products")).products.filter(
          (product) => product.id == getParamId
        )[0];

        inputs.forEach((input) => {
          let name =  input.shadowRoot.querySelector("input[name='name']");
          let quantity = input.shadowRoot.querySelector(
            "input[name='quantity']"
          );
          let expirationDate = input.shadowRoot.querySelector(
            "input[name='expirationDate']"
          );
          let category = input.shadowRoot.querySelector(
            "input[name='category']"
          );
          if (name) {
            name.value = product.name;
          }
          if (quantity) {
            quantity.value = product.quantity;
          }
          if(expirationDate) {
            expirationDate.value = product.expirationDate;
          } 
          if(category) {
            category.value = product.category;
          } 
        });
      }
    }

    if(this.getAttribute("title")) {
      this.shadowRoot.querySelector("h2").innerHTML = this.getAttribute("title");
    }
  }
}

customElements.define("modal-create-edit", ModalCreateEdit); //metodo para definir um novo elemento customizado
