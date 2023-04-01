
const btn = document.getElementById("btnLogin");

btn.addEventListener('click', function(){

    
    const username = document.getElementById("fieldEmail").value;
    const password = document.getElementById("fieldContrasenia").value;
    const test = JSON.parse(localStorage.getItem("users"));
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let regPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;
    
    if(test!==null){
        for(let i=0; i<test.length; i++){
            let email = test[i].email;
            let pass = test[i].password;
    
            if(email===username && pass===password && regEmail.test(username) && regPassword.test(password)){
                document.getElementById("respuesta").innerHTML =  '<div class="border border-success p-2 mb-2">Loging in</div>';
                localStorage.setItem("username", username);
                location.href="../index.html";
            }else if(username=="" && password==""){
                document.getElementById("respuesta").innerHTML =  '<div class="h4 pb-2 mb-4 text-danger border-bottom border-danger">Debe ingresar algún dato válido o el formato de los datos no es válido</div>';
            }else{
                document.getElementById("respuesta").innerHTML =  '<div class="h4 pb-2 mb-4 text-danger border-bottom border-danger">No se encontró el usuario en la base de datos o el formato de los datos no es válido</div>';
            }
        }
    }else{
        document.getElementById("respuesta").innerHTML =  '<div class="h4 pb-2 mb-4 text-danger border-bottom border-danger">No se encontró el usuario en la base de datos o el formato de los datos no es válido</div>';
    }
});
