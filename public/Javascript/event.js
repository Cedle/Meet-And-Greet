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
      // deleteMessages(snapshot3.key);
      // readMessages(snapshot3.key);
      location =
        {
          id: snapshot3.key,
          lat: snapshot3.val().eventPlace.lat,
          lng: snapshot3.val().eventPlace.lng,
          title: snapshot3.val().eventName,
          name: userName,
          desc : snapshot3.val().eventDescription,
          imgUrl: imgUrl,
          picture: "<img style='height:7vh; width: 7vh; object-fit: cover; border-radius: 50%;' src="+ imgUrl+">",
          time: snapshot3.val().eventDateTime,
          friends: snapshot3.val().eventFriends,
          host: snapshot3.val().eventHost
        }
      setEvent(location,"private");
      addMarker(location,imgUrl,0);
  });

  firebase.database().ref("events/public").on("child_added", async function (snapshot2) {  
    snapshot4 = snapshot2;
    var userName;
    var location;
    var imgUrl;
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friends/" + snapshot2.val().eventHost , function(usersData){
      data1 = usersData;
      userName = usersData.userName;
      imgUrl = usersData.imgUrl;
    })
    // deleteMessages(snapshot2.key);
    // readMessages(snapshot2.key);
    
    location = 
      {
        id: snapshot2.key,
        lat: snapshot2.val().eventPlace.lat,
        lng: snapshot2.val().eventPlace.lng,
        title: snapshot2.val().eventName,
        name: userName,
        desc : snapshot2.val().eventDescription,
        imgUrl: imgUrl,
        picture: "<div style='float:left'><img style='height:7vh; width: 7vh; object-fit: cover; border-radius: 50%;' src="+ imgUrl+"></div>",
        time: snapshot2.val().eventDateTime,
        friends: snapshot2.val().eventFriends,
        host: snapshot2.val().eventHost
      }

      setEvent(location,"public");
      addMarker(location,imgUrl,0); 
  });
  //Event auf Karte anzeigen nach buttondrücken im Home
  async function showEvent(location){
    location = JSON.parse(location);
    console.log("er kommt so weit");
    console.log(location['imgUrl']);
    document.getElementById("infopic").src = await location['imgUrl'];
    document.getElementById("infohead").textContent = location['title'];
    document.getElementById("infotime").textContent = location['time'];
    document.getElementById("infodesc").textContent = location['desc'];
    
    if(typeof deletebtn == "undefined"){
    deletebtn = document.createElement("button");
    }
    deletebtn.className = "infoDeleteEventButtonDesign";
    deletebtn.onclick = function() {deleteEvent(location['host'],location['id'])};
    document.getElementById("infoDeleteEventButton").appendChild(deletebtn);

    
    changeEvent();

  }
//Events löschen
function deleteEvent(eventhost,eventid){
  if(allData.uuid === eventhost){
      firebase.database().ref("events/private/"+allData.uuid).child(eventid).remove();
      firebase.database().ref("events/public").child(eventid).remove();
      
  }
}
firebase.database().ref("events/private/"+allData.uuid).on("child_removed", function(snapshot) {
  document.getElementById(snapshot.key).innerHTML = "this Event has been removed";
  document.getElementById(snapshot.key).onclick = "";
})

firebase.database().ref("events/public").on("child_removed", function(snapshot) {
  document.getElementById(snapshot.key).innerHTML = "this Event has been removed";
  document.getElementById(snapshot.key).onclick = "";
})