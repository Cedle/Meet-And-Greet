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
  