const templateModalUser = document.createElement("template");

const saveUser = (event) => {
  event.preventDefault();

  const modal = this.document.querySelector("modal-create-edit");
  const type = modal.getAttribute("type");
  const errorMessage = this.document.querySelector(".error-message");
  const inputs = event.target.querySelectorAll("input-custom");
  let name = { value: "", valid: false };
  let email = { value: "", valid: false };
  let password = { value: "", valid: false };
  let typeField = { value: "", name: "" };

  inputs.forEach((input) => {
    const getInputName = input.shadowRoot.querySelector("input[name='name']");
    const getInputEmail = input.shadowRoot.querySelector("input[name='email']");
    const getInputPassword = input.shadowRoot.querySelector(
      "input[name='password']"
    );
    const getInputType = input.querySelector("select");
    if (getInputName) {
      name.valid = type == "edit" ? true : !Boolean(getInputName.getAttribute("invalid"));
      name.value = getInputName.value;
    } else if (getInputEmail) {
      email.valid = type == "edit" ? true : !Boolean(getInputEmail.getAttribute("invalid"));
      email.value = getInputEmail.value;
    } else if (getInputPassword) {
      password.valid = type == "edit" ? true : !Boolean(getInputPassword.getAttribute("invalid"));
      password.value = getInputPassword.value;
    } else {
      typeField.name = getInputType.options[getInputType.selectedIndex].text;
      typeField.value = getInputType.options[getInputType.selectedIndex].value;
    }
  });

  if (name.valid && email.valid && password.valid && typeField.value !== "") {
    if (type == "create") {
      addUser({ name, email, password, typeField });
    } else {
      editUser({ name, email, password, typeField });
    }
  } else {
    errorMessage.classList.add("active");
  }
};

const addUser = (user) => {
  const getUsers = JSON.parse(localStorage.getItem("users"));
  const userObj = {
    id: Math.floor(Date.now() * Math.random()).toString(36),
    name: user.name.value,
    email: user.email.value,
    password: user.password.value,
    type: user.typeField,
    created: new Date(),
  };

  if (getUsers) {
    getUsers.users.push(userObj);
    localStorage.setItem("users", JSON.stringify(getUsers));
  } else {
    localStorage.setItem("users", JSON.stringify({ users: [userObj] }));
  }
  document
    .querySelector("modal-create-edit")
    .shadowRoot.querySelector(".modal")
    .classList.remove("active");
  window.location.reload();
};

const editUser = (user) => {
  const getParamId = new URL(window.location.href).searchParams.get("id");
  const userOld = JSON.parse(localStorage.getItem("users")).users.filter(
    (user) => user.id == getParamId
  )[0];
  const userObj = {
    id: userOld.id,
    name: user.name.value,
    email: user.email.value,
    password: user.password.value,
    type: user.typeField,
    created: userOld.created,
  };
  const users = JSON.parse(localStorage.getItem("users")).users.filter(
    (user) => user.id !== getParamId
  );

  localStorage.setItem("users", JSON.stringify({ users: [ ...users, userObj] }));
  document
  .querySelector("modal-create-edit")
  .shadowRoot.querySelector(".modal")
  .classList.remove("active");
  window.location.reload();
}

templateModalUser.innerHTML = `
    <div class="modal">
        <main-header>
            <img class="modal__close" src="/src/assets/close.svg" slot="image" />
        </main-header>
        <div class="modal__content">
            <h2><slot></slot></h2>
            <form onsubmit="saveUser(event)">
              <input-custom name="name">Nome</input-custom>
              <input-custom type="email" name="email">Email</input-custom>
              <input-custom name="type" type="select">
                Tipo
                <select slot="select" id="type">
                  <option value="" selected></option>
                  <option value="admin">Administrador</option>
                  <option value="viewer">Visualizador</option>
              </select>
              </input-custom>
              <input-custom name="password">Senha</input-custom>
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
    this.shadowRoot.appendChild(templateModalUser.content.cloneNode(true)); //clonado o elemento { deep: true } para clonar todos os elementos filhos

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
      window.history.replaceState({}, "", `${window.location.pathname}`);
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
        let user = JSON.parse(localStorage.getItem("users")).users.filter(
          (user) => user.id == getParamId
        )[0];

        inputs.forEach((input) => {
          let name =  input.shadowRoot.querySelector("input[name='name']");
          let password =  input.shadowRoot.querySelector("input[name='password']");
          let email =  input.shadowRoot.querySelector("input[name='email']");
          let type = input.querySelector("select");

          if (name) {
            name.value = user.name;
          }
          if (password) {
            password.value = user.password;
          }
          if(type) {
            type.value = user.type.value;
          } 
          if(email) {
            email.value = user.email;
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
