let map;
let allData;
let file = {};
let publicEvent = true;
let privateEvent = false;
let eventName = "HM treten Event";
let infowindow;
var myLat = [49.347958,50.347958,51.347958,52.347958];
var myLen = [9.13, 9.13, 9.13, 9.13];
var myEventCheck = [false,true,false,true];
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

let popup, Popup;

// function initMap() {
//   var infowindow		=	new google.maps.InfoWindow();
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 49.784523, lng: 9.921944 },
//     zoom: 10
//   });

//   // marker.addListener("click", () => {
//   //   infowindow.open(map, marker);
//   // });
//   google.maps.event.addListener(map, "click", (event) => {
//     addMarker(event.latLng, map);
//   });
  
//   for (var i = 0; i < myLat.length; i++) { 
//     myLatLng = { lat: myLat[i], lng: myLen[i]},
//     publicEvent = myEventCheck[i];
//     addMarker(myLatLng,publicEvent)
//   };
// }




// function addMarker(myLatLng,publicEvent){
  
//   var vImage = (publicEvent == false) ? "red-dot.png" : "blue-dot.png";
//   var image = "http://maps.google.com/mapfiles/ms/icons/" + vImage;
//   marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: "titel",
//     icon: image
//   });
//   google.maps.event.addListener(marker, 'click', (function(marker, i) {
// 		return function() {
// 			infowindow.setContent('<h3>' + "locations[i]"['city'] + '</h3>');
// 			infowindow.open(map, marker);
// 		}
// 	}));

// }
let snapshot2;

function initMap() {
		
	var myLatLng = {
		lat			:	52.520008,
		lng			:	13.404954
  };
	var mapOptions		=	{
		zoom			:	10,
		mapTypeControl	:	false,
		center			:	myLatLng,
	};
	
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	let vImage ="blue-dot.png";
  let image = "http://maps.google.com/mapfiles/ms/icons/" + vImage;
  let imageSelf = "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
  var locations		=	new Array();							
  navigator.geolocation.getCurrentPosition((position) =>{
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  
    map.setCenter(pos);
    marker = new google.maps.Marker({
      position	:	new google.maps.LatLng(pos),
      map	:	map,
      icon:	imageSelf,
    });
  })
	var locations		=	[
		{
			lat		: 	51.0504088, 
			lng		:	13.7372621,
			city	:	'Dresden',
      title :   'Nach der Party sieht der Club aus wie Dresden 45'
		},{
			lat		: 	53.5510846, 
			lng		: 	9.9936819,
			city	: 	'Hamburg',
      title :   'hallau es funktioniert'
		},{
			lat		: 	53.0792962, 
			lng		: 	8.8016936,
			city	: 	'Bremen',
      title :   'hallau es funktioniert'
		},{
			lat		: 	48.1351253, 
			lng		: 	11.5819805,
			city	: 	'München',
      title :   'hallau es funktioniert'
		},{
			lat		: 	58.487952, 
			lng		: 	19.863281,
			city	: 	'Ostsee',
      title :   'hallau es funktioniert'
		},{
			lat		: 	51.75, 
			lng		: 	10.633333,
      city	: 	'Harz',
      title :   'hallau es funktioniert'
		}
	];
	firebase.database().ref("events/test")
	infowindow		=	new google.maps.InfoWindow();
	
	for (i = 0; i < locations.length; i++) { 
		addMarker(locations[i],image)
	}
}
firebase.database().ref("events").on("child_added", function (snapshot2) {
  var location = 
    {
      lat: snapshot2.val().lat,
      lng: snapshot2.val().lng,
      city : 'test',
      title : snapshot2.val().titel
    }   
  
  addMarker(location,"http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
})

function addMarker(location,image){
  marker = new google.maps.Marker({
    position	:	new google.maps.LatLng(location['lat'], location['lng']),
    map			:	map,
    animation	:	google.maps.Animation.DROP,
    icon		:	image,
  });
  
  google.maps.event.addListener(marker, 'click', (function(marker) {
    return function() {
      infowindow.setContent('<h3>' + location['city'] + location['title'] + '</h3>');
      infowindow.open(map, marker);
    }
  })(marker));
}