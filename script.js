
"use strict"

// Génération des données avec fetch et json

fetch('data.json').then(function (response) {
  response.json().then(function (data) {
    //console.log(data);
    data.forEach((elem) => document.querySelector(".listeAnalogies").innerHTML += '<div class="cache" id="'
      + elem.identifiant
      + '"><section'
      + '><h2>Si j’étais '
      + elem.analogie
      + ' je serais '
      + elem.valeurAnalogie
      + '</h2> </section>'
      + '<br>'
      + '<section><p>'
      + elem.justification
      + '<br>'
      + '</section>'
      + '<img src="' + elem.image +'" alt="'+ elem.valeurAnalogie+'">'
      + '</p> <div class="circleBottom "></div> </div>',
    );
    // Changement de couleur du cercle pour chaque partie
    data.forEach((elem) => {
      var rond= document.querySelector(".listeAnalogies #" + elem.identifiant + " .circleBottom");
      rond.style.backgroundColor = elem.couleur;
    });

    // Génération de la barre de navigation
    data.forEach((elem) => document.querySelector("nav ul").innerHTML += '<li class="'
      + elem.identifiant
      + '"> <img src="'+ elem.image
      + '" alt="barre de navigation :'+ elem.valeurAnalogie+ '"></li>'
    );
    // Bouton formulaire dans la barre de navigation
    document.querySelector("nav ul").innerHTML += ' <li class="formulaire"> <img src="image/formulaire.svg" alt="Image-Navigation-formulaire"></li>';


    // Ajouter la classe "cache" à toutes les pages

    var pages = document.querySelectorAll(".cache");
    pages.forEach(function (page) {
      page.classList.add("cache");
    });

    // Pour changer de page

    // Afficher les différentes pages
    var navigation = document.querySelectorAll("nav li");
    navigation.forEach(function (bouton) {
      bouton.addEventListener("click", function () {

        // récupérer la classe de la page à afficher
        var pageClass = bouton.getAttribute("class");

        // Masquer toutes les pages
        pages.forEach(function (page) {
          page.classList.add("cache");
        });

        // Afficher la page sélectionnée
        var pageAffichage = document.querySelector("#" + pageClass);
        pageAffichage.classList.remove("cache");
        
        // Afficher le rond
        if(document.querySelector("#" + pageClass+" .circleBottom")<document.querySelector("main")){
        document.querySelector("#" + pageClass+" .circleBottom").classList.remove("cache");
        };

      });
    });

    formulaire_ET_API();
    

  });
});

// -------------------------------------------------------------------------------------------------------------------------

// Bouton Découvrir

// Pour passer de la page d'accueil aux différentes pages du portrait chinois

var boutonDecouvrir = document.querySelector("#decouvrir");
boutonDecouvrir.addEventListener("click", function () {
  // récupérer la classe de la page à afficher
  var pageClass = boutonDecouvrir.getAttribute("class");
  
  // Masquer la page header
  document.querySelector("header").classList.add("cache");

  // Afficher la page et la barre de navigation
  var pageDebut = document.querySelector("#" + pageClass);
  pageDebut.classList.remove("cache");
  document.querySelector("#" + pageClass+" .circleBottom").classList.remove("cache");

  var Nav = document.querySelector("nav");
  Nav.classList.remove("cache");
  Nav.classList.add("visible");

  // Afficher le bouton retour à l'accueil
  document.querySelector(".maison").classList.remove("cache");
  document.querySelector(".maison").classList.add("visible");

});

// -------------------------------------------------------------------------------------------------------------------------

// Bouton retour à l'accueil

var boutonMaison = document.querySelector(".maison");
boutonMaison.addEventListener("click", function () {

  // Afficher la page d'accueil
  document.querySelector("header").classList.remove("cache");
  

  // Masquer les pages
  var pages = document.querySelectorAll(".listeAnalogies div");
  pages.forEach(function (page) {
    page.classList.add("cache");
  });

  document.querySelector("#formulaire").classList.add("cache");

  // Cache la barre de navigation
  var Nav = document.querySelector("nav");
  Nav.classList.add("cache");
  Nav.classList.remove("visible");
  
  // Cache le bouton d'accueil
  document.querySelector(".maison").classList.add("cache");
  document.querySelector(".maison").classList.remove("visible");
  
});

// -------------------------------------------------------------------------------------------------------------------------

// Formulaire 

// Afficher le contenu du formulaire sur la page et récupérer les infos donné par l'utilisateur

function formulaire_ET_API() {
  var boutonFormulaire = document.querySelector("#boutonFormulaire");
  boutonFormulaire.addEventListener("click", function () {
    
    // Vérifie que les champs obligatoires sont remplis
    if (document.querySelector("#analogieFormulaire").value==='' || document.querySelector("#valAnalogieFormulaire").value===''){
    alert('Veuillez remplir les champs "Si j\'étais" et "Je serais".');
      return false;
    } 
    // Vérifie que le champs Image comporte bien une URL
    if (!document.querySelector("#imageFormulaire").value.includes('.') && document.querySelector("#imageFormulaire").value!=="") {
      alert('Veuillez remplir le champs image avec une URL (.png .jpg .gif ect...)');
      return false;
     }
    else {
      // Affichage des données entré dans le formulaire par l'utilisateurS
      document.querySelector("form").classList.add("formModifie")
      document.querySelector("footer div").innerHTML = '<div class="" id="partieUser"><section id=""> <h2>Si j’étais '
        + document.querySelector("#analogieFormulaire").value.toLowerCase() // Texte mis en minuscule
        + ' je serais '
        + document.querySelector("#valAnalogieFormulaire").value.toLowerCase() // Texte mis en minuscule
        + ' </h2> </section>'
        + '<br>'
        + '<section><p>'
        + document.querySelector("#explication").value
        + '<br>'
        + '</section> </p></div>';
        if (document.querySelector("#imageFormulaire").value !==""){
        // Affichage de l'image donné par l'utilisateur
        document.querySelector("footer div").innerHTML += '<img class="imageUser" src=' + document.querySelector("#imageFormulaire").value + ' alt=" image-Utilisateur">';
      }

      // Confirme à l'utilisateur la réussite de l'action souhaité 
      var reussite=document.querySelector(".reussitFormulaire")
      reussite.style.display="block";
      var delai=7000;

      setTimeout(function(){
        reussite.style.display='none';
      },delai);
      

    // Envoie des donnés automatique vers la base de donnés
    fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=emilie&courriel=philippe.gambette@u-pem.fr&message=Si j'étais " + document.querySelector("#analogieFormulaire").value + ", je serais " + document.querySelector("#valAnalogieFormulaire").value + " car " + document.querySelector("#explication").value + " " + document.querySelector("#imageFormulaire").value).then(function (response) {
      response.json().then(function (data) {
        console.log("Réponse reçue : ");
        console.log(data);
      });

    
    });
  };

  });
};

// -------------------------------------------------------------------------------------------------------------------------

// Pop-up Mentions légales

document.querySelector(".mentions").addEventListener("click", function () {
  // Affiche le contenu
  document.querySelector(".contenuMentions").classList.remove("cache");
});

document.querySelector(".boutonFermerMentions").addEventListener("click", function () {
  // Cache le contenu
  document.querySelector(".contenuMentions").classList.add("cache");
});



// -------------------------------------------------------------------------------------------------------------------------

// Pop-up En savoir +

document.querySelector(".info").addEventListener("click", function () {
  // Affiche le contenu
  document.querySelector(".contenuInfo").classList.remove("cache");
  // Cache les boutons
  document.querySelector(".info").classList.add("cache");
  document.querySelector("#decouvrir").classList.add("cache");
});

document.querySelector(".boutonFermerInfo").addEventListener("click", function () {
  // Cache le contenu
  document.querySelector(".contenuInfo").classList.add("cache");
  // Affiche les boutons
  document.querySelector(".info").classList.remove("cache");
  document.querySelector("#decouvrir").classList.remove("cache");
});








