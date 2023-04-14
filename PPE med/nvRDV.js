$(document).ready(function() {

    // Récupère l'élément datetime-local
  const datetimeInput = document.querySelector('#heureDate');

  // Définit la fonction pour arrondir une date à un multiple de 15 minutes
  function roundToNearest15Minutes(date) {
    const offsetInMs = date.getTimezoneOffset() * 60 * 1000;
    const coeff = 1000 * 60 * 15; // nombre de millisecondes dans 15 minutes
    return new Date(Math.round((date.getTime() - offsetInMs) / coeff) * coeff);
  }

  // Événement déclenché lorsque l'utilisateur modifie la valeur du champ datetime-local
  datetimeInput.addEventListener('input', () => {
    const inputDate = new Date(datetimeInput.value);
    const roundedDate = roundToNearest15Minutes(inputDate);
    const roundedDateString = roundedDate.toISOString().slice(0, 16);
    datetimeInput.value = roundedDateString;
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
    window.location.href = "http://172.19.0.36/connexion.html";
  }
    $(document).on("click", "#ok", function() {
      function getCookie() {
        var letoken = document.cookie.split("=");
        letoken = letoken[1];
        return letoken;
      }
      let dateHeureNaze = document.getElementById("heureDate");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id')
      $.ajax({
        method: "POST",
        url: "http://172.19.0.35/index.php?action=rdv",
        data: JSON.stringify({date: $('#heureDate').val().replace("T", " "),token: getCookie(),idMedecin: id
      })
      })
      .done(function(data, textStatus, jqXHR){
        alert("Réponse reçue avec succès !");
        console.log(data);
        console.log(token);
        console.log(textStatus);
        console.log(jqXHR);
        
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("Erreur survenue !");
        console.log(dateHeureNaze.value);
        console.log(jqXHR); // Objet jqXHR (infos de la requête AJAX)
        console.log(textStatus); // Statut de la requête AJAX
        console.log(errorThrown); // = statusText (type de l’erreur)
        });
    });
  })