let list = [];


const PRODUCTS_COLLECTION = "https://japceibal.github.io/emercado-api/cats_products/101.json"

fetch(PRODUCTS_COLLECTION)
.then(response => {return response.json()})
.then(data=>{

    //console.log(data.products);

    for(let dato in data.products){
        list.push(data.products[dato]);

    }

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

}


            

})
.catch(error=>{
    console.log(error)
})

