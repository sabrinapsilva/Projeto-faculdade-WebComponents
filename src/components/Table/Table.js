const openModalRemove = (type, id) => {
  const modal = document.querySelector("modal-remove");
  let params = new URLSearchParams(window.location.search);

  params.set('id', id);
  params.set('type', type);
  modal.shadowRoot.querySelector(".modal").style.display = "flex";
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
};

const templateTable = document.createElement("template");
const trThead = document.createElement("tr");

templateTable.innerHTML = `
<table class="table__custom">
    <thead></thead>
    <tbody></tbody>
</table>
`;

class Table extends HTMLElement {
  constructor() { //inicializando
    super();
    this.attachShadow({ mode: "open" }); //mode "open" para conseguir ser acessado pelo js
    this.shadowRoot.appendChild(templateTable.content.cloneNode(true)); //clonado o elemento { deep: true } para clonar todos os elementos filhos

    let cssModulo = document.createElement("link");
    cssModulo.rel = "stylesheet";
    cssModulo.href = "/src/components/Table/Table.css";

    this.shadowRoot.appendChild(cssModulo);
  }

  connectedCallback() {
    const getUserType = JSON.parse(localStorage.getItem("user")).type;
    const products = localStorage.getItem("products") ? 
      JSON.parse(localStorage.getItem("products")).products 
      : "";
    const users = localStorage.getItem("users") ? 
      JSON.parse(localStorage.getItem("users")).users 
      : "";

    if (document.querySelector("table-custom").getAttribute("table") == "users") {
      trThead.innerHTML = `
            <th>Nome</th>
            <th>Tipo</th>
            <th>Criado em</th>
        `;

      users && users.map((user) => {
        const trTbody = document.createElement("tr");

        trTbody.innerHTML = `
            <td>${user.name}</td>
            <td>${user.type.name}</td>
            <td>${new Date(user.created).toLocaleString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/\//g, '-')}</td>
            <td>
              <button onclick="openModalCreateEdit('${user.id}')">
                Editar
              </button>
              <button onclick="openModalRemove('user', '${user.id}')" 
                type="remove" 
                class="remove">
                  Remover
              </button>
            </td>
          `;
        this.shadowRoot.querySelector("tbody").appendChild(trTbody);
      });
    } else {
      trThead.innerHTML = `
            <th>Nome</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Data de Validade</th>
        `;

      products && products.map((product) => {
        const trTbody = document.createElement("tr");
        trTbody.innerHTML = `
              <td>${product.name}</td>
              <td>${product.category}</td>
              <td>${product.quantity}</td>
              <td>${new Date(product.expirationDate).toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).replace(/\//g, '-')}</td>
              <td>
                <button id="editButtonTable" onclick="openModalCreateEdit('${product.id}')">
                  Editar
                </button>
                <button id="removeButtonTable" onclick="openModalRemove('product', '${product.id}')" 
                  type="remove" 
                  class="remove">
                    Remover
                </button>
              </td>
            `;
        this.shadowRoot.querySelector("tbody").appendChild(trTbody);
      });
    }

    if(getUserType !== "admin") {
      this.shadowRoot.querySelector("#editButtonTable").remove();
      this.shadowRoot.querySelector("#removeButtonTable").remove();
    }
    this.shadowRoot.querySelector("thead").appendChild(trThead);
    this.shadowRoot.querySelector("thead").appendChild(trThead);
  }
}

customElements.define("table-custom", Table); //metodo para definir um novo elemento customizado
