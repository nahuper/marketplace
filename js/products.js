let list = [];
const PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/";
const EXTENSION = ".json";
const btnFiltrar = document.getElementById("rangeFilterCount");
const banner = document.getElementById("products-list");
const btnLimpiar = document.getElementById("clearRangeFilter");
const max = document.getElementById("rangeFilterCountMax");
const min = document.getElementById("rangeFilterCountMin");
const asc = document.getElementById("sortAsc");
const desc = document.getElementById("sortDesc"); 
const descByCount = document.getElementById("sortByCount");
const catId = localStorage.getItem("catID");
const cuadroBusqueda = document.getElementById("busqueda");
const PRODUCTS_COLLECTION = PRODUCTS + catId + EXTENSION;


if(localStorage.getItem("username")===null){
    location.href="../marketplace/login.html";
}else{
    function setProdId(id){
        localStorage.setItem("prodID", id);
        window.location = "product-info.html";
    }
    
    
    
    /** Aqui se filtra el listado en base a lo que se escribe en el imput de búsqueda 
     * se recorra la lista de productos y se evalua que el texto ingresado en el cuadro de búsqueda
     * coincida con el título y la descripción del item.
    */
    cuadroBusqueda.addEventListener("keyup", ()=>{
        let texto = cuadroBusqueda.value.toLowerCase();
        texto = quitarAcentos(texto);
        banner.innerHTML="";
        for(let producto of list){
            let nom = producto.name.toLowerCase();
            let descr = producto.description.toLowerCase();
    
            if(nom.indexOf(texto) !== -1 || descr.indexOf(texto) !== -1){
                
                banner.innerHTML += mostrarFiltrado(producto.id, producto.image, producto.name, producto.description, 
                    producto.cost, producto.soldCount);
                
            }
        }
    
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
        mostrarItems(list);
    
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
        mostrarItems(list);
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
        mostrarItems(list);
    });

    function mostrarNombreCategoria(catName){
        /*Se obtiene del JSON formateado (legible) el dato del nombre de la categoría
        y se lo pasa al HTML para mostrarlo en la categoría seleccionada*/ 
        let titulo="";
    
        titulo +=`<h2>${catName}</h2>`
    
    
        document.getElementById("tituloArticulo").innerHTML = titulo;
    }
    
    fetch(PRODUCTS_COLLECTION)
    
    .then(response => {return response.json()})
    .then(data=>{
 
        mostrarNombreCategoria(data.catName)
    /*Se recorre los productos dentro de una categoría dada y se muestran en 
    el HTML categoría por categoría*/
    
        for(let dato in data.products){
            list.push(data.products[dato]);
        }

        for(let item in list){
            let dat = list[item];

            banner.innerHTML += mostrarFiltrado(dat.id, dat.image, dat.name, dat.description, 
                dat.cost, dat.soldCount);
        }


        mostrarItems(list);
    
    })
    .catch(error=>{
        console.log(error)
    });
    

    btnFiltrar.addEventListener("click", ()=>{
    
        let dato=0;
        banner.innerHTML="";
        for(dato of list){
            if(dato.cost >= min.value && dato.cost <= max.value || dato.cost >=max.value && dato.cost <= min.value){
                

                banner.innerHTML += mostrarFiltrado(dato.id, dato.image, dato.name, dato.description, 
                    dato.cost, dato.soldCount);
                
            }else if(min.value==="" && max.value===""){
                for(let item in list){
                    let dat = list[item];
        
                    banner.innerHTML += mostrarFiltrado(dat.id, dat.image, dat.name, dat.description, 
                        dat.cost, dat.soldCount);
                }
                console.log("error");
            }
            
        }
        return variables;
    });

    
    
    btnLimpiar.addEventListener("click", ()=>{
        
        max.value = "";
        min.value = "";
        banner.innerHTML="";
        for(let item in list){
                    let dat = list[item];
        
                    banner.innerHTML += mostrarFiltrado(dat.id, dat.image, dat.name, dat.description, 
                        dat.cost, dat.soldCount);
                }
        
    
    });



    function mostrarFiltrado(id, image, name, description, cost, soldCount){
        
        let htmlContent = "";
        return `
    
        
        <div onclick="setProdId(${id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="` + image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h2> `+ name +`</h2>
                    <p> `+ description +`</p>
                    <h4> U$D `+ cost +`</h4>
                    </div>
                    <small class=text-muted> Cantidad venididos: `+ soldCount +`</small>
                    
                </div>
                </div>
            </div>
        </div>                
                `
                //document.getElementById("products-list").innerHTML += htmlContent;
    }

    };


