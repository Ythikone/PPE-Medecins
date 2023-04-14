$(document).ready(function() {
  
  $(document).on("click", ".delete-button", function(event) {
    let rdvId = event.target.getAttribute("data-id");
    
    $.ajax({
      method: "DELETE",
      url: "http://172.19.0.35/index.php?action=rdv",
      data: JSON.stringify({id: rdvId}),
      success: function(response) {
        let row = event.target.parentNode.parentNode;
        row.parentNode.removeChild(row);
      },
      error: function(xhr, status, error) {
        console.log("Erreur : " + error);
      }
    });
  });

  $(document).on("click", ".modify-button", function(event) {
    const rdvId = event.target.getAttribute("data-id");
    
    const nouvelleDateHeure = document.querySelector(`#rdv-row-${rdvId} input[type="datetime-local"]`).value;

   $.ajax({
      method: "PUT",
      url: "http://172.19.0.35/index.php?action=rdv",
      data: JSON.stringify({id: rdvId, date: nouvelleDateHeure.replace("T", " ")}),
      success: function(response) {
        location.reload();
      },
      error: function(xhr, status, error) {
        console.log("Erreur : " + error);
      }
    });
});


  var letoken = getCookie("token");
  console.log(letoken);
  $.ajax({
    method: "GET",
    url: "http://172.19.0.35/index.php?action=rdv&token=" + letoken,
    data: JSON.stringify({token: letoken})
  })
  .done(function(data){
    var i =0;
    data.forEach(function(affichage) {
      $('#affichage').append(
        '<tr class="rdv-row" id="rdv-row-'+ affichage.idRdv +'">' +
        '<td><input id="'+ i +'" type ="text" disabled="disabled" value="' + affichage.idMedecin + 
        '"></td>' +
        '<td><input id="rdv'+ affichage.idRdv +'"type ="datetime-local" value="' + affichage.dateHeureRdv + 
        '"></td>' +
        '<td><button class="btn btn-lg btn-primary modify-button" type="button" data-id="'+ affichage.idRdv +'" value ="'+ affichage.idRdv +'">modifier</td>' +
        '<td><button class="btn btn-lg btn-primary delete-button" data-id="'+ affichage.idRdv +'" type="button" value="'+ affichage.idRdv +'">supprimer</td>' +
        '</tr>'
      );

      // const datetimeInput = document.querySelector(affichage.idRdv);

      // // Définit la fonction pour arrondir une date à un multiple de 15 minutes
      // function roundToNearest15Minutes(date) {
      //   const offsetInMs = date.getTimezoneOffset() * 60 * 1000;
      //   const coeff = 1000 * 60 * 15; // nombre de millisecondes dans 15 minutes
      //   return new Date(Math.round((date.getTime() - offsetInMs) / coeff) * coeff);
      // }

      // // Événement déclenché lorsque l'utilisateur modifie la valeur du champ datetime-local
      // datetimeInput.addEventListener('input', () => {
      //   const inputDate = new Date(datetimeInput.value);
      //   const roundedDate = roundToNearest15Minutes(inputDate);
      //   const roundedDateString = roundedDate.toISOString().slice(0, 16);
      //   datetimeInput.value = roundedDateString;
      // });
      i +=1;
    })
  
    $.ajax({
      method: "GET", 
      url:"medecins-generalistes-et-infirmiers.json"
    })
    .done(function(data2) {
      for(var i = 0; i < data2.length; i++) {
        let nomMedecin = document.getElementById(i);
        for (var j = 0; j < data2.length; j++) {
          if (data2[j].recordid == nomMedecin.value) {
            nomMedecin.value = data2[j].fields.nom;
          }
        }
      }
      console.log(data2);
      
    });
    console.log(data);
    
    
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    alert("Erreur survenue !");
    console.log(jqXHR); // Objet jqXHR (infos de la requête AJAX)
    console.log(textStatus); // Statut de la requête AJAX
    console.log(errorThrown); // = statusText (type de l’erreur)
     });
     function getCookie() {
      var letoken = document.cookie.split("=");
      letoken = letoken[1];
      return letoken;
    }
    var token = getCookie("token");
    console.log(token);
    if(token){
      document.getElementById("connexion").style.display = "none";
      document.getElementById("inscription").style.display = "none";
    }
    else{
      document.getElementById("profil").style.display = "none";
      document.getElementById("connexion").style.display = "block";
      document.getElementById("inscription").style.display = "";
    };
})