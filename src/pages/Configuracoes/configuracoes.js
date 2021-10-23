function initComponent() {
    const getUser = JSON.parse(localStorage.getItem("user"));
    const inputs = this.document.querySelectorAll("input-custom");
    const buttonRemove = this.document.querySelector("#removeAccount");

    getUser.type.value !== "admin" && buttonRemove.remove();
    inputs && inputs.forEach((input) => {
        let name = input.shadowRoot.querySelector("input[name='name']");
        let email = input.shadowRoot.querySelector("input[name='email']");
        let password = input.shadowRoot.querySelector("input[name='password']");
        
        if (name) {
            name.value = getUser.name;
        }
        if (email) {
            email.value = getUser.email;
        }
        if(password) {
            password.value = getUser.password;
        } 
    });
};

function changeData() {
    const getUser = JSON.parse(localStorage.getItem("user"));
    const errorMessage = this.document.querySelector(".error-message");
    const inputs = this.document.querySelectorAll("input-custom");
    let name = { value: "", valid: false };
    let password = { value: "", valid: false };
    let email = { value: "", valid: false };

    inputs.forEach((input) => {
        const getInputName = input.shadowRoot.querySelector("input[name='name']");
        const getInputEmail = input.shadowRoot.querySelector("input[name='email']");
        const getInputPassword = input.shadowRoot.querySelector(
        "input[name='password']"
        );

        if (getInputName) {
            name.valid = !Boolean(getInputName.getAttribute("invalid"));
            name.value = getInputName.value;
        } else if (getInputPassword) {
            password.valid = !Boolean(getInputPassword.getAttribute("invalid"));
            password.value = getInputPassword.value;
        } else {
            email.valid = !Boolean(getInputEmail.getAttribute("invalid"));
            email.value = getInputEmail.value;
        }
    });

    if (name.valid && password.valid && email.valid) {
        const userObj = {
            id: getUser.id,
            name: name.value,
            password: password.value,
            email: email.value,
        };
         
        localStorage.setItem("user", JSON.stringify(userObj));
        window.location.reload();
    } else {
        errorMessage.classList.add("active");
    }
}

function removeAccount() {
    localStorage.clear();
    window.location.href = "/src/pages/Home/homepage.html"; 
}

initComponent();