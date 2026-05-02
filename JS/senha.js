function mostrarsenha(){
    const localsenha = document.getElementById("senhat");
    if (localsenha.type === "password"){
        localsenha.type = "text";
    }
    else {
        localsenha.type = "password"
    }
}