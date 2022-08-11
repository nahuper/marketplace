




const btn = document.getElementById("btnLogin");

btn.addEventListener('click', function(e){
    console.log(e.target);
    const username = document.getElementById("fieldEmail").value;
    const password = document.getElementById("fieldContrasenia").value;

    if(username!="" && password!=""){
        location.href="../marketplace/index.html";
        document.getElementById("respuesta").innerHTML =  '<div class="border border-success p-2 mb-2">Loging in</div>';
    }else{
        document.getElementById("respuesta").innerHTML =  '<div class="h4 pb-2 mb-4 text-danger border-bottom border-danger">No ingresó ningún dato</div>';
        
    }
});
