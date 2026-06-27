console.log("Javascript conectado!");

const formulario = document.getElementById("main-form");

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const regexEmail = /^[A-Za-z0-9._-]+@[a-z]+(\.[a-z]{2,3}){1,2}$/;

     if(!email.includes("@")){
        alert("Digite um e-mail válido");
        return;
    }
    const telefone = document.getElementById("telefone").value;
    telefone.addEventListener("input", function(){
        let valor = telefone.value;
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        valor = valor.substring(0, 15);
        teleforne.value = valor;
    })
    const cidade = document.getElementById("cidade").value;
    if(nome === ""){
        alert("Digite seu nome");
        return;
    }
   
    if(telefone.length < 15){
        alert("Telefone inválido");
        return;
    }
    formulario.onsubmit();
});
const botaoDark = document.getElementById("darkmode");
botaoDark.addEventListener("click", function(){
    document.body.classList.toggle("dark");
});
