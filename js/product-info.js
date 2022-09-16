
const URL_PRODUCTO = "https://japceibal.github.io/emercado-api/products/";
const PRODUCTS_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/";
const EXTENSION_FORMAT = ".json";
const idProd = localStorage.getItem("prodID");
const urlFormateado = URL_PRODUCTO + idProd + EXTENSION_FORMAT;
const urlComments = PRODUCTS_COMMENTS + idProd + EXTENSION_FORMAT;
const comments = document.getElementsByClassName("comments-container");
const stars = document.getElementById("stars");
const btnPublish = document.getElementById("btnPublish");
let publicationList = [];
let cargaComentarios="";


if(localStorage.getItem("username")===null){
    location.href="../marketplace/login.html";
}else{

    document.addEventListener("DOMContentLoaded", ()=>{

        const listItems = JSON.parse(localStorage.getItem(`listComments${idProd}`));
        fetch(urlComments)
        .then((result)=>{return result.json()})
        .then((dat) => {
            if(listItems===null){
                publicationList = dat;
                showComment();
            }else{
                publicationList=listItems;
                showComment();
            }
            
        })
        .catch(error=>{
            console.log(error);
        });
    
        function mostrarTituloDeProducto(name){
            /*Se obtiene del JSON formateado (legible) el dato del nombre del producto
            y se lo pasa al HTML para mostrarlo la página de detalles del producto seleccionado*/ 
            let titulo="";
    
            titulo +=`<h2>${name}</h2>`
    
    
            document.getElementById("tipoDeProducto").innerHTML = titulo;
        }

    fetch(urlFormateado)
        .then((res) => {return res.json()})
        .then((data) => {
    
            let camposHTML = "";
            let imagenes = "";
            
            mostrarTituloDeProducto(data.name);

            camposHTML += `<div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h2> Precio </h2>
                    <p> UYU`+ data.cost +`</p>
                    <h2> Description </h2>
                    <p>` + data.description + `</p>
                    <h2> Categoría </h2>
                    <p>` + data.category + `</p>
                    <h2> Cantidad vendidos </h2>
                    <p>` + data.soldCount + `</p>
                    <h2>Imágenes ilustrativas:</h2>
                    </div>
    
                    
                </div>
                </div>`
    
                for(let dat in data.images){
    
                    imagenes += `
    
                    <div class="row">
                    <div class="column" id="img">
                        <img class="img-thumbnail img-fluid" src="${data.images[dat]}" class="img-thumbnail">   
                    </div>
                    </div>
                    
                    <style>
                        img{
                            width: 30%;
                        }
                        .row{
                            display: flex;
                            padding: 5px;
                            flex-wrap: wrap;
                        }
                        #id{
                            flex: 25%;
                            padding: 5px;
                        }
                    </style>
                    
                    `
                    
                }
    
            document.getElementById("dataProduct").innerHTML = camposHTML;
            document.getElementById("imgs").innerHTML = imagenes;
        })
        .catch(error=>{
            console.log(error)
        });
    })
  

    btnPublish.addEventListener("click", ()=>{
        const select = document.getElementById("scores");
        const valueAreaText = document.getElementById("textValue");
        const valueMenuScore = select.options[select.selectedIndex].value;
    
        let today = new Date();
        let nowDate = today.toLocaleDateString();
        let nowTime = today.toLocaleTimeString();
        const valueText = valueAreaText.value;
        const actualDate = nowDate;
        const actualHour = nowTime;
    
    
        console.log(nowDate);
        
        if(valueText !== ""){
               
                let comment = {
                    user: localStorage.getItem("username"),
                    description: valueText,
                    dateTime: `${actualDate} ${actualHour}`,
                    score: valueMenuScore
                }
                
                
                
                publicationList.push(comment);
                localStorage.setItem(`listComments${idProd}`, JSON.stringify(publicationList));
                //let listComments = JSON.parse(localStorage.getItem(`listComments${idProd}`));
                
                
                //console.log(JSON.parse(localStorage.getItem("listComments")));
                valueAreaText.value = "";
                
                showComment();
        }else if(valueText === ""){
            valueAreaText.value = "";
            alert("No hay ningún texto en la caja de comentarios")
        }

    
    });

    function showComment(){

        
        cargaComentarios = "";
        for(dato in publicationList){
            let item = publicationList[dato];
            
            cargaComentarios += `
            <hr style="color:black; background-color:black; width:75%;">
            <strong>${item.user}</strong>
            ${item.dateTime}
            
            <p>${item.description}</p>
            `

            for(let i=0; i<item.score; i++){

                cargaComentarios += `
                        <span class="fa fa-star checked"></span>
                
                `
                
            }

            document.getElementById("comments-container").innerHTML = cargaComentarios;
        }
    }

    
    
    
}






