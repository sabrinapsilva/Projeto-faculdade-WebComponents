function onSubmit(e) { 
  e.preventDefault();

  let name = { value: "", valid: false };
  let email = { value: "", valid: false };
  let password = { value: "", valid: false };
  const inputs = this.document.querySelectorAll("input-custom");
  const errorMessage = this.document.querySelector(".error-message");
  
  inputs.forEach((input) => {
    const getInputName = input.shadowRoot.querySelector("input[name='name']");
    const getInputEmail = input.shadowRoot.querySelector("input[name='email']");
    const getInputPassword = input.shadowRoot.querySelector("input[name='password']");
    if(getInputEmail) {
      email.valid = !Boolean(getInputEmail.getAttribute("invalid"));
      email.value = getInputEmail.value;
    } else if(getInputPassword) {
      password.valid = !Boolean(getInputPassword.getAttribute("invalid"));
      password.value = getInputPassword.value;
    } else {
      name.valid = !Boolean(getInputName.getAttribute("invalid"));
      name.value = getInputName.value;
    }
  })

  const userObj = { 
    id: Math.floor(Date.now() * Math.random()).toString(36), 
    name: name.value, 
    email: email.value, 
    password: password.value, 
    type: { name: "Administrador", value: "admin" },
    created: new Date(),
  };

  if (name.valid && email.valid && password.valid) {
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("users", JSON.stringify({ users: [userObj] }));
      window.location.href = "/src/pages/Produtos/produtos.html"; 
  } else {
      errorMessage.classList.add("active");
  }
}

