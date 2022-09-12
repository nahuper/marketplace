
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

btnPublish.addEventListener("click", ()=>{
    const select = document.getElementById("scores");
    const valueAreaText = document.getElementById("textValue");
    const valueMenuScore = select.options[select.selectedIndex].value;

    let today = new Date();
    let nowDate = today.toLocaleDateString();
    let nowTime = today.toLocaleTimeString();
    
    const valueAreaTexts = valueAreaText.value;
    const actualDate = nowDate;
    const actualHour = nowTime;
    const valueMenuScores = valueMenuScore;

    const itemList = JSON.parse(localStorage.getItem("listCommentsObj"));

    if(valueAreaTexts !== null && actualDate !== null && actualHour !== null
        && valueMenuScores !== null){
            publicationList.push(valueAreaTexts, actualDate, actualHour, 
                valueMenuScores);
            valueAreaText.value = "";
            localStorage.setItem("listCommentsObj", JSON.stringify(publicationList));
            console.log(publicationList);
    }else if(valueAreaTexts === null){
        let listOfItems=[itemList];
        localStorage.setItem("listCommentsObj", JSON.stringify(listOfItems));
        valueAreaText.value = "";
    }
  
    
    console.log(publicationList[0]);

    /*console.log(nowDate);
    console.log(nowTime);
    console.log(valueAreaText);

    console.log(valueMenuScore);*/


});

fetch(urlComments)
    .then((result)=>{return result.json()})
    .then((dat) => {
        
        cargaComentarios = "";
        for(dato in dat){
            let item = dat[dato];
            //console.log(item.score);
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
    })
    .catch(error=>{
        console.log(error);
    });

    //showStars();

    /*function showStars(item){
        const listComments = "https://japceibal.github.io/emercado-api/products_comments/";
        const jsonFormat = ".json";
        const id = localStorage.getItem("prodID");
        const urlFormed = listComments + id + jsonFormat;
        counter = item.id[0]; //captura el primer caracter
        let name = item.id.substring(1); // captura todo menos el primer caracter
        console.log(item);
        
        fetch(urlFormed)
        .then((result)=>{return result.json()})
        .then((data)=>{
          for(let score in data){
            let item = data[score];
            //console.log(item.score);
            for(let i=0; i<5; i++){
                if(i<counter){
                    document.getElementById((i+1)+name).style.color="orange";
                }
                
            }
          }
          
          
        })
    };*/

fetch(urlFormateado)
    .then((res) => {return res.json()})
    .then((data) => {

        let camposHTML = "";
        let imagenes = "";
        console.log(data)
        
        
        /*Se obtiene del JSON formateado (legible) el dato del nombre del producto
        y se lo pasa al HTML para mostrarlo la página de detalles del producto seleccionado*/ 
        let titulo="";

        titulo +=`<h2>${data.name}</h2>`


        document.getElementById("tipoDeProducto").innerHTML = titulo;

        console.log(data.catName);
        

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
                console.log(data.images[dat])
            }

        document.getElementById("dataProduct").innerHTML = camposHTML;
        document.getElementById("imgs").innerHTML = imagenes;
    })
    .catch(error=>{
        console.log(error)
    });




