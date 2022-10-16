const USER_CART_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const prodUrl = "https://japceibal.github.io/emercado-api/products/";
const idP = localStorage.getItem("prodID");
const EXT_JSON = ".json";
const URL_PROD = prodUrl + idP + EXT_JSON;
const ID_USR = "25801";
const URL_FORMATED = USER_CART_URL + ID_USR + EXT_JSON;
const array = JSON.parse(localStorage.getItem("arrayProducts"));
const countValue = document.getElementById("")
const container = document.getElementById("container");
let prechargedObjects = [];
let nom = "";
let cost = 0;
let img = "";
let subtotal=0;
let currency="";


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
        localStorage.setItem(`dataCart${localStorage.getItem("userId")}`, JSON.stringify(prechargedObjects));
        showData();

    })

    
    document.addEventListener("input", ()=>{
        //console.log("prueba")
        cant = document.querySelector("input").value;
        showModifiedData(cant);
        
        
    })

    function calculateCost(cant, cost){
        return cost * cant;
    }

    function showModifiedData(cant){
        
        document.querySelector("input").value = cant;
        document.getElementById("img").innerHTML = `<img id="img" src=${img} width="85" height="70">`;
        document.getElementById("nom").innerHTML = nom;
        document.getElementById("cost").innerHTML = `<spam>${currency}</spam>` + cost;
        document.getElementById("subtotal").innerHTML = `<spam>${currency}</spam>` + calculateCost(cant, cost);
    }

    

    function showData(){
        let html="";
        let cant=0;
        const arr = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`));
        if(arr===null){
            console.log("ERROR");
        }else{
            for(let i of arr){
                nom = i.name;
                cost = i.unitCost;
                cant = i.count;
                img = i.image;
                currency = i.currency;

                
            
                document.querySelector("input").value = cant;
                document.getElementById("img").innerHTML = `<img id="img" src=${img} width="85" height="70">`;
                document.getElementById("nom").innerHTML = nom;
                document.getElementById("cost").innerHTML = `<spam>${currency}</spam>` + cost;
                document.getElementById("subtotal").innerHTML = `<spam>${currency}</spam>` + calculateCost(cant, cost);
            
            }
        }
    }


    function recorrerArreglo(){
        
        if(array===null){
            console.log("El array está vacío")
        }else{
            for(let i of array){
                let subtotal = calculateCost(i.count, i.unitCost);
                container.innerHTML += showProds(i.count, i.image, i.name, i.unitCost, subtotal, i.currency);
            }
        }
        
    }

    recorrerArreglo();

    function showProds(cant, img, nom, cost, subtotal, currency){
        return `<div class="col-6" id="tableData">
        <hr size="5px" style="background-color:black; width: 50rem">
        <img id="img" src=${img} width="85" height="70">
        <spam class="rowData">${nom}</spam>
        <spam class="rowData"><spam>${currency}</spam>${cost}</spam>
        <input type="number" id="inputId" value=${cant} style="width: 3rem; height: 3rem; margin-left: 2.4rem;">
        <strong><spam class="subTotal"><spam>${currency}</spam>${subtotal}</spam></strong>
        <hr size="5px" style="background-color:black; width: 50rem">
          
        </div>`
    }
}

