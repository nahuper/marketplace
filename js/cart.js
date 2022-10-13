const USER_CART_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const prod_url = "https://japceibal.github.io/emercado-api/products/";
const getProdId = localStorage.getItem("prodID");
const EXT_JSON = ".json";
const url_formated_products = prod_url + getProdId + EXT_JSON;
const ID_USR = "25801";
const URL_FORMATED = USER_CART_URL + ID_USR + EXT_JSON;
const countValue = document.getElementById("")
let prechargedObjects = [];
let nom = "";
let cost = 0;
let cant = 0;
let img = "";
let subtotal=0;
//let idUser = "";


if(localStorage.getItem("username")===null){
    location.href="../marketplace/login.html";
}else{

    fetch(URL_FORMATED)
    .then((result)=>{return result.json()})
    .then((jsonData) => {
        const {user, articles} = jsonData;
        //console.log(user);
        localStorage.setItem("userId", user);
        
        
        for(let i of articles){
            //console.log(i)
            prechargedObjects.push(i);
        }
        console.log(articles);
        localStorage.setItem(`dataCart${localStorage.getItem("userId")}`, JSON.stringify(prechargedObjects));
        showData();

    })

    
    
    document.addEventListener("input", ()=>{
        //const modCant = valueBox;
        cant = document.querySelector("input").value;
        showModifiedData();
    })

    function calculateCost(){
        subtotal = cost * cant;
    }

    function showModifiedData(){
        calculateCost()
        document.querySelector("input").value = cant;
        document.getElementById("img").innerHTML = `<img id="img" src=${img} width="85" height="70">`;
        document.getElementById("nom").innerHTML = nom;
        document.getElementById("cost").innerHTML = cost;
        document.getElementById("subtotal").innerHTML = subtotal;
    }

    function showData(){
        let html="";

        const arr = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`));

        for(let i of arr){
            nom = i.name;
            cost = i.unitCost;
            cant = i.count;
            img = i.image;
        }
        
        
        calculateCost();
        
        document.querySelector("input").value = cant;
        document.getElementById("img").innerHTML = `<img id="img" src=${img} width="85" height="70">`;
        document.getElementById("nom").innerHTML = nom;
        document.getElementById("cost").innerHTML = cost;
        document.getElementById("subtotal").innerHTML = subtotal;
    }
    
}

