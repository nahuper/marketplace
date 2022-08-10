document.addEventListener("click", Login());
let username = document.getElementById("fieldEmail").value;
let password = document.getElementById("fieldContrasenia").value;

const response = document.getElementById("respuesta");

response.innerHTML="";

function Login(){
    if(username!="" && password!=""){
        response.innerHTML+="Iniciando sesión";
    }else{
        response.innerHTML+="ERROR";
    }
}