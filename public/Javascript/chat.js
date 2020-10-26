
  function sendMessage(id){
    var message = document.getElementById("message").value;
    
    var data ={
      sender: allData.userName,
      message: message,
      uuid: allData.uuid,
      id : id
    }
    $.post("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/chatservice/sendMessage",data,function(){
    });
    document.getElementById("message").value = "";
    return false;
  }

  function deleteMessage(self){
    messageId = self.getAttribute("data-id");
    eventId = self.getAttribute("event-id");
    var data ={
      messageId : messageId,
      eventId : eventId
    }
    $.delete("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/chatservice/deleteMessage",data,function(){
    });
    
  }

  
class MakeReadDelete {
  constructor(id) {
    this.eid = id;
    this.read = firebase.database().ref("messages/" + id).on("child_added", function (snapshot) {
      console.log("write");
      var html = "";
      html += "<li id='message-" + id + snapshot.key + "'><div id='messagebutton'>";
      if (snapshot.val().uuid == allData.uuid) {
        html += "<button event-id='" + id + "'  data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
        html += "Delete";
        html += "</button>";
      }
      html += "</div><div><div id='sender'>"+snapshot.val().sender + ":</div><div id='messagecontent'> " + snapshot.val().message+"</div></div>";
      html += "</li>";

      document.getElementById("messages-" + id).innerHTML += html;
      return self;
    });

    this.delete = firebase.database().ref("messages/" + id).on("child_removed", function (snapshot) {
      document.getElementById("message-" + id + snapshot.key).innerHTML = "this message has been removed";
      return self;
    });
  }
}


function disable(id,refdel,refread){
  firebase.database().ref("messages/" + id).off("child_added", refread );
  firebase.database().ref("messages/" + id).off("child_removed", refdel );
}