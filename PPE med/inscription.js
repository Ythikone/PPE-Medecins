$(document).ready(function() {
  
  $(document).on("click", "#ok", function() {
    $.ajax({
      method: "POST",
      url: "http://172.19.0.35/index.php?action=patient",
      data: JSON.stringify({nom: $('#nom').val(),prenom: $('#prenom').val(), rue: $('#rue').val(), cp: $('#cp').val(), ville: $('#ville').val(),  tel: $('#tel').val(), login: $('#login').val(), mdp: $('#mdp').val()
    })
    })
    .done(function(data, textStatus, jqXHR){
      alert("Réponse reçue avec succès !");
      console.log(data);
      console.log(textStatus);
      console.log(jqXHR);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert("Erreur survenue !");
      console.log(jqXHR); // Objet jqXHR (infos de la requête AJAX)
      console.log(textStatus); // Statut de la requête AJAX
      console.log(errorThrown); // = statusText (type de l’erreur)
      });
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