let list = [];
const btnFiltrar = document.getElementById("rangeFilterCount");
const btnLimpiar = document.getElementById("clearRangeFilter");
const max = document.getElementById("rangeFilterCountMax");
const min = document.getElementById("rangeFilterCountMin"); 



const urlDinamico = localStorage.getItem("urlFetch");
const PRODUCTS_COLLECTION = urlDinamico;

mostrarItems();

fetch(PRODUCTS_COLLECTION)

.then(response => {return response.json()})
.then(data=>{
    

    /*Se obtiene del JSON formateado (legible) el dato del nombre de la categoría
    y se lo pasa al HTML para mostrarlo en la categoría seleccionada*/ 
    let titulo="";

    titulo +=`<h2>${data.catName}</h2>`


    document.getElementById("tituloArticulo").innerHTML = titulo;

    console.log(data.catName);
    
    
/*Se recorre los productos dentro de una categoría dada y se muestran en 
el HTML categoría por categoría*/

    for(let dato in data.products){
        list.push(data.products[dato]);
    }
    
    mostrarItems();

})
.catch(error=>{
    console.log(error)
});


btnFiltrar.addEventListener("click", ()=>{

    let htmlContent="";

    let dato=0;

    for(dato of list){
        if(dato.cost >= min.value && dato.cost <= max.value){
            console.log(dato.soldCount);
            htmlContent += `

    
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + dato.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h2> `+ dato.name +`</h2>
                            <p> `+ dato.description +`</p>
                            <h4> U$D `+ dato.cost +`</h4>
                            </div>
                            <small class=text-muted> Cantidad venididos: `+ dato.soldCount +`</small>
                            
                        </div>
                        </div>
                    </div>
                </div>                
            `
            document.getElementById("products-list").innerHTML = htmlContent;
            
        }else if(min.value==="" && max.value===""){
            mostrarItems();
            console.log("error");
        }
        
    }
});

btnLimpiar.addEventListener("click", ()=>{
    mostrarItems();

});

function mostrarItems(){
    let htmlContent="";


    

for(let i=0; i<list.length; i++){

    
    let items = list[i];

    htmlContent += `

    
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + items.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h2> `+ items.name +`</h2>
                            <p> `+ items.description +`</p>
                            <h4> U$D `+ items.cost +`</h4>
                            </div>
                            <small class=text-muted> Cantidad venididos: `+ items.soldCount +`</small>
                            
                        </div>
                        </div>
                    </div>
                </div>                
            `
            document.getElementById("products-list").innerHTML = htmlContent;
    
    
        
};
};





