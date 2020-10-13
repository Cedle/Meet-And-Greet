let map;
let allData;
let file = {};
let publicEvent = true;
let eventName = "HM treten Event";
let myLatLng={lat: 49.347958, lng: 9.133854};

firebase.auth().onAuthStateChanged(function(user){
  if (user) {
    let check = 0;
    let dbEmail;
    data={
      "userName" : user.displayName,
      "email" : user.email,
      "bio" : "",
      "uid" : user.uid
    }
    $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/" + user.uid , function(usersData){
       console.log("1."+ usersData)
      
      // usersData.forEach(element => {
      //   email = element.email;
        
      if(usersData.uid === data.uid){
          console.log("kein neuer Eintrag");
          allData = usersData;
      }else{
        $.post("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user",data,function(data,status){
          console.log(`${data} and status is ${status}`)
          $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/" + user.uid , function(usersData){
            console.log("2."+ usersData)
            allData = usersData;
          });
        });
      }
      // });
    });
  }
});



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 49.784523, lng: 9.921944 },
    zoom: 10,
  });
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200,
  });
/*  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "18.00 Uhr H&M ohne treten",
  });*/
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
  addMarker(myLatLng, eventName, publicEvent);
}

function addMarker(myLatLng, eventName, publicEvent){
  var vImage = (publicEvent == false) ? "red-dot.png" : "blue-dot.png";
  var image = "http://maps.google.com/mapfiles/ms/icons/" + vImage;
  new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: eventName,
    icon: Image
  });
  map.setCenter(myLatLng);
  markers.push(marker);
  
}
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
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("map").style.visibility = 'visible'; 
  document.getElementById("neu").style.visibility = 'hidden';
  document.getElementById("chat").style.visibility = 'hidden';
  document.getElementById("profil").style.visibility = 'hidden';
  
}
function changehome(){
  clearActive();
  document.getElementById("nav_home").className = "active";
  document.getElementById("home").style.visibility = 'visible';
  document.getElementById("map").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'hidden';
  document.getElementById("chat").style.visibility = 'hidden';
  document.getElementById("profil").style.visibility = 'hidden';

}
function changeneu(){
  clearActive();
  document.getElementById("nav_neu").className = "active";
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("map").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'visible';
  document.getElementById("chat").style.visibility = 'hidden';
  document.getElementById("profil").style.visibility = 'hidden';

}
function changechat(){
  clearActive();
  document.getElementById("nav_chat").className = "active";
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("map").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'hidden';
  document.getElementById("chat").style.visibility = 'visible';
  document.getElementById("profil").style.visibility = 'hidden';

}
async function changeprofil(){
  clearActive();
  document.getElementById("nav_profil").className = "active";
  try {
    await firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(async imgUrl =>{
      document.getElementById("img").src = await imgUrl;
    })
    
    document.getElementById("home").style.visibility = 'hidden';
    document.getElementById("map").style.visibility = 'hidden';
    document.getElementById("neu").style.visibility = 'hidden';
    document.getElementById("chat").style.visibility = 'hidden';
    document.getElementById("profil").style.visibility = 'visible';
 }
 catch (e) {
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("map").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'hidden';
  document.getElementById("chat").style.visibility = 'hidden';
  document.getElementById("profil").style.visibility = 'visible';
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    
 }

}




function updateProfil(){
  document.getElementById("name").textContent = allData.userName;
  document.getElementById("bio").textContent = allData.bio;
}


function changeUserInfo(){
  changedData= {
    "userName": document.getElementById("name").value,
    "bio": document.getElementById("bio").value
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
    console.log("vielleicht geht s ja");
  });
}



async function chooseFile(e){
  file = await e.target.files[0];
  await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
    console.log("succesfully uploaded")
  }).catch(error => {
    console.log(error.message);
  })
  firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
    document.getElementById("img").src = imgUrl;
  })
}
function sendMessage(){
  var message = document.getElementById("message").value;

  firebase.database().ref("messages").push().set({
    "sender": allData.userName,
    "message": message,
    "uid": allData.uid
  });
  document.getElementById("message").value = "";
  return false;
}
firebase.database().ref("messages").on("child_added", function (snapshot) {
  var html = "";
  html += "<li id='message-" + snapshot.key + "'>";
    if (snapshot.val().uid == allData.uid) {
      html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
        html += "Delete";
      html += "</button>";
    }
    html += snapshot.val().sender + ": " + snapshot.val().message;
  html += "</li>";

  document.getElementById("messages").innerHTML += html;
})

function deleteMessage(self){
  var messageId = self.getAttribute("data-id");

  firebase.database().ref("messages").child(messageId).remove();
}

firebase.database().ref("messages").on("child_removed", function(snapshot) {
  document.getElementById("message-" + snapshot.key).innerHTML = "this message has been removed"
})