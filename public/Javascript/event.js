let snapshot6;
let data1;
let uuid2 = allData.uuid;
let snapshot5;
// Eventdaten aus "new" Tab holen
function newEvent(){
  var ename = document.getElementById("eventtitle").value;
  var edatetime = document.getElementById("eventtime").value;
  var edesc = document.getElementById("eventdesc").value;
  var eplace = postition;

  var e = document.getElementById("inputGroupSelect01");
  var strUser = e.value;
  if(strUser == "private"){
    evisibility = "private";
  }else{
    evisibility = "public";
  }
  // var evisibility = document.getElementById("eventtype").value;
  var values = [];
  $("input[type=checkbox]:checked").each(function() {
    values.push($(this).val());
  });
  console.log(values);
  
  
  var efriends = [];
  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    efriends.push({uuid: element});
  }
  var alert = "";
  if(evisibility == "private"){
    if(efriends[0].uuid == ""){
      alert += "bitte wähle freunde aus um fortzufahren.\r\n";
    }
  }if(ename == "" || ename == null){
    alert += "bitte gebe deinem coolen Event einen sicken Namen.\r\n";
  }if(edesc == "" || edesc == null){
    alert += "bitte wähle eine passende Eventbeschreibeung aus.\r\n";
  }if(eplace == null){
    alert += "kein Ort ausgewählt!\r\n";
  }
  if(alert != ""){
    window.alert(alert);
  }else{
    writeNewEvent(ename, edesc, eplace, evisibility, efriends, edatetime);
    changeHome();
    document.getElementById("eventtitle").value = "";
    document.getElementById("eventdesc").value = "";
  }
}

// Eventdaten + uid in Datensatz "events" schreiben

async function writeNewEvent(ename, edesc, eplace, evisibility, efriends, edatetime) {
  console.log("vor if");
  if(evisibility === "private"){
    let eventKey;
    var data= {
      eventHost: allData.uuid,
      eventName: ename,
      eventDateTime: edatetime,
      eventDescription: edesc,
      eventPlace: eplace,
      evisibility: "private"
    };

    await $.post("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/eventservice/newEvent",data,function(key){
      eventKey = key;
    });
    console.log(efriends);
    for (let i = 0; i < efriends.length; i++) {
      const element = efriends[i];
      $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/eventservice/"+allData.uuid+"/"+eventKey,element,function(){
    });
    }
   
    console.log("true");
  }else if (evisibility === "public"){
    var data = 
    {
      eventHost: allData.uuid,
      eventName: ename,
      eventDateTime: edatetime,
      eventDescription: edesc,
      eventPlace: eplace,
      evisibility: "public"
    }
    await $.post("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/eventservice/newEvent",data,function(){
      
    });
    console.log("false");
  }
  console.log("nichts");
}




// Eventdaten für Marker bekommen und eintragen
  
  firebase.database().ref("events/management/"+ allData.uuid+"/added").on("child_added", async function (snapshot4) {
      var userName;
      var location;
      var imgUrl;
      await firebase.database().ref("events/private/"+snapshot4.val().path).once("value", async function(snapshot3){

        await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendsearch/friend/" + snapshot3.val().eventHost , function(usersData){
          data1 = usersData;
          userName = usersData.userName;
          imgUrl = usersData.imgUrl;
        })
        // deleteMessages(snapshot3.key);
        // readMessages(snapshot3.key);
        location =
          {
            evisibility: "private",
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
        addMarker(location,imgUrl,0,1);
      })
  });
  
  firebase.database().ref("events/private/"+allData.uuid).on("child_added",async function(snapshot3){
      var userName;
      var location;
      var imgUrl;
      
        await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendsearch/friend/" + snapshot3.val().eventHost , function(usersData){
          data1 = usersData;
          userName = usersData.userName;
          imgUrl = usersData.imgUrl;
        })
        // deleteMessages(snapshot3.key);
        // readMessages(snapshot3.key);
        location =
          {
            evisibility: "private",
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
        addMarker(location,imgUrl,0,1);
  })

   
  
 
  firebase.database().ref("events/public").on("child_added", async function (snapshot2) {  
    var userName;
    var location;
    var imgUrl;
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendsearch/friend/" + snapshot2.val().eventHost , function(usersData){
      data1 = usersData;
      userName = usersData.userName;
      imgUrl = usersData.imgUrl;
    })
    // deleteMessages(snapshot2.key);
    // readMessages(snapshot2.key);
    
    location = 
      {
        evisibility: "public",
        id: snapshot2.key,
        lat: snapshot2.val().eventPlace.lat,
        lng: snapshot2.val().eventPlace.lng,
        title: snapshot2.val().eventName,
        name: userName,
        desc : snapshot2.val().eventDescription,
        imgUrl: imgUrl,
        picture: "<div><img style='height:7vh; width: 7vh; object-fit: cover; border-radius: 50%;' src="+ imgUrl+"></div>",
        time: snapshot2.val().eventDateTime,
        friends: snapshot2.val().eventFriends,
        host: snapshot2.val().eventHost
      }

      if(allData.uuid == location.host){
        setEvent(location,"public");
      }
      addMarker(location,imgUrl,0,0); 
  });
  firebase.database().ref("events/management/joinedPublic/"+allData.uuid+"/added").on("child_added", async function (snapshot3) {  
    var userName;
    var location;
    var imgUrl;
    snapshot5 = snapshot3;
    firebase.database().ref("events/public/"+snapshot3.val().path).once("value", async function (snapshot2){
      snapshot6 = snapshot2;
      await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendsearch/friend/" + snapshot2.val().eventHost , function(usersData){
        data1 = usersData;
        userName = usersData.userName;
        imgUrl = usersData.imgUrl;
      })
      // deleteMessages(snapshot2.key);
      // readMessages(snapshot2.key);
      
      location = 
        {
          evisibility: "public",
          id: snapshot2.key,
          lat: snapshot2.val().eventPlace.lat,
          lng: snapshot2.val().eventPlace.lng,
          title: snapshot2.val().eventName,
          name: userName,
          desc : snapshot2.val().eventDescription,
          imgUrl: imgUrl,
          picture: "<div><img style='height:7vh; width: 7vh; object-fit: cover; border-radius: 50%;' src="+ imgUrl+"></div>",
          time: snapshot2.val().eventDateTime,
          friends: snapshot2.val().eventFriends,
          host: snapshot2.val().eventHost
        }
    setEvent(location,"public");

    })
  })
  //Event auf Karte anzeigen nach buttondrücken im Home
  async function showEvent(location){
    location = JSON.parse(location);
    console.log("er kommt so weit");
    console.log(location['imgUrl']);
    document.getElementById("infopic").src = await location['imgUrl'];
    document.getElementById("infohead").textContent = location['title'];
    document.getElementById("infotime").textContent = location['time'];
    document.getElementById("infodesc").textContent = location['desc'];
    document.getElementById("infomanager").textContent = location['name'];
    
    if(typeof deletebtn == "undefined"){
    deletebtn = document.createElement("button");
    }
    if(location.host == allData.uuid){
      deletebtn.className = "infoDeleteEventButtonDesign";
      deletebtn.onclick = function() {deleteEvent(location['host'],location['id'],location['evisibility'])};
      document.getElementById("infoDeleteEventButton").appendChild(deletebtn);
    }
    
    changeEvent();

  }
//Events löschen
async function deleteEvent(eventhost,eventid,evisibility){
  if(allData.uuid === eventhost){
    if(evisibility === "private"){
      var data =
      {
        visibility: evisibility,
        host: eventhost
      }
      $.delete("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/eventservice/deleteEvent/"+eventid,data,function(){

      })
    }else{
      var data =
      {
        visibility: evisibility,
        host: eventhost
      }
      $.delete("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/eventservice/deleteEvent/"+eventid,data,function(){

      })
    }
  }
}

function joinEvent(uuid, eid){

  data = {
    uuid: uuid,
    eid : eid
  }
  $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/eventservice/joinEvent",data);
}

function leaveEvent(uuid, eid){
  var data =
  {
    uuid:allData.uuid,
    host:uuid,
    eid:eid
  }
  $.delete("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/eventservice/leaveEvent",data,function(){

  })
}

firebase.database().ref("events/private/"+allData.uuid).on("child_removed", function(snapshot) {
  
  document.getElementById(allData.uuid+"/"+snapshot.key).innerHTML = "this Event has been removed";
  document.getElementById(allData.uuid+"/"+snapshot.key).onclick = "";
  document.getElementById("marker"+allData.uuid+"/"+snapshot.key).outerHTML = "";
})

firebase.database().ref("events/public").on("child_removed", function(snapshot) {
  if(snapshot.val().eventHost == allData.uuid){
    document.getElementById(snapshot.key).innerHTML = "this Event has been removed";
    document.getElementById(snapshot.key).onclick = "";
  }
  document.getElementById("marker"+snapshot.key).outerHTML = "";
})
firebase.database().ref("events/management/joinedPublic/"+allData.uuid+"/added").on("child_removed", function(snapshot) {
  document.getElementById(snapshot.val().path).innerHTML = "this Event has been removed";
  document.getElementById(snapshot.val().path).onclick = "";
    
})
firebase.database().ref("events/management/"+allData.uuid+"/added").on("child_removed", function(snapshot) {
  document.getElementById(snapshot.val().path).innerHTML = "this Event has been removed";
    document.getElementById(snapshot.val().path).onclick = "";
    document.getElementById("marker"+snapshot.val().path).outerHTML = "";
})