const templateSideBar = document.createElement("template");

function removeUser() {
    localStorage.removeItem("user");
}

templateSideBar.innerHTML = `
<div class="wrapper">
    <aside class="sidebar">
        <nav class="sidebar__navigation">
            <ul>
                <li>
                    <img src="/src/assets/book-open.svg" alt=""/>
                    <a href="../Produtos/produtos.html">Produtos</a>
                </li>
                <li>
                    <img src="/src/assets/iconfinder_m-21_4230540 2.svg" alt=""/>
                    <a href="../Reports/reports.html">Relatórios</a>
                </li>
                <li id="users">
                    <img src="/src/assets/users.svg" alt="" />
                    <a href="../Users/users.html">Usuários</a>
                </li>
                <li id="stock" style="margin-left: -11px;">
                    <img src="/src/assets/iconfinder_28-Orders_and_Check_Lists_6330643 1.svg" alt=""/>
                    <a href="../Estoque/estoque.html">Entrada/Saída de estoque</a>
                </li>
                <li>
                    <img src="/src/assets/iconfinder_Configuration-2-01_1976057 2.svg" alt=""/>
                    <a href="../Configuracoes/configuracoes.html">Configurações</a>
                </li>
                <li onclick="removeUser()">
                    <img src="/src/assets/interface solid multimedia on off button.svg" alt=""/>
                    <a href="../Home/homepage.html">Sair</a>
                </li>
            </ul>
        </nav>
    </aside>
    <slot name="content-sidebar" class="sidebar__content"><slot>
</div>
`;

class SideBar extends HTMLElement {
  constructor() { //inicializando
    super();
    this.attachShadow({ mode: "open" }); //mode "open" para conseguir ser acessado pelo js
    this.shadowRoot.appendChild(templateSideBar.content.cloneNode(true)); //clonado o elemento { deep: true } para clonar todos os elementos filhos 
    
    let cssModulo = document.createElement('link')
    cssModulo.rel = 'stylesheet'
    cssModulo.href = '/src/components/SideBar/SideBar.css'

    this.shadowRoot.appendChild(cssModulo)
  }

  connectedCallback() {
      const getTypeUser = JSON.parse(localStorage.getItem("user")).type.value;
      const optionUsers = this.shadowRoot.querySelector("#users");
      const optionStock = this.shadowRoot.querySelector("#stock");

      if(getTypeUser !== "admin") {
        optionUsers.remove();
        optionStock.remove();
      }
  }
}

customElements.define("side-bar", SideBar); //metodo para definir um novo elemento customizado
