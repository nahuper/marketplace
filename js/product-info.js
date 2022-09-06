
const URL_PRODUCTO = "https://japceibal.github.io/emercado-api/products/";
const EXTENSION_FORMAT = ".json";
const idProd = localStorage.getItem("prodID");
const urlFormateado = URL_PRODUCTO + idProd + EXTENSION_FORMAT;
let listaImagenes = [];




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




