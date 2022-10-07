const USER_CART_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const EXT_JSON = ".json";
const ID_USR = "25801";
const URL_FORMATED = USER_CART_URL + ID_USR + EXT_JSON;
let prechargedObjects = [];
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
        showDataOnConsole();

    })

    function showDataOnConsole(){
        let html="";
        console.log(JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`)));
        let nom = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`))[0].name;
        let cost = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`))[0].unitCost;
        let cant = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`))[0].count;
        let img = JSON.parse(localStorage.getItem(`dataCart${localStorage.getItem("userId")}`))[0].image;
        let subtotal = cost * cant;
        console.log(nom);
        console.log(cost);
        console.log(cant);
        
        html += `

        <hr size="5px" style="background-color:black; width: 50rem">
        <img src=${img} width="85" height="70">
        <spam class="rowData" id="name">${nom}</spam>
        <spam class="rowData" id="cost">U$D ${cost}</spam>
        <input id="valueBox" type="number" value=${cant} style="width: 3rem; heigth: 3rem">
        <strong><spam class="subTotal">U$D ${subtotal}</spam></strong>
        <hr size="5px" style="background-color:black; width: 50rem">
        `;

        document.getElementById("tableData").innerHTML = html;
    }
    
}

