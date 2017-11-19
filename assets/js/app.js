/*jshint esversion:6*/
var app = (function (){
  "use strict";

  /*###### PARTIE DECLARATION DES VARIABLES */
  let id = 1; //Servira pour l'id unique
  let productName = "prod" + id;
  let stockArray = [{ref:100, name:"apple",desc:"Pour le dev & autre", color:"gris", price:2000},{ref:101, name:"pc",desc:"Pour le game & autre", color:"noir", price:1490}];
  //let stockArray = [];


  /**
   * Constructor qui va nous servir à créer les objets
   * @param       {Object} prod La ref est automatique & on attend les 4 autres paramètres
   * @constructor
   */
  let Produit = function Produit(prod){

    if (!(this instanceof Produit)) {
      throw new Error("Alors comme ça on oublie le mot clé 'new' ??!!");
    }
      this.ref = prod.ref;
      this.name = prod.name;
      this.desc = prod.desc;
      this.color = prod.color;
      this.price = prod.price;
  };

  /**
   * Fonction principale qui va appeler les autres
   * @return {undefined} [description]
   */
  const start = function (){
    let elem = document.getElementById("addProductBtn");
    elem.addEventListener("click", function(){
      addNewProduct();
      viewProduct();
    });
  };


//fonction création instance
//receiveVarXX -> pour les variable venant du formulaire
  function addNewProduct(){
    let receiveName   = document.getElementById("name");
    let receiveDesc   = document.getElementById("desc");
    let receiveColor  = document.getElementById("color");
    let receivePrice  = document.getElementById("price");

    productName = new Produit({
        ref  : id,
        name : receiveName.value.trim(),//Trim() retire les blancs en début et fin de chaine
        desc : receiveDesc.value,
        color: receiveColor.value,
        price: receivePrice.value
    });
    id += 1;
    if (receiveName.value){
      stockArray.push(productName);
    } else {
      console.log("Vous devez entrer une valeur pour name");
    }
    //arr.splice(1,1);

    // Rénitialise les champs
    receiveName.value = "";
    receiveDesc.value = "";
    receiveColor.value = "";
    receivePrice.value = "";

    //On affiche
  }

//afficher les produits
  function viewProduct(){
    //console.table(stockArray);
    let designRow = document.getElementById("afficher");
      if (stockArray.length >= 0){
        designRow.innerHTML = ""; //Vider avant d'afficher
        for (let i=0; i < stockArray.length; i++){
          designRow.innerHTML += `
          <tr>
            <td>${stockArray[i].name}</td>
            <td>${stockArray[i].desc}</td>
            <td>${stockArray[i].color}</td>
            <td>${stockArray[i].price}</td>

            <td><a href="#"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
            <td><a id="supprBtn" data-num =${i} onclick="app.deleteItem(${i})" class="deleteBtn" href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>
          </tr>`;
        }
      }
  }

  // <td><button id="supprBtn" data-num =${i} onclick="app.deleteItem(${i})" class="deleteBtn" href="#">X</button></td>
  // <td><a id="supprBtn${i}" class="deleteBtn" href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>

 function deleteItem(num){
     // let deleteLink = document.querySelectorAll(".deleteBtn");
     // let deleteLinkId = document.getElementById("supprBtn");
     // console.log(num);

     stockArray.splice(num,1);
     viewProduct();



   }

  window.onload = function (){
    start();
    viewProduct();

  };
  return {
    deleteItem:deleteItem
  };
}());


// lire le tableau 2

// target le ul 3

// click
//
// document.getElementById("clickList").onclik = function (){
// }



//
