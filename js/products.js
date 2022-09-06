let list = [];
const btnFiltrar = document.getElementById("rangeFilterCount");
const btnLimpiar = document.getElementById("clearRangeFilter");
const max = document.getElementById("rangeFilterCountMax");
const min = document.getElementById("rangeFilterCountMin");
const asc = document.getElementById("sortAsc");
const desc = document.getElementById("sortDesc"); 
const descByCount = document.getElementById("sortByCount");
const urlDinamico = localStorage.getItem("urlFetch");
const cuadroBusqueda = document.getElementById("busqueda");
const PRODUCTS_COLLECTION = urlDinamico;


function setProdId(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}



/** Aqui se filtra el listado en base a lo que se escribe en el imput de búsqueda 
 * se recorra la lista de productos y se evalua que el texto ingresado en el cuadro de búsqueda
 * coincida con el título y la descripción del item.
*/
cuadroBusqueda.addEventListener("keyup", ()=>{
    //console.log(cuadroBusqueda.value);
    let texto = cuadroBusqueda.value.toLowerCase();
    texto = quitarAcentos(texto);
    let htmlContent="";
    for(let producto of list){
        let nom = producto.name.toLowerCase();
        let descr = producto.description.toLowerCase();

        if(nom.indexOf(texto) !== -1 || descr.indexOf(texto) !== -1){
            htmlContent += `

    
            <div onclick="setProdId(${producto.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h2> `+ producto.name +`</h2>
                            <p> `+ producto.description +`</p>
                            <h4> U$D `+ producto.cost +`</h4>
                            </div>
                            <small class=text-muted> Cantidad venididos: `+ producto.soldCount +`</small>
                            
                        </div>
                        </div>
                    </div>
                </div>                 
            `
            
        }
    }

    
    document.getElementById("products-list").innerHTML = htmlContent;

});


/**Con este método se quitan los acentos del texto ingresado */

function quitarAcentos(string) {

    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}




/** Se listan los items de forma descendiante en base a la cantidad de ventas */
descByCount.addEventListener("click", ()=>{
    
    
    list.sort(function(a,b){
        if(a.soldCount>b.soldCount){
            return -1;
        }
        if(a.soldCount<navigator.soldCount){
            return 1;
        }
        return 0;
    });
    mostrarItems();

});

/** Se listan los items de forma ascendente en base al costo del producto */
asc.addEventListener("click", ()=>{
    
    
    list.sort(function (a, b){
        if(a.cost > b.cost){
            return 1;
        }
        if(a.cost < b.cost){
            return -1;
        }
        return 0;

    });
    mostrarItems();
});


/**Se listan los items de forma descendente en base al costo */
desc.addEventListener("click", ()=>{
    
    
    list.sort(function (a, b){
        if(a.cost > b.cost){
            return -1;
        }
        if(a.cost < b.cost){
            return 1;
        }
        return 0;

    });
    mostrarItems();
});

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
        if(dato.cost >= min.value && dato.cost <= max.value || dato.cost >=max.value && dato.cost <= min.value){
            console.log(dato.cost);
            htmlContent += `

            <div onclick="setProdId(${dato.id})" class="list-group-item list-group-item-action cursor-active">
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
    max.value = "";
    min.value = "";

});

function mostrarItems(){
    let htmlContent="";


    

for(let i=0; i<list.length; i++){

    
    let items = list[i];

    htmlContent += `

    
    <div onclick="setProdId(${items.id})" class="list-group-item list-group-item-action cursor-active">
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