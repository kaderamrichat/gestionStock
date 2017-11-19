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
   * @return {undefined} Renvoi rien
   */
  const start = function (){
    let elem = document.getElementById("addProductBtn");
    elem.addEventListener("click", function(){
      addNewProduct();
      //viewProduct();
    });
  };


/**
 * Fonction ajouter nouveau produit avec check sur les nom & les prix, les autres param sont optionnels
 * @return {undefined} Renvoi rien
 */

//receiveVarXX -> pour les variable venant du formulaire
  function addNewProduct(){
    let receiveName   = document.getElementById("name");
    let receiveDesc   = document.getElementById("desc");
    let receiveColor  = document.getElementById("color");
    let receivePrice  = document.getElementById("price");

    //checks
    let nameChecked="",priceChecked="";
    if (receiveName.value === "") {
      document.getElementById("msgName").innerHTML = "Champ obligatoire";
      receiveName.style.border = "2px solid #D11D05";
    } else {
      nameChecked = receiveName.value.trim();
      document.getElementById("msgName").innerHTML = "";
      receiveName.style.border = "";
    }

    if (isNaN(receivePrice.value) || (receivePrice.value === "") ) {
        if(receivePrice.value === ""){
          document.getElementById("msgPrice").innerHTML = "le champ ne doit pas être vide";
          receivePrice.style.border = "2px solid #D11D05";
        }
        if(isNaN(receivePrice.value)){
          document.getElementById("msgPrice").innerHTML = "le champ doit être un nombre";
          receivePrice.style.border = "2px solid #D11D05";
        }

    } else {
      priceChecked = receivePrice.value.trim();
      document.getElementById("msgPrice").innerHTML = "";
      receivePrice.style.border = "";
    }

    //On crèe l'instance et on l'enregistre dans le tableau
    if ((nameChecked !== "") && priceChecked !== ""){
    productName = new Produit({
        ref  : id,
        name : nameChecked,//Trim() retire les blancs en début et fin de chaine
        desc : receiveDesc.value,
        color: receiveColor.value,
        price: priceChecked
    });
    id += 1;
    stockArray.push(productName);
    // On réinitialise les champs
    receiveName.value = "";
    receiveDesc.value = "";
    receiveColor.value = "";
    receivePrice.value = "";
    }
    viewProduct();
  }

/**
 * Fonction d'affichage des produits.contenu dans le tableau
 * @return {undefined}
 */
  function viewProduct(){
    let designRow = document.getElementById("afficher");
      if (stockArray.length >= 0){
        designRow.innerHTML = ""; //Vider avant d'afficher
        for (let i=0; i < stockArray.length; i++){
          designRow.innerHTML += `
          <tr class="line">
            <td>${stockArray[i].name}</td>
            <td>${stockArray[i].desc}</td>
            <td>${stockArray[i].color}</td>
            <td>${stockArray[i].price}</td>
            <td><i id="updtBtn" class="fa fa-pencil-square-o selected" aria-hidden="true" onclick="app.updateItem(${i})"></i></td>
            <td><i id="supprBtn" class="fa fa-trash-o" aria-hidden="true" onclick="app.deleteItem(${i})" ></i></td>
          </tr>`;
        }
      }
  }

/**
 * Fonction de suppression de ligne
 * @param  {number} num On récupère le numéro index au click
 * @return {undefined}  retourne rien
 */
 let deleteItem = (num) => {
     stockArray.splice(num, 1);
     viewProduct();
   };

   /**
    * Fonction de modification de ligne
    * @param  {number} num On récupère le numéro index au click
    * @return {undefined}  retourne rien
    */
let updateItem = (num) =>{

  let trOnGoing = document.querySelectorAll(".line");// selection des tr
  let countTD = trOnGoing[num].cells.length; //vaut 6
  console.log(countTD);
  console.log(trOnGoing[num]);
  trOnGoing[num].cells[0].innerHTML = `<input class="modify" id="updtName"type='text' value='${stockArray[num].name}'>`;
  trOnGoing[num].cells[1].innerHTML = `<input class="modify" id="updtDesc"type='text' value='${stockArray[num].desc}'>`;
  trOnGoing[num].cells[2].innerHTML = `<input class="modify" id="updtColor"type='text' value='${stockArray[num].color}'>`;
  trOnGoing[num].cells[3].innerHTML = `<input class="modify" id="updtPrice"type='text' value='${stockArray[num].price}'>`;
  trOnGoing[num].cells[4].innerHTML = '<i class="fa fa-check" aria-hidden="true" id="submit"></i>';
  trOnGoing[num].cells[5].innerHTML = '<i class="fa fa-times" aria-hidden="true" id="cancel"></i';

  // Pour désactiver les autres boutons modifier
  var totaBtnAfterClick = document.querySelectorAll(".selected");
  for (let i=0; i < totaBtnAfterClick.length; i++){
    totaBtnAfterClick[i].onclick="";
  }

  document.getElementById("cancel").addEventListener("click", function(){
      viewProduct();
  });

  document.getElementById("submit").addEventListener("click", function(){
        stockArray[num].name = updtName.value;
        stockArray[num].desc = updtDesc.value;
        stockArray[num].color = updtColor.value;
        stockArray[num].price = updtPrice.value;
      viewProduct();

  });
};

  window.onload = function (){
    start();
    viewProduct();

  };
  return {
    //On renvoi les fonctions pour pouvoir les réutiliser
    deleteItem:deleteItem,
    updateItem:updateItem,
    viewProduct
  };
}());
