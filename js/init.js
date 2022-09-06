const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


/**Aquí se obtiene el id de categoría y se guarda en el local storage la url de los items */
const datoId = localStorage.getItem("catID");

/**Aquí se construye la URL para listar los productos y se guarda en el local storage*/
const url = PRODUCTS_URL + datoId + EXT_TYPE;
console.log(url);
localStorage.setItem("urlFetch", url);


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}



let getJSONData = function(url){
  let result = {};
  showSpinner();
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
  });
}


/*Aquí se toma el dato del nombre de usuario desde el local storage y se muestra en la página con innerHTML*/
const btn = document.getElementById("btnLogin");


  if(localStorage.getItem("username")){
    let nombreUsuario = localStorage.getItem("username");
    document.getElementById("usrName").innerHTML = `<a class="nav-item">${nombreUsuario}</a>`
    console.log(nombreUsuario);
      
  }else{
      console.log("No hay entradas en el local storage");
  }





