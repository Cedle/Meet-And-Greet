let snapshot4;
let data1;
let uuid2 = allData.uuid;
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
    firebase.database().ref('events/private/'+ allData.uuid).push().set({
      eventHost: allData.uuid,
      eventName: ename,
      eventDateTime: edatetime,
      eventDescription: edesc,
      eventPlace: eplace,
      eventFriends: efriends
    });
    console.log("true");
  }else if (evisibility === "public"){
    firebase.database().ref('events/public').push().set({
      eventHost: allData.uuid,
      eventName: ename,
      eventDateTime: edatetime,
      eventDescription: edesc,
      eventPlace: eplace,
      eventFriends: efriends
    });
    console.log("false");
  }
  console.log("nichts");
}
// Eventdaten für Marker bekommen und eintragen

  
  firebase.database().ref("events/private/"+ allData.uuid).on("child_added", async function (snapshot3) {
      
      var userName;
      var location;
      var imgUrl;
      await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friends/" + snapshot3.val().eventHost , function(usersData){
        data1 = usersData;
        userName = usersData.userName;
        imgUrl = usersData.imgUrl;
      })

      location =
        {
          lat: snapshot3.val().eventPlace.lat,
          lng: snapshot3.val().eventPlace.lng,
          title: snapshot3.val().eventName,
          name: userName,
          desc : snapshot3.val().eventDescription,
          imgUrl: imgUrl,
          picture: "<div style='float:left'><img style='height:7vh; width: 7vh; object-fit: cover; border-radius: 50%;' src="+ imgUrl+"></div>"
        }
      setEvent(location,"private");
      addMarker(location,imgUrl,0);
  });

  firebase.database().ref("events/public").on("child_added", async function (snapshot2) {  
    snapshot4 = snapshot2
    var userName;
    var location;
    var imgUrl;
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friends/" + snapshot2.val().eventHost , function(usersData){
      data1 = usersData;
      userName = usersData.userName;
      imgUrl = usersData.imgUrl;
    })
    
    location = 
      {
        lat: snapshot2.val().eventPlace.lat,
        lng: snapshot2.val().eventPlace.lng,
        title: snapshot2.val().eventName,
        name: userName,
        desc : snapshot2.val().eventDescription,
        imgUrl: imgUrl,
        picture: "<div style='float:left'><img style='height:7vh; width: 7vh; object-fit: cover; border-radius: 50%;' src="+ imgUrl+"></div>"
      }

      setEvent(location,"public");
      addMarker(location,imgUrl,0); 
  });

