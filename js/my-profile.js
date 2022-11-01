if(localStorage.getItem("username")===null){
    location.href="../marketplace/login.html";
}else{
    let email = localStorage.getItem("username");
    const emailField = document.getElementById("email");
    const firstName = document.getElementById("name1");
    const secondName = document.getElementById("name2");
    const firstSurname = document.getElementById("surname1");
    const secondSurname = document.getElementById("surname2");
    const phone = document.getElementById("phone");
    const btnSave = document.getElementById("saveChanges");
    emailField.innerHTML = `<input type="text" value='${email}' class="form-control" id="segundoApellido" required>`;
    const objectWithData = JSON.parse(localStorage.getItem("userData"));
    const deleteButton = document.getElementById("deleteData");
    
    if(objectWithData!==null){
        let userData = JSON.parse(localStorage.getItem("userData"));

        for(let i of userData){
            firstName.innerHTML=`<input type="text" value='${i.firstName}'class="form-control" id="firstName" required>`;
            secondName.innerHTML=`<input type="text" value='${i.secondName}' class="form-control" id="secondName">`;
            firstSurname.innerHTML=`<input type="text" value='${i.firstSurname}' class="form-control" id="firstSurname" required>`;
            secondSurname.innerHTML=`<input type="text" value='${i.secondSurname}' class="form-control" id="secondSurname">`;
            emailField.innerHTML=`<input type="text" value='${i.email}' class="form-control" id="email">`;
            phone.innerHTML=`<input type="text" value='${i.phone}' class="form-control" id="p" required>`
        }
    }

    btnSave.addEventListener("click", (e)=>{
        e.preventDefault();
        let message = document.getElementById("message");
        let name1 = document.getElementById("firstName");
        let name2 = document.getElementById("secondName");
        let surname1 = document.getElementById("firstSurname");
        let surname2 = document.getElementById("secondSurname");
        let arrayObj = [];
        let phone = document.getElementById("p");
        
        if(name1.value!=="" && surname1.value!=="" && phone.value!==""){
            let dataSet = {
                firstName: name1.value,
                secondName: name2.value,
                firstSurname: surname1.value,
                secondSurname: surname2.value,
                email: email,
                phone: phone.value
            }

            arrayObj.push(dataSet);
            localStorage.setItem('userData', JSON.stringify(arrayObj));
            
        }

        message.innerHTML = `<div class="alert alert-success" role="alert">Datos modificados con éxito!</div>`;


    })

    deleteButton.addEventListener("click", (e)=>{
        e.preventDefault();
        firstName.innerHTML=`<input type="text" value=''class="form-control" id="firstName" required>`;
        secondName.innerHTML=`<input type="text" value='' class="form-control" id="secondName">`;
        firstSurname.innerHTML=`<input type="text" value='' class="form-control" id="firstSurname" required>`;
        secondSurname.innerHTML=`<input type="text" value='' class="form-control" id="secondSurname">`;
        phone.innerHTML=`<input type="text" value='' class="form-control" id="p" required>`

        localStorage.removeItem("userData");
    })


    

}