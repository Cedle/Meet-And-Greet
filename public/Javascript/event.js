let snapshot4;

// Eventdaten aus "new" Tab holen
function newEvent(){
  var ename = document.getElementById("eventtitle").value;
  var edatetime = document.getElementById("eventtime").value;
  var edesc = document.getElementById("eventdesc").value;
  var eplace = postition;
  if(document.getElementById("private").checked){
    evisibility = "private";
  }else if(document.getElementById("public").checked){
    evisibility = "public";
  }
  // var evisibility = document.getElementById("eventtype").value;
  var efriends = "FILLER FOR DYNAMICALLY LOADED FRIENDS";
  writeNewEvent(ename, edesc, eplace, evisibility, efriends, edatetime);
}
// Eventdaten + uid in Datensatz "events" schreiben
function writeNewEvent(ename, edesc, eplace, evisibility, efriends, edatetime) {
  console.log("vor if");
  if(evisibility === "private"){
    firebase.database().ref('events/private/'+ allData.uid).push().set({
      eventHost: allData.uid,
      eventName: ename,
      eventDateTime: edatetime,
      eventDescription: edesc,
      eventPlace: eplace,
      eventVisibility: evisibility,
      eventFriends: efriends
      
    });
    console.log("true");
  }else if (evisibility === "public"){
    firebase.database().ref('events/public').push().set({
      eventHost: allData.uid,
      eventName: ename,
      eventDateTime: edatetime,
      eventDescription: edesc,
      eventPlace: eplace,
      eventVisibility: evisibility,
      eventFriends: efriends
    });
    console.log("false");
  }
  console.log("nichts");
}
// Eventdaten für Marker bekommen und eintragen

firebase.database().ref("events/private/"+ allData.uid).on("child_added", function (snapshot3) {
    snapshot4 = snapshot3
    var location
  
    location =
      {
        lat: snapshot3.val().eventPlace.lat,
        lng: snapshot3.val().eventPlace.lng,
        host: snapshot3.val().eventHost,
        //Bild einfügen? ich glaube nicht :-)
        title : snapshot3.val().eventDescription
      }
    addMarker(location,"http://maps.google.com/mapfiles/ms/icons/blue-dot.png",0);
    });
  // firebase.database().ref("events/public").on("child_added", function (snapshot) {  
  //   var location = []
  //   var i = 0;
  //   snapshot2.forEach((child) =>{
  //   location[i] = 
  //     {
  //       lat: snapshot2.val().eventPlace(0),
  //       lng: snapshot2.val().eventPlace(1),
  //       host: snapshot2.val().eventHost,
  //       //Bild einfügen? ich glaube nicht :-)
  //       title : snapshot2.val().eventDescription
  //     }
  //     addMarker(location[i],"http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
  //     i++
  //   });
  // })

