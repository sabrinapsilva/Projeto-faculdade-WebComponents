const buttonAddProduct = this.document.querySelector("#addProduct");
const getUser = JSON.parse(localStorage.getItem("user")).type.value;

getUser !== "admin" && buttonAddProduct.remove();

function openModalCreateEdit(id) {
    const modal = this.document.querySelector("modal-create-edit");

    if(id) { 
        const params = new URLSearchParams(window.location.search);
        
        params.set('id', id);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        modal.setAttribute("title", "Editar Produto");
        modal.setAttribute("type", "edit");
    } else {
        modal.setAttribute("title", "Criar Produto");
        modal.setAttribute("type", "create");
    }
    modal.setAttribute("open", true);
}