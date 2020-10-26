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
                html += "<div id = 'searchResultBar'>";
                html += "<div id ='searchFriendName'>"+element.name+"</div>";
                html += "<button class = 'searchFriendButton' onclick='addFriend("+'"'+ element.uuid +'"'+");'>";
                html += "Add Friend";
                html += "</button>";
                html += "</div>";
                html += "</li>";
            }
            console.log("html = "+ html);
            document.getElementById("friends_constainer").innerHTML = html;
        }
    });
    return false;
}
function addFriend(uuid){
    $.post("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendservice/addFriend/"+uuid,allData)
}
function acceptFriend(uuid,ownid,friendid){
    $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendservice/acceptFriend/"+uuid+"/"+friendid+"/"+ownid,allData);
}
function declineFriend(uuid,ownid,friendid){
    $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendservice/declineFriend/"+uuid+"/"+friendid+"/"+ownid,allData);
}

function deleteFriend(uuid,ownid,friendid){
    $.delete("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendservice/deleteFriend/"+uuid+"/"+friendid+"/"+ownid,allData);
}

firebase.database().ref("friends/"+allData.uuid+"/added").on("child_added", async function (snapshot) {
    var html ="";
    var friend;
    var uuid = snapshot.val().uuid;
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendsearch/friend/" + uuid ,async function(result){
        friend = await result;
        console.log("friend = "+ friend);
    })
    html += "<div class='addFriendBox' id ='added"+uuid+"'>";
    html += "<img id='img_friend' src='"+friend.imgUrl+"'></img>";
    html += "<div id='friendName'>" + friend.userName + "</div>";
    html += "<button id='btn_call' onclick='deleteFriend("+'"'+ uuid +'",'+'"'+snapshot.key+'",'+'"'+snapshot.val().key+'"'+");'>";
    html += "löschen";
    html += "</button>";
    html += "</div>";
    document.getElementById("currentFriends").innerHTML += html;
    html = "";
    html += "<input type='checkbox' class='friendbox' id='checkbox"+uuid+"' value='"+uuid+"'><div class='divfriendbox' id='div"+uuid+"'>"+friend.userName+"</div>";
    document.getElementById("checkboxes").innerHTML += html;
})

firebase.database().ref("friends/"+allData.uuid+"/requested").on("child_added", async function (snapshot) {
    var html ="";
    var friend;
    var uuid = snapshot.val().uuid;
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendsearch/friend/" + uuid ,async function(result){
        friend = await result;
        console.log("friend = "+ friend);
    })
    html += "<div class='addFriendBox' id='requested"+uuid+"'>"
    html += "<img id='img_friend' src='"+friend.imgUrl+"'></img>";
    html += "<div id='friendName'>" + friend.userName + "</div>";
    html += "</div>";
    document.getElementById("myInquiry").innerHTML += html;
})



firebase.database().ref("friends/"+allData.uuid+"/pending").on("child_added", async function (snapshot) {
    var html ="";
    var friend;
    var uuid = snapshot.val().uuid;
    await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/friendsearch/friend/" + uuid ,async function(result){
        friend = await result;
        console.log("friend = "+ friend);
    })
    html += "<div class='addFriendBox' id ='pending"+uuid+"'>"
    html += "<img id='img_friend' src='"+friend.imgUrl+"'></img>"
    html += "<div id='friendName'>" + friend.userName + "</div>";
    html += "<button id='btn_call' onclick='acceptFriend("+'"'+ uuid +'",'+'"'+snapshot.key+'",'+'"'+snapshot.val().key+'"'+");'>";
    html += "annehmen";
    html += "</button>";
    html += "<button id='btn_call' onclick='declineFriend("+'"'+ uuid +'",'+'"'+snapshot.key+'",'+'"'+snapshot.val().key+'"'+");'>";
    html += "ablehnen";
    html += "</button>";
    html += "</div>"
    document.getElementById("inquiry").innerHTML += html;
    
})
firebase.database().ref("friends/"+allData.uuid+"/pending").on("child_removed", async function (snapshot) {
    var uuid = snapshot.val().uuid;
    document.getElementById("pending"+uuid).outerHTML = "";
});
firebase.database().ref("friends/"+allData.uuid+"/requested").on("child_removed", async function (snapshot) {
    var uuid = snapshot.val().uuid;
    document.getElementById("requested"+uuid).outerHTML = "";
});
firebase.database().ref("friends/"+allData.uuid+"/added").on("child_removed", async function (snapshot) {
    var uuid = snapshot.val().uuid;
    document.getElementById("added"+uuid).outerHTML = "";
    document.getElementById("div"+uuid).outerHTML = "";
    document.getElementById("checkbox"+uuid).outerHTML = "";
});
