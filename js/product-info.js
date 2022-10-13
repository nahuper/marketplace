
const URL_PRODUCTO = "https://japceibal.github.io/emercado-api/products/";
const PRODUCTS_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/";
const EXTENSION_FORMAT = ".json";
const idProd = localStorage.getItem("prodID");
const urlFormateado = URL_PRODUCTO + idProd + EXTENSION_FORMAT;
const urlComments = PRODUCTS_COMMENTS + idProd + EXTENSION_FORMAT;
const comments = document.getElementsByClassName("comments-container");
const stars = document.getElementById("stars");
const btnPublish = document.getElementById("btnPublish");
const btnAddToCart = document.getElementById("btnAddToCart");
let publicationList = [];
let arrayProducts = [];
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

    //let objProducts = {};
    let arrayProducts = [];
    fetch(urlFormateado)
        .then((res) => {return res.json()})
        .then((data) => {
            //console.log(data);
            showRelatedProducts(data.relatedProducts);
            mostrarTituloDeProducto(data.name);
            showData(data.cost, data.description, data.category, data.soldCount);
            showImagesOfProduct(data);
            btnAddToCart.addEventListener("click", ()=>{
                formatObject(data);
            })
            
            

            //console.log(objProducts);
        })
        .catch(error=>{
            console.log(error)
        });
    });

    
    function formatObject(data){
        
        
        let objProducts = {
                
            count: data.soldCount,
            currency: data.currency,
            id: data.id,
            image: data.images[0],
            name: data.name,
            unitCost: data.currency
        }
        arrayProducts.push(objProducts);
        
        //console.log(arrayProducts);
    }

    

    //console.log(arrayProducts);


    

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

    /** Se obtiene el id que se le pasa por parámetro y se setea en el prodID, 
     * haciendo que se sobreescriba y redirige la vista a la misma página con el producto
     * seleccionado por el usuario
     */
    function setProdId(id){
      
        localStorage.setItem("prodID", id);
        window.location = "product-info.html";
    }

    

    
    /**Se muestran los productos relacionados recorriendo el array de objetos de productos relacionados */
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
        document.getElementById("img1").innerHTML = `<img src="${data.images[0]}" class="d-block w-100" alt="...">`;
        document.getElementById("img2").innerHTML = `<img src="${data.images[1]}" class="d-block w-100" alt="...">`;
        document.getElementById("img3").innerHTML = `<img src="${data.images[2]}" class="d-block w-100" alt="...">`;
        document.getElementById("img4").innerHTML = `<img src="${data.images[3]}" class="d-block w-100" alt="...">`;
        
       
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

    /**Aquí se recorre la lista de comentarios y se muestra en pantalla */
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