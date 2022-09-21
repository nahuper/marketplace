
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


    /**Aquí se recibe del localstorage la lista de comentarios con su respectivo id de producto
     * y evalúa que la lista no esté vacía, si no lo está, entonces se insertan los comentarios correspondientes
     * al producto en el arreglo y los muestra y si lo está rellena el array publication list y 
     * muestra los comentarios precargados. 
     */
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

    /** Aquí se obtiene la url de los productos */    

    fetch(urlFormateado)
        .then((res) => {return res.json()})
        .then((data) => {
            showRelatedProducts(data.relatedProducts);
            mostrarTituloDeProducto(data.name);
            showData(data.cost, data.description, data.category, data.soldCount);
            showImagesOfProduct(data);
            
            //console.log(data);
            
        })
        .catch(error=>{
            console.log(error)
        });
    });

    

    function mostrarTituloDeProducto(name){
            
        let titulo="";

        titulo +=`<h2>${name}</h2>`

        
        document.getElementById("tipoDeProducto").innerHTML = titulo;
    }


    /**Aquí se recibe por parámetro todos los atributos del item y se los muestra en pantalla */

    function showData(cost, description, category, soldCount){
        let camposHTML = "";
        
        camposHTML += `<div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h2> Precio </h2>
                <p> UYU`+ cost +`</p>
                <h2> Description </h2>
                <p>` + description + `</p>
                <h2> Categoría </h2>
                <p>` + category + `</p>
                <h2> Cantidad vendidos </h2>
                <p>` + soldCount + `</p>
                <h2>Imágenes ilustrativas:</h2>
                </div>

                
            </div>
            </div>`
        
        
        document.getElementById("dataProduct").innerHTML = camposHTML;
    }


    function setProdId(id){
      
        localStorage.setItem("prodID", id);
        window.location = "product-info.html";
    }

    
    
    function showRelatedProducts(data){
        
        let itemsRelated = "";
 
        for(let itemProd of data){
           

            itemsRelated += `
            <div onclick="setProdId(${itemProd.id})" class="list-group-item list-group-item-action cursor-active" class="d-flex w-100 justify-content-between">
                <div class="row">
                    <div class="mb-1">
                        <h3>` + itemProd.name + `</h3>
                        <img class="img-thumbnail img-fluid" src="${itemProd.image}" class="img-thumbnail">
                    </div>
                </div>
            </div>
            
            <style>

                h3{
                    margin: 1rem;
                }
                img{
                    margin: 2rem;
                }
            </style>
            
            `
        }

        document.getElementById("related-products").innerHTML = itemsRelated;
    }

    /**Aquí se muestran las imágenes del artículo seleccionado */
    function showImagesOfProduct(data){
        let imagenes = "";
        
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
        document.getElementById("imgs").innerHTML = imagenes;
    }
  

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
    
    
        /** Aquí se hace el formato para mostrar los comentarios agregados por el usuario
         * y ya cargados
        */
        
        if(valueText !== ""){
               
                let comment = {
                    user: localStorage.getItem("username"),
                    description: valueText,
                    dateTime: `${actualDate} ${actualHour}`,
                    score: valueMenuScore
                }
                
                publicationList.push(comment);
                localStorage.setItem(`listComments${idProd}`, JSON.stringify(publicationList));
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
        };
    };

    
    
    
};