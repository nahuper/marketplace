
const btn = document.getElementById("btnLogin");

btn.addEventListener('click', function(){

    //e.preventDefault();
    //console.log(e.target);
    const username = document.getElementById("fieldEmail").value;
    const password = document.getElementById("fieldContrasenia").value;
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let regPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;
    //localStorage.setItem(username, password);
    
    if(username!="" && password!="" && regEmail.test(username) && regPassword.test(password)){
        
        document.getElementById("respuesta").innerHTML =  '<div class="border border-success p-2 mb-2">Loging in</div>';
        /**Aquí se guarda en el local storage el username del usuario */
        localStorage.setItem("username", username);
        location.href="../marketplace/index.html";
        
    }else{
        
        document.getElementById("respuesta").innerHTML =  '<div class="h4 pb-2 mb-4 text-danger border-bottom border-danger">No se ingresó el correo con el formato correo, o la contraseña no tiene un mínimo de 8 caractéres, ni una mayúscula, ni minúscula, ni un número o bien no ingresó ningún dato</div>';
        
    }

    
});
