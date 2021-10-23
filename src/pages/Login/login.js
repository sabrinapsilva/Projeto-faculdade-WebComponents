const userInitial = {
  id: "fs2ds3sa1",
  type: "admin",
  password: "123",
  name: "Administrador do Sistema",
  email: "admin@abc.com",
};

function onSubmit(e) {
  e.preventDefault();

  const inputs = this.document.querySelectorAll("input-custom");
  const errorMessage = this.document.querySelector(".error-message");
  let getUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  let getAllUsers = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users")).users
    : "";
  let email = "";
  let password = "";

  inputs.forEach((input) => {
    if (input.shadowRoot.querySelector("input[name='email']")) {
      email = input.shadowRoot.querySelector("input[name='email']").value;
    } else {
      password = input.shadowRoot.querySelector("input[name='password']").value;
    }
  });

  getAllUsers = getAllUsers.filter((user) => user.email == email)[0];

  if (email.trim() !== "" && password.trim() !== "") {
    if (
      (email == userInitial.email && password == userInitial.password) ||
      (getUser.email == email && getUser.password == password) ||
      (getAllUsers.email == email && getAllUsers.password == password)
    ) {
      localStorage.setItem("user", JSON.stringify(getAllUsers));
      window.location.href = "/src/pages/Produtos/produtos.html";
    } else {
      errorMessage.innerHTML = "Usuário não encontrado";
    }
  }
}
