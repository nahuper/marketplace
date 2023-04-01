

if(localStorage.getItem("username")===null){
    location.href="../marketplace/login.html";
}else{

    const imagePreview = document.getElementById("img-preview");
    const imageUploader = document.getElementById("img-uploader");
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drnsxiqf1/image/upload"
    const CLOUDINARY_UPLOAD_PRESET = "dgfwlsrq";
    let email = localStorage.getItem("username");
    const emailField = document.getElementById("email");
    const firstName = document.getElementById("firstName");
    const secondName = document.getElementById("secondName");
    const firstSurname = document.getElementById("firstSurname");
    const secondSurname = document.getElementById("secondSurname");
    const phone = document.getElementById("p");
    const btnSave = document.getElementById("saveChanges");
    emailField.innerHTML = `<input type="text" value='${email}' class="form-control" id="segundoApellido" required>`;
    const objectWithData = JSON.parse(localStorage.getItem("userData"));
    const deleteButton = document.getElementById("deleteData");
    const progress_bar = document.getElementById("img-upload");
    const deleteImage = document.getElementById("deleteImage");
    
    
    /**
     * Carga de imágen de perfil y eliminación, aquí se envía al servidor la solicitud con la imágen
     * y el servidor responde con una URL que se le pasa al localstorage y al DOM para mostrar en el sitio.
     */

    deleteImage.addEventListener("click", ()=>{
        localStorage.removeItem("image");
        location.href="../my-profile.html";
    });
    
    if(JSON.parse(localStorage.getItem('image'))===null){
        imagePreview.src = "/img/generic-avatar.svg";
    }else{
        let url_on_storage = JSON.parse(localStorage.getItem('image'));
        imagePreview.src = url_on_storage;
    }
    

    imageUploader.addEventListener("change", async (e)=>{
        //console.log(e);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        const res = await axios.post(CLOUDINARY_URL, formData, {
            Headers:{
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress(e){
                //console.log(Math.round(e.loaded * 100) / e.total);
                const progress = (e.loaded * 100) / e.total;
                progress_bar.setAttribute('value', progress);         
            }
        });
        //console.log(res);
        localStorage.setItem('image', JSON.stringify(res.data.secure_url));
        let url_on_storage = JSON.parse(localStorage.getItem('image'));
        imagePreview.src = url_on_storage;

        
    })

    /**
     * Aquí se evalúa que el objeto en el localstorage no sea NULL, y si es así,
     * se cargan los valores en los inputs
     */

    if(objectWithData!==null){
        let userData = JSON.parse(localStorage.getItem("userData"));

        for(let i of userData){
            firstName.value=`${i.firstName}`;
            secondName.value=`${i.secondName}`;
            firstSurname.value=`${i.firstSurname}`;
            secondSurname.value=`${i.secondSurname}`;
            emailField.value=`${i.email}`;
            phone.value=`${i.phone}`
        }
    }

    /**
     * Aquí se crea un objeto en el que se guardan los datos del usuario en el localstorage,
     * para mostrarse siempre en pantalla
     */

    btnSave.addEventListener("click", (e)=>{
        e.preventDefault();
        let message = document.getElementById("message");
        let name1 = document.getElementById("firstName");
        let name2 = document.getElementById("secondName");
        let surname1 = document.getElementById("firstSurname");
        let surname2 = document.getElementById("secondSurname");
        let arrayObj = [];
        let phone = document.getElementById("p");
        
        if(name1.value!=="" && surname1.value!=="" && phone.value!=="" && email!==null){
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
            message.innerHTML = `<div class="alert alert-success" role="alert">Datos modificados con éxito!</div>`;
        }
        


    })

    /**
     * Aquí se borran los datos cuando el usuario presiona el botón
     */

    deleteButton.addEventListener("click", (e)=>{
        e.preventDefault();
        firstName.value = ``;
        secondName.value =``;
        firstSurname.value = ``;
        secondSurname.value = ``;
        phone.value =``;

        localStorage.removeItem("userData");
    })
}