// Eventdaten bekommen und eintragen
/*
  firebase.database().ref("events/private/"+ allData.uid).on("child_added", function (snapshot5) {
      
      var location
    
      location =
        {
          lat: snapshot5.val().eventPlace.lat,
          lng: snapshot5.val().eventPlace.lng,
          title: snapshot5.val().eventName,
          //Bild einfügen? ich glaube nicht :-)
          name: snapshot5.val().eventHost,
          desc : snapshot5.val().eventDescription
        }
      setEvent(location);
  });
  */
  firebase.database().ref("events/public").on("child_added", function (snapshot6) {  
    snapshot4 = snapshot6
    var location
    
    location = 
      {
        lat: snapshot6.val().eventPlace.lat,
        lng: snapshot6.val().eventPlace.lng,
        title: snapshot6.val().eventName,
        name: snapshot6.val().eventHost,
        desc : snapshot6.val().eventDescription,
        picture: "<div style='float:left'><img src='http://i.stack.imgur.com/g672i.png'></div>"
      }
      setEvent(location);
  });


function setEvent(location){

  let btn= document.createElement("button");

  let content0 = btn.setAttribute("src",location['picture']);
  let content1 = document.createTextNode(location['title']);
  let content2 = document.createTextNode(location['name']);
  let content3 = document.createTextNode(location['desc']);
  
  
  btn.className = "Eventlistprivatedesign";
  // content.setAttribute("value",location['title']+"<br>"+location['name']+"<br>"+location['desc']);
  btn.appendChild(picture);
  var br = document.createElement("br");
  btn.appendChild(br);
  btn.appendChild(content1);
  var br = document.createElement("br");
  btn.appendChild(br);
  btn.appendChild(content2);
  var br = document.createElement("br");
  btn.appendChild(br);
  btn.appendChild(content3);
  document.getElementById("Eventlistprivate").appendChild(btn);
}

