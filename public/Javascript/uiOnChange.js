function clearActive(){
    document.getElementById("nav_home").className = "";
    document.getElementById("nav_map").className = "";
    document.getElementById("nav_neu").className = "";
    document.getElementById("nav_chat").className = "";
    document.getElementById("nav_profil").className = "";
}
function changemap(){
    clearActive();
    document.getElementById("nav_map").className = "active";
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'inline-block'; 
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'none';
    
}
function changehome(){
    clearActive();
    document.getElementById("nav_home").className = "active";
    document.getElementById("home").style.display = 'inline-block';
    document.getElementById("map").style.display = 'none';
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'none';
  
}
function changeneu(){
    clearActive();
    document.getElementById("nav_neu").className = "active";
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'none';
    document.getElementById("neu").style.display = 'inline-block';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'none';
  
}
function changechat(){
    clearActive();
    document.getElementById("nav_chat").className = "active";
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'none';
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'inline-block';
    document.getElementById("profil").style.display = 'none';
  
}
async function changeprofil(){
    clearActive();
    document.getElementById("nav_profil").className = "active";
    try {
      await firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(async imgUrl =>{
        allData.imgUrl = imgUrl;
        document.getElementById("img").src = await imgUrl;
      })
      
      document.getElementById("home").style.display = 'none';
      document.getElementById("map").style.display = 'none';
      document.getElementById("neu").style.display = 'none';
      document.getElementById("chat").style.display = 'none';
      document.getElementById("profil").style.display = 'inline-block';
   }
   catch (e) {
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'none';
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'inline-block';
      
   }
  
}

