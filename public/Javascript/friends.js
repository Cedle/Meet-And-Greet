let test;
function searchFriends(){

    var name = document.getElementById("name").value;
    var searchResult;
    $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendsearch/" + name ,function(result){
        test = result;
        console.log(result);
        var html = "";
        for (let i = 1; i < result["results"].length; i++) {
            const element = result["results"][i];
            if(element.uuid !== "placeholder"){
                html += "<li id='friend-" + element.uuid + "'>";
                html += element.name;
                html += "<button onclick='addFriend("+'"'+ element.uuid +'"'+");'>";
                html += "Add Friends";
                html += "</button>";
                html += "</li>";
            }
            console.log("html = "+ html);
            document.getElementById("friends_constainer").innerHTML = html;
        }
    });
    return false;
}
function addFriend(uuid){
    firebase.database().ref("friends/"+allData.uuid+"/requested").push().set({
        "uuid": uuid,
        "accepted": false
    })
    firebase.database().ref("friends/"+uuid+"/pending").push().set({
        "uuid": allData.uuid
    })
}
function acceptFriend(uuid,ownid,friendid){
    firebase.database().ref("friends/"+allData.uuid+"/pending").child(ownid).remove();

    firebase.database().ref("friends/"+uuid+"/requested/"+friendid).set({
        "uuid": allData.uuid,
        "accepted": true
    });
    firebase.database().ref("friends/"+allData.uuid+"/added").push().set({
        "uuid": uuid
    })
}
function declineFriend(uuid,ownid,friendid){
    firebase.database().ref("friends/"+allData.uuid+"/pending").child(ownid).remove();

    firebase.database().ref("friends/"+uuid+"/requested").child(friendid).remove();
}

function deleteFriend(uuid,ownid){
    firebase.database().ref("friends/"+allData.uuid+"/added").child(ownid).remove();

    firebase.database().ref("friends/"+uuid+"/deleted").push().set({
        "uuid": allData.uuid
    })
}

firebase.database().ref("friends/"+allData.uuid+"/added").on("child_added", async function (snapshot) {
    var html = "";
    var friend;
    console.log(snapshot);
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friends/" + snapshot.val().uuid ,async function(result){
        friend = await result;
        console.log("friend = "+ friend);
    })
    html += "<label for='"+snapshot.val().uuid+"'>"
    html += "<input type='checkbox' id='"+snapshot.val().uuid+"' />" + friend.userName + "</label>";
    document.getElementById("checkboxes").innerHTML += html;
    console.log(html);
})

firebase.database().ref("friends/"+allData.uuid+"/requested").on("child_added", async function (snapshot) {
    var html ="";
    var friend;
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friends/" + snapshot.val().uuid ,async function(result){
        friend = await result;
        console.log("friend = "+ friend);
    })
    html += "<label for='"+snapshot.val().uuid+"'>"
    html += "<input type='checkbox' id='"+snapshot.val().uuid+"' />" + friend.userName + "</label>";
    document.getElementById("friendrequests").innerHTML += html;
    console.log(html);
})



firebase.database().ref("friends/"+allData.uuid+"/pending").on("child_added", async function (snapshot) {
    var html ="";
    var friend;
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friends/" + snapshot.val().uuid ,async function(result){
        friend = await result;
        console.log("friend = "+ friend);
    })
    html += "<label for='"+snapshot.val().uuid+"'>"
    html += "<input type='checkbox' id='"+snapshot.val().uuid+"' />" + friend.userName + "</label>";
    document.getElementById("friendpending").innerHTML += html;
    console.log(html);
})



