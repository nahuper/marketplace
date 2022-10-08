const USER_CART_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const EXT_JSON = ".json";
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
    location.href="../login.html";
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

    const valueBox = document.getElementById("value");
    valueBox.addEventListener("keyup", ()=>{
        //const modCant = valueBox;
        printOnScreen();

    })

    function printOnScreen(){
        
        const v = valueBox.value;
        console.log(v);
    }

    function calculateCost(cant){
        subtotal = cost * cant;
    }

    function showData(){
        let html="";
        //console.log(JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`)));
        nom = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`))[0].name;
        cost = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`))[0].unitCost;
        cant = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`))[0].count;
        img = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`))[0].image;
        
        calculateCost(cant);
        
        /*console.log(nom);
        console.log(cost);
        console.log(cant);*/
        document.getElementById("value").innerHTML = `<input id="valueBox" type="number" value=${cant} style="width: 3rem; height: 3rem">`
        document.getElementById("img").innerHTML = `<img id="img" src=${img} width="85" height="70">`;
        document.getElementById("nom").innerHTML = nom;
        document.getElementById("cost").innerHTML = cost;
        document.getElementById("subtotal").innerHTML = subtotal;

        /*html += `

        <hr size="5px" style="background-color:black; width: 50rem">
        <img id="img" src=${img} width="85" height="70">
        <spam id="nom" class="rowData" id="name">${nom}</spam>
        <spam id="cost" class="rowData" id="cost">U$D ${cost}</spam>
        
        <strong><spam id="subtotal" class="subTotal">U$D ${subtotal}</spam></strong>
        <hr size="5px" style="background-color:black; width: 50rem">
        `;*/

        //document.getElementById("tableData").innerHTML = html;
    }
    
}

