/*jshint esversion:6*/
var app = (function (){
  "use strict";

  /*###### PARTIE DECLARATION DES VARIABLES */
  let id = 1;
  let productName = "prod" + id;
  let stockArray = [];


  // Constructeur ...
  let Produit = function Produit(prod){
      this.ref = prod.ref;
      this.name = prod.name;
      this.desc = prod.desc;
      this.color = prod.color;
      this.price = prod.price;
      //this.image = prod.image; // chemin vers l'image
  };

  let prod1 = new Produit ({
    ref : 1,
    name : "basket",
    price : 100,
    desc : "Running pour courrir vite ...",
    color : "rouge"
});

//fonction création instance
//receiveVarXX -> pour les variable venant du formulaire
function addNewProduct(){
  document.getElementById("addProductBtn").addEventListener("click", function(){
    let receiveName   = document.getElementById("name");
    let receiveDesc   = document.getElementById("desc");
    let receiveColor  = document.getElementById("color");
    let receivePrice  = document.getElementById("price");
    let globalView = document.getElementById("afficher");

    productName = new Produit({
        ref  : id,
        name : receiveName.value,
        desc : receiveDesc.value,
        color: receiveColor.value,
        price: receivePrice.value
    });
    id += 1;
    stockArray.push(productName);

    //arr.splice(1,1);
    console.log(stockArray);
    //viewProduct();
    //globalView.innerHTML += `<li>${receiveName.value} - ${receiveDesc.value} - ${receiveColor.value} - ${receivePrice.value}</li>`;
    globalView.innerHTML += `<tr>
      <td>${receiveName.value}</td>
      <td>${receiveDesc.value}</td>
      <td>${receiveColor.value}</td>
      <td>${receivePrice.value}</td></tr>`;

    // Rénitialise les champs
    receiveName.value = "";
    receiveDesc.value = "";
    receiveColor.value = "";
    receivePrice.value = "";
  });

}

//afficher les produits
function viewProduct(){

  //globalView.innerHTML += `<li>${receiveName} - ${receiveDesc} - ${receiveColor} - ${receivePrice}</li>`;


}

// fonction pour stocker le produit créer dans un tableau général

// fonction qui cree une ref auto

  window.onload = function (){
    console.log("Doc ready ...");
    addNewProduct();
    console.log(productName);
  };

}());
