
function changeEvent(){
    document.getElementById("eventinfoview").style.display = 'inline-block';
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'none'; 
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'none';
    document.getElementById("friends").style.display = 'none';
}
function changechat(){
    document.getElementById("eventinfoview").style.display = 'none';
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'none'; 
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'inline-block';
    document.getElementById("profil").style.display = 'none';
    document.getElementById("friends").style.display = 'none';
    document.getElementById("eventChatHead").value ="";
}

function changeMap(){
    $(document).ready(function(){
        $(".active").removeClass("active");
        $("#nav_map").addClass("active");
     });
    
    document.getElementById("eventinfoview").style.display = 'none';
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'inline-block'; 
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'none';
    document.getElementById("friends").style.display = 'none';
    
}
function changeHome(){
   
    $(document).ready(function(){
        $(".active").removeClass("active");
        $("#nav_home").addClass("active");
     });
    
    document.getElementById("eventinfoview").style.display = 'none';
    document.getElementById("home").style.display = 'inline-block';
    document.getElementById("map").style.display = 'none';
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'none';
    document.getElementById("friends").style.display = 'none';
  
}
function changeNeu(){
    // clearActive();
    $(document).ready(function(){
        $(".active").removeClass("active");
        $("#nav_neu").addClass("active");
     });
    // document.getElementById("nav_neu").style.color = "$navbar-dark-active-color";
    document.getElementById("eventinfoview").style.display = 'none';
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'none';
    document.getElementById("neu").style.display = 'inline-block';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'none';
    document.getElementById("friends").style.display = 'none';
  
}
function changeFriends(){
    // clearActive();
    $(document).ready(function(){
        $(".active").removeClass("active");
        $("#nav_friends").addClass("active");
     });
    // document.getElementById("nav_chat").style.color = "$navbar-dark-active-color";
    document.getElementById("eventinfoview").style.display = 'none';
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'none';
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("friends").style.display = 'inline-block';
    document.getElementById("profil").style.display = 'none';
}

// function changeChat(){
//     // clearActive();
//     $(document).ready(function(){
//         $(".active").removeClass("active");
//         $("#nav_chat").addClass("active");
//      });
//     // document.getElementById("nav_chat").style.color = "$navbar-dark-active-color";
//     document.getElementById("eventinfoview").style.display = 'none';
//     document.getElementById("home").style.display = 'none';
//     document.getElementById("map").style.display = 'none';
//     document.getElementById("neu").style.display = 'none';
//     document.getElementById("chat").style.display = 'inline-block';
//     document.getElementById("profil").style.display = 'none';
//     document.getElementById("friends").style.display = 'none';
// }
async function changeProfil(){
    updateProfil();
    // clearActive();
    $(document).ready(function(){
        $(".active").removeClass("active");
        $("#nav_profil").addClass("active");
     });
    // document.getElementById("nav_profil").style.color = "$navbar-dark-active-color";
    try {
      await firebase.storage().ref("users/" + allData.uuid + "/profile.jpg").getDownloadURL().then(async imgUrl =>{
        allData.imgUrl = imgUrl;
        document.getElementById("img").src = await imgUrl;
      })
      document.getElementById("eventinfoview").style.display = 'none';
      document.getElementById("home").style.display = 'none';
      document.getElementById("map").style.display = 'none';
      document.getElementById("neu").style.display = 'none';
      document.getElementById("chat").style.display = 'none';
      document.getElementById("profil").style.display = 'inline-block';
      document.getElementById("friends").style.display = 'none';
   }
   catch (e) {
    document.getElementById("eventinfoview").style.display = 'none';
    document.getElementById("home").style.display = 'none';
    document.getElementById("map").style.display = 'none';
    document.getElementById("neu").style.display = 'none';
    document.getElementById("chat").style.display = 'none';
    document.getElementById("profil").style.display = 'inline-block';
    document.getElementById("friends").style.display = 'none';
      
   }
  
}

