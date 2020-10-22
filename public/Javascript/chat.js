

async function sendMessage(){
    // id = self.getAttribute("data-id");
    // console.log("id =" + id);
    var message = document.getElementById("message").value;
    // console.log("message = "+ message);
    await firebase.database().ref("messages").push().set({
      "sender": allData.userName,
      "message": message,
      "uuid": allData.uuid
    });
    // console.log("message = "+ message);
    document.getElementById("message").value = "";
  }
  function deleteMessage(self){
    var messageId = self.getAttribute("data-id");
  
    firebase.database().ref("messages").child(messageId).remove();
  }
  
// function readMessages(id){  

firebase.database().ref("messages").on("child_added", function (snapshot) {
    console.log("write");
    var html = "";
    html += "<li id='message-" + snapshot.key + "'>";
      if (snapshot.val().uuid == allData.uuid) {
        html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
          html += "Delete";
        html += "</button>";
      }
      html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</li>";
  
    document.getElementById("messages").innerHTML += html;
  }) 
// }
// function deleteMessages(id){
firebase.database().ref("messages").on("child_removed", function(snapshot) {
    document.getElementById("message-" + snapshot.key).innerHTML = "this message has been removed"
  })
// }