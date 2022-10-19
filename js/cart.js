const USER_CART_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const prodUrl = "https://japceibal.github.io/emercado-api/products/";
const idP = localStorage.getItem("prodID");
const EXT_JSON = ".json";
const URL_PROD = prodUrl + idP + EXT_JSON;
const ID_USR = "25801";
const URL_FORMATED = USER_CART_URL + ID_USR + EXT_JSON;
const array = JSON.parse(localStorage.getItem("arrayProducts"));
const shippingCost = document.getElementById("costoEnvio");
const container = document.getElementById("container");
const premiumRadio = document.getElementById("premium");
const expressRadio = document.getElementById("express");
const standardRadio = document.getElementById("standard");
const totalCost = document.getElementById("total");
let resultShippingCost = 0;
let prechargedObjects = [];
let subtotales = [];
let nom = "";
let cost = 0;
let img = "";
let subtotal=0;
let currency="";





if(localStorage.getItem("username")===null){
    location.href="../marketplace/login.html";
}else{

    document.addEventListener("DOMContentLoaded", ()=>{
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
        showSubtotals();

    })
    })

    const inputCant = document.getElementById("valueInput");


    inputCant.addEventListener("input", ()=>{
        //console.log("prueba")
        cant = document.querySelector("input").value;
        //showModifiedData(cant);
        showData(cant);
        showSubtotals();
    })

    function calculateCost(cant, cost){
        return cost * cant;
    }


    function showData(valueInput){
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

                let subtotal = calculateCost(cant, cost);
                subtotales.push(subtotal);

                document.querySelector("input").value = cant;
                document.getElementById("img").innerHTML = `<img id="img" src=${img} width="85" height="70">`;
                document.getElementById("nom").innerHTML = nom;
                document.getElementById("cost").innerHTML = `<spam>${currency}</spam> &nbsp` + cost;
                document.getElementById("subtotal").innerHTML = `<spam>${currency}</spam>` + subtotal;

                if(valueInput > 1){
                    let subtotal = calculateCost(valueInput, cost);
                subtotales.push(subtotal);

                document.querySelector("input").value = valueInput;
                document.getElementById("img").innerHTML = `<img id="img" src=${img} width="85" height="70">`;
                document.getElementById("nom").innerHTML = nom;
                document.getElementById("cost").innerHTML = `<spam>${currency}</spam> &nbsp` + cost;
                document.getElementById("subtotal").innerHTML = `<spam>${currency}</spam>` + subtotal;
                }
            
            }
        }
    }


    function recorrerArreglo(){
        
        if(array===null){
            console.log("El array está vacío")
        }else{
            for(let i of array){
                let subtotal = calculateCost(i.count, i.unitCost);
                subtotales.push(subtotal);
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
        <spam class="rowData"><spam>${currency} &nbsp</spam>${cost}</spam>
        <input type="number" id="inputId" value=${cant} style="width: 3rem; height: 3rem; margin-left: 2.4rem;">
        <strong><spam class="subTotal"><spam>${currency}</spam>${subtotal}</spam></strong>
        <hr size="5px" style="background-color:black; width: 50rem">
          
        </div>`
    }

    let subtotalGeneral =0;
    function showSubtotals(){
        
        for(let i=0; i<subtotales.length; i++){
            subtotalGeneral += subtotales[i];
            
        }
        document.getElementById("subtotalGeneral").innerHTML = `U$D &nbsp` + subtotalGeneral;
    }


    premiumRadio.addEventListener("click", ()=>{
    
    
        resultShippingCost = subtotalGeneral * 0.15;
        shippingCost.innerHTML = `U$D &nbsp` + resultShippingCost;
        calculateTotalCost()
    });
    
    expressRadio.addEventListener("click", ()=>{
        
        resultShippingCost = subtotalGeneral * 0.7;
        shippingCost.innerHTML = `U$D &nbsp` + resultShippingCost;
        calculateTotalCost()
    });
    
    standardRadio.addEventListener("click", ()=>{
        
        resultShippingCost = subtotalGeneral * 0.05;
        shippingCost.innerHTML = `U$D &nbsp` + resultShippingCost;
        calculateTotalCost()
    });

    function calculateTotalCost(){
        let sumatoria = resultShippingCost + subtotalGeneral;
        totalCost.innerHTML = `<strong>U$D</strong> &nbsp` + `<strong>${sumatoria}</strong>`;
    }
}

