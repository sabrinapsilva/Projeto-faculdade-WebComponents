function openModalCreateEdit(id) {
    const modal =  document.querySelector("modal-create-edit");
    if(id) { 
        const params = new URLSearchParams(window.location.search);
        
        params.set('id', id);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        modal.setAttribute("title", "Editar Usuario");
        modal.setAttribute("type", "edit");
    } else {
        modal.setAttribute("title", "Criar Usuario");
        modal.setAttribute("type", "create");
    }
    modal.setAttribute("open", true);
}