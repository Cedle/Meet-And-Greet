

function sendMessage(id){
    // id = self.getAttribute("data-id");
    // console.log("id =" + id);
    var message = document.getElementById("message").value;
    // console.log("message = "+ message);
    firebase.database().ref("messages/"+id).push().set({
      "sender": allData.userName,
      "message": message,
      "uuid": allData.uuid
    });
    // console.log("message = "+ message);
    document.getElementById("message").value = "";
    return false;
  }
  function deleteMessage(self){
    var messageId = self.getAttribute("data-id");
    var eventId = self.getAttribute("event-id");
    firebase.database().ref("messages/" + eventId).child(messageId).remove();
  }
  
function readMessages(id){  

return new firebase.database().ref("messages/"+id).on("child_added", function (snapshot) {
    console.log("write");
    var html = "";
    html += "<li id='message-" + id + snapshot.key + "'>";
      if (snapshot.val().uuid == allData.uuid) {
        html += "<button event-id='" + id + "'  data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
          html += "Delete";
        html += "</button>";
      }
      html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</li>";
  
    document.getElementById("messages-"+id).innerHTML += html;
  }) 
}
function deleteMessages(id){
return new firebase.database().ref("messages/"+id).on("child_removed", function(snapshot) {
    document.getElementById("message-"+ id + snapshot.key).innerHTML = "this message has been removed"
  })
}