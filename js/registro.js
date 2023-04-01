let pass = document.getElementById("password1").value;
let pass2 = document.getElementById("password2").value;
let listUsers = [];

if(localStorage.getItem("username")!==null){

  function valPass() {
    const pass1 = document.getElementById("password1");
    const pass2 = document.getElementById("password2");
  
    pass1.value !== pass2.value ? pass2.setCustomValidity("prueba") : pass2.setCustomValidity("");
  }
  
  const btnRegistro = document.getElementById("registro");
  
  btnRegistro.addEventListener("click", (e) => {
  
  
    const condiciones = document.getElementById("terminos");
    const span = document.getElementById("span");
    const terminosTexto = document.getElementById("terminosTexto");
    const aceptarCond = document.getElementById("aceptoCondiciones");
  
    condiciones.checked ? (condiciones.classList.remove("btn-outline-danger"), condiciones.classList.add("btn-outline-success"), aceptarCond.classList.remove("text-danger"), aceptarCond.classList.add("text-success"), terminosTexto.classList.remove("text-danger")) : (span.hidden = false, aceptarCond.classList.add("text-danger"), terminosTexto.classList.add("text-danger"), aceptarCond.classList.add("text-success"), condiciones.classList.remove("btn-outline-success"), condiciones.classList.add("btn-outline-danger"));
  
    condiciones.addEventListener("input", function () {
      condiciones.checked ? (span.hidden = true, condiciones.classList.remove("btn-outline-danger"), condiciones.classList.add("btn-outline-success"), aceptarCond.classList.remove("text-danger"), aceptarCond.classList.add("text-success"), terminosTexto.classList.remove("text-danger")) : (span.hidden = false, aceptarCond.classList.add("text-danger"), terminosTexto.classList.add("text-danger"), aceptarCond.classList.add("text-success"), condiciones.classList.remove("btn-outline-success"), condiciones.classList.add("btn-outline-danger"));
    })
    e.preventDefault();
    let cartel = document.getElementById("cartel");
    let email = document.getElementById("email").value;
    let emailExpr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let pass = document.getElementById("password1").value;
    let pass2 = document.getElementById("password2").value;
    let formCompleto = document.getElementById("formCompleto");
    let name = document.getElementById("nombre");
    let surname = document.getElementById("apellido")
  
    if (name.value !== "" && surname.value !== "" && pass.length >= 16 && emailExpr.test(email) && pass === pass2 && condiciones.checked) {
      let dataSuccess = "";
  
      dataSuccess += `<div class="alert alert-success" role="alert">
              Registrado con éxito!.
            </div>`;
      cartel.innerHTML = dataSuccess;
  
      addDataToDB(name, surname, pass, email);
  
    } else {
      formCompleto.classList.add("was-validated");
      let dataDanger = "";
      dataDanger += `<div class="alert alert-danger" role="alert">
              Datos incorrectos!.
            </div>`
      cartel.innerHTML = dataDanger;
    }
  }
  )
  
  function addDataToDB(name, surname, pass, email){
    
  
    let objUserData = {
      name: name.value,
      surname: surname.value,
      password: pass,
      email: email
  
    }
  
    const dat = JSON.parse(localStorage.getItem("users"));
    if(dat!==null){
      listUsers=dat;
    } 
  
    listUsers.push(objUserData);
    console.log(listUsers);
    localStorage.setItem("users", JSON.stringify(listUsers));
    //console.log(objUserData);
  }
}



/*const test = JSON.parse(localStorage.getItem("users"));
for(let i=0; i<test.length; i++){
  console.log(test[i].name);
}*/





