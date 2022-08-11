




const btn = document.getElementById("btnLogin");

btn.addEventListener('click', function(e){
    console.log(e.target);
    const username = document.getElementById("fieldEmail").value;
    const password = document.getElementById("fieldContrasenia").value;

    if(username!="" && password!=""){
        location.href="../index.html";
        document.getElementById("respuesta").innerHTML = "Iniciando sesión";
    }else{
        document.getElementById("respuesta").innerHTML = "ERROR";
    }
});
