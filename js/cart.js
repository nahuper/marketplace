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
const creditCard = document.getElementById("creditCard");
const bankTransfer = document.getElementById("bankTranfer");
const buttonSelectPaymentMethod = document.getElementById("buttonSelect");
const totalCost = document.getElementById("total");
const accountNmberBank = document.getElementById("accountNumber");
const numberCard = document.getElementById("numberCard");
const securityCode = document.getElementById("codigoSeg");
const vencimiento = document.getElementById("vencimiento");
const btnBuy = document.getElementById("btnBuy");
let resultShippingCost = 0;
let prechargedObjects = [];
let subtotales = [];
let nom = "";
let cost = 0;
let img = "";
let subtotal=0;
let currency="";





if(localStorage.getItem("username")===null){
    location.href="../login.html";
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
        calculateGeneralCostOfList();

    })
    })

    const inputCant = document.getElementById("valueInput");


    inputCant.addEventListener("input", ()=>{
        cant = document.querySelector("input").value;
        showData(cant);
        showSubtotals();
        
    })

    function calculateCost(cant, cost){
        return cost * cant;
    }

    let subt=0;
    let cant=0;
    
    function showData(valueInput){
        let html="";
        //let cant=0;
        const arr = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`));
        if(arr===null){
            console.log("ERROR");
        }else{

            let subtotal = calculateCost(cant, cost);
            subt = subtotal;
            for(let i of arr){
                nom = i.name;
                cost = i.unitCost;
                cant = i.count;
                img = i.image;
                currency = i.currency;

                document.getElementById("img").innerHTML = `<img id="img" src=${img} width="85" height="70">`;
                document.getElementById("nom").innerHTML = nom;
                document.getElementById("cost").innerHTML = `<spam>${currency}</spam> &nbsp` + cost;
                document.getElementById("subtotal").innerHTML = `<spam>${currency}</spam>` + subtotal;

               
            }
        }
    }



    function recorrerArreglo(){
        
        //let subt=0
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
    let result=0;
    function calculateGeneralCostOfList(){
        
        if(subtotales!==null){
            for(let i=0; i<subtotales.length; i++){
                result+=subtotales[0];
            }
            showSubtotals();
        }
        
    }

    
   

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

   


    let subtotalGeneral=0;
    function showSubtotals(){
        
        subtotalGeneral = subtotalGeneral + subt + result;
        document.getElementById("subtotalGeneral").innerHTML = `U$D &nbsp` + subtotalGeneral;
    }


    premiumRadio.addEventListener("click", ()=>{
    
        let mitad = subtotalGeneral*(15/100);
        resultShippingCost = mitad * 0.15;
        shippingCost.innerHTML = `U$D &nbsp` + resultShippingCost;
        calculateTotalCost()
    });
    
    expressRadio.addEventListener("click", ()=>{
        
        let mitad = subtotalGeneral*(7/100);
        resultShippingCost = mitad * 0.07;
        shippingCost.innerHTML = `U$D &nbsp` + resultShippingCost;
        calculateTotalCost()
    });
    
    standardRadio.addEventListener("click", ()=>{
        
        let mitad = subtotalGeneral*(5/100);
        resultShippingCost = mitad * 0.05;
        shippingCost.innerHTML = `U$D &nbsp` + resultShippingCost;
        calculateTotalCost()
    });


    function calculateTotalCost(){
        let sumatoria = resultShippingCost + subtotalGeneral;
        totalCost.innerHTML = `<strong>U$D</strong> &nbsp` + `<strong>${sumatoria}</strong>`;
    }

    buttonSelectPaymentMethod.addEventListener("click", ()=>{
        creditCard.checked ? false : true && 
        bankTransfer.checked ? false : true

        accountNmberBank.disabled = true;
        numberCard.disabled=true;
        securityCode.disabled=true;
        vencimiento.disabled=true;
        
    })
    
    creditCard.addEventListener("click", ()=>{
        
        creditCard.checked ? true : false

        let creditCardValue = creditCard.value;
        document.getElementById("tipoDePago").innerHTML=`${creditCardValue}`;
        accountNmberBank.disabled = true;
        numberCard.disabled=false;
        securityCode.disabled=false;
        vencimiento.disabled=false;
    })

    bankTransfer.addEventListener("click", ()=>{
        
        bankTransfer.checked ? true : false
        
        let bankTransferValue = bankTransfer.value;
        document.getElementById("tipoDePago").innerHTML = `${bankTransferValue}`;
        accountNmberBank.disabled = false;
        numberCard.disabled=true;
        securityCode.disabled=true;
        vencimiento.disabled=true;
    })

    btnBuy.addEventListener("click", ()=>{
  
        const road = document.getElementById("calle");
        const number = document.getElementById("numero");
        const corner = document.getElementById("esquina");
        const notice_alert = document.getElementById("aviso_alerta");
        const alertMessage = document.getElementById("mensajeDeAlerta");
        const message = document.getElementById("mensaje");
        const successfullPurchase = document.getElementById("compraExitosa");


        let selectCardOrBank = false;
        let selectTypeOfShipping = false;
        let cantProductValue = false;
        let dataOfShippingValue = false;
        let cardData = false;
        let bankData = false;
        
        
        road.value=="" || number.value=="" || corner.value=="" ? 
        (alert("ALERTA!: Faltan los datos de envío"), dataOfShippingValue=false) : (dataOfShippingValue=true);

        creditCard.checked===true || bankTransfer.checked===true ? 
        (notice_alert.innerHTML=``, selectCardOrBank=true) : (notice_alert.innerHTML=`Debe seleccionar una forma de pago`, selectCardOrBank=false);

        premiumRadio.checked===true || expressRadio.checked===true || standardRadio.checked===true ? 
        (message.innerHTML=``, selectTypeOfShipping=true) : (message.innerHTML=`Debe seleccionar una opción`, selectTypeOfShipping=false);
        
        inputCant.value > 0 ? 
        (alertMessage.innerHTML = ``, cantProductValue=true) : (alertMessage.innerHTML = `Debe selecciónar al menos un producto de la lista`, cantProductValue=false)



        if(creditCard.checked===false && bankTransfer.checked===true){

            if(bankTransfer.value!==""){
                bankData=true;
            }else{
                bankData=false;
                alert("ALERTA!: Faltan datos bancarios");
            }
            
        }
    

        if(creditCard.checked===true && bankTransfer.checked===false){

            if(creditCard.value != "" && securityCode.value != "" && vencimiento.value != ""){
                cardData=true;
            }else{
                cardData=false;
                alert("ALERTA!: Faltan datos de la tarjeta");
            }
            
        }

        if(creditCard.checked===true && bankTransfer.checked===false || creditCard.checked===false && bankTransfer.checked===true
            || creditCard.checked===false && bankTransfer.checked===false){
                if(selectCardOrBank===false || selectTypeOfShipping===false || cantProductValue===false || dataOfShippingValue===false || cardData===false){
                    console.log("ERROR")
                    //compraExitosa.hidden=true;
                }else{
                    console.log("CORRECTO");
                    successfullPurchase.innerHTML = `<div class="alert alert-success" role="alert">
                        Compra realizada con éxito!
                    </div>`
                }
        }
    })
    
}

