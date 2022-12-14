
const idP = localStorage.getItem("prodID");
const ID_USR = "25801";
const URL_PROD = PRODUCT_INFO_URL + idP + EXT_TYPE;
const URL_FORMATED = CART_INFO_URL + ID_USR + EXT_TYPE;
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
    location.href="/marketplace/login.html";
}else{


    const getUserData = (road, doorNumber, corner, cardNumb, securityCode, vencimiento, sum,
        subtotalGeneral, resultShippingCost, accountNmberBank) => ({
        r: road,
        doorNumb: doorNumber,
        esq: corner,
        creditC: cardNumb,
        secCode: securityCode,
        venc: vencimiento,
        sumatory: sum,
        subtGeneral: subtotalGeneral,
        resultShipCost: resultShippingCost,
        bankAccount: accountNmberBank

    });
  

    

    const sendClientData = async (road, doorNumber, corner, cardNumb, securityCode, vencimiento, sum, subtotalGeneral, resultShippingCost, accountNmberBank) =>{
        try{
            const response = await fetch(CART_INFO_URL, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(getUserData(road, doorNumber, corner, cardNumb, securityCode, vencimiento, sum, subtotalGeneral, resultShippingCost, accountNmberBank)),
            });
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }catch (error){
            console.log(error);
        }
    };



    



    /**
     * Aqu?? se obtiene de la API los datos y se desestructura,
     * para luego se recorrido y guardado en un array, posteriormente se guarda en el 
     * localstorage para su uso, se muestran los datos y se calcula el costo de los productos
     * agregados por el usuario.
     */

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

    

    /**
     * Aqu?? en base al evento input, se actualiza el subtotal,
     * y se muestra los datos actualizados.
     */

    const inputCant = document.getElementById("valueInput");

    inputCant.addEventListener("input", ()=>{
        cant = document.querySelector("input").value;
        showData(cant);
        showSubtotals();
        
    })

    function calculateCost(cant, cost){
        return cost * cant;
    }

    /**
     * Aqu?? se muestra los datos del producto cargado por defecto
     */

    let subt=0;
    let cant=0;
    
    function showData(){
        let html="";
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


    /**
     * Aqu?? se recorre el arreglo de productos agregados por el usuario
     * y se muestra en pantalla todos los datos y su subtotal
     */

    function recorrerArreglo(){
        
        //let subt=0
        if(array===null){
            console.log("El array est?? vac??o")
        }else{
            for(let i of array){
                let subtotal = calculateCost(i.count, i.unitCost);
                subtotales.push(subtotal);
                container.innerHTML += showProds(i.count, i.image, i.name, i.unitCost, subtotal, i.currency);
            }
        }
        
    }


    /**
     * Aqu?? se calcula el costo de la lista de art??culos agregados por el usuario
     */
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

    
   
    /**
     * Aqu?? se crea el formato HTML para mostrar los art??culos en pantalla
     */
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

   

    /**
     * Aqu?? se calcula el subtotal general y se muestra en pantalla, si se agrega un art??culo
     * por parte del usuario, el valor de result se va a incrementar en base a cada subtotal.
     * Y se calcula el costo total a pagar en base a los subtotales y al tipo de env??o seleccionado.
     */
    let subtotalGeneral=0;
    let sumatoria = 0;
    function showSubtotals(){
        
        subtotalGeneral = subtotalGeneral + subt + result;
        document.getElementById("subtotalGeneral").innerHTML = `U$D &nbsp` + subtotalGeneral;
    }

    function calculateTotalCost(){
        sumatoria = resultShippingCost + subtotalGeneral;
        totalCost.innerHTML = `<strong>U$D</strong> &nbsp` + `<strong>${sumatoria}</strong>`;
    }


    /**
     * Aqu?? en base al evento de radio button, se hacen los c??lculos correspondientes
     * al tipo de env??o deseado.
     */

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


    /**
     * Aqu?? se habilitan o deshabilitan los campos en base a la opci??n seleccionada
     */
    

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


    /**
     * Aqu?? se eval??a que todos los campos del formulario de compra est??n rellenos,
     * si no, no se realizar?? el env??o.
     */
    btnBuy.addEventListener("click", ()=>{
  
        const road = document.getElementById("calle");
        const number = document.getElementById("numero");
        const corner = document.getElementById("esquina");
        const notice_alert = document.getElementById("aviso_alerta");
        const alertMessage = document.getElementById("mensajeDeAlerta");
        const message = document.getElementById("mensaje");
        const successfullPurchase = document.getElementById("compraExitosa");
        const formComplete = document.getElementById("form");

        let selectCardOrBank = false;
        let selectTypeOfShipping = false;
        let cantProductValue = false;
        let dataOfShippingValue = false;
        let cardData = false;
        let bankData = false;
        
        
        road.value=="" || number.value=="" || corner.value=="" ? 
        (dataOfShippingValue=false) : (dataOfShippingValue=true);

        creditCard.checked===true || bankTransfer.checked===true ? 
        (notice_alert.innerHTML=``, selectCardOrBank=true) : (notice_alert.innerHTML=`Debe seleccionar una forma de pago`, selectCardOrBank=false);

        premiumRadio.checked===true || expressRadio.checked===true || standardRadio.checked===true ? 
        (message.innerHTML=``, selectTypeOfShipping=true) : (message.innerHTML=`Debe seleccionar una opci??n`, selectTypeOfShipping=false);
        
        inputCant.value > 0 ? 
        (alertMessage.innerHTML = ``, cantProductValue=true) : (alertMessage.innerHTML = `Debe selecci??nar al menos un producto de la lista`, cantProductValue=false)



        if(creditCard.checked===false && bankTransfer.checked===true){

            if(accountNmberBank.value!==""){
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
            }
            
        }

        if(creditCard.checked===true && bankTransfer.checked===false || creditCard.checked===false && bankTransfer.checked===true
            || creditCard.checked===false && bankTransfer.checked===false){
                if(selectCardOrBank===false || selectTypeOfShipping===false || cantProductValue===false || dataOfShippingValue===false || cardData===false && bankData===false){
                    console.log("ERROR");
                    formComplete.classList.add("was-validated");
                    //compraExitosa.hidden=true;
                }else{
                    sendClientData(road.value, number.value, corner.value, numberCard.value, securityCode.value, 
                        vencimiento.value, sumatoria, subtotalGeneral, resultShippingCost, accountNmberBank.value);
                    console.log("CORRECTO");
                    successfullPurchase.innerHTML = `<div class="alert alert-success" role="alert">
                        Compra realizada con ??xito!
                    </div>`
                }
        }
            cleanFields();
        
    })

    async function cleanFields(){
        const road = document.getElementById("calle");
        const number = document.getElementById("numero");
        const corner = document.getElementById("esquina");
        road.value="";
                number.value="";
                corner.value="";
                numberCard.value="";
                securityCode.value="";
                vencimiento.value="";
                accountNmberBank.value="";
        
    }
    
}

