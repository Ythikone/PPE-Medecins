$(document).ready(function() {
    
    $(document).on("click", "#ok", function() {
        /*function getCookie() {
        var letoken = document.cookie.split("=");
        letoken = letoken[1];
        return letoken;
        }
        var token = getCookie("token");
        console.log(token);
        if(token){
            document.cookie = token + '=; expires= Thu, 01-Jan-1970 00:00:01 GMT;';
        document.getElementById("connexion").style.display = "none";
        document.getElementById("inscription").style.display = "none";
        }
        else{
        console.log("oui");
        document.getElementById("connexion").style.display = "block";
        document.getElementById("inscription").style.display = "";
        }*/

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "connexion.html";
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