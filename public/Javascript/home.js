// Eventdaten bekommen und eintragen
function setEvent(location,type){
  let btn= document.createElement("button");
  
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  let picture = document.createElement("img");
  picture.setAttribute("src",location['imgUrl']);
  let content1 = document.createTextNode(location['title']);
  let content2 = document.createTextNode(location['name']);
  let content3 = document.createTextNode(location['desc']);
  let content4 = document.createTextNode(location['time']);
  let content5 = document.createTextNode(location['id']);
  let locationstring = JSON.stringify(location);

  btn.id = content5;
  btn.className = "Eventlistprivatedesign";
  div1.className = "Eventpicture";
  div2.className = "Eventdesc";
  // content.setAttribute("value",location['title']+"<br>"+location['name']+"<br>"+location['desc']);
  div1.appendChild(picture);
  div2.appendChild(content1);
  div2.appendChild(content4);
  var br = document.createElement("br");
  div2.appendChild(br);
  div2.appendChild(content2);
  var br = document.createElement("br");
  div2.appendChild(br);
  div2.appendChild(content3);
  btn.appendChild(div1);
  btn.appendChild(div2);
  btn.onclick = function() {createEventChat(location['title'],location['id'],locationstring)};
  if(type == "private"){
    document.getElementById("Eventlistprivate").appendChild(btn);
  }else if(type == "public"){
    document.getElementById("Eventlistpublic").appendChild(btn);
  }
} 

async function createEventChat(title,eid,locationstring){
  
  document.getElementById("eventChatHead").innerHTML= String(title);
  document.getElementById("eventChatHead").onclick = function() {showEvent(locationstring);};
  
  if(typeof list == "undefined"){
    list = document.createElement("ul");
  }
  
  if(typeof messagetext == "undefined"){
    messagetext = document.createElement("input");
  }
  if(typeof submit == "undefined"){
    submit = document.createElement("input");
  }

  eventid = document.createTextNode(eid);
  list.id = eventid;
  list.onsubmit = function(){sendMessage(eventid)};
  messagetext.placeholder = "Enter message";
  messagetext.autocomplete = "off";
  submit.type = "submit";

  document.getElementById("eventchatlist").appendChild(list);
  document.getElementById("eventchatmessagetext").appendChild(messagetext);
  document.getElementById("eventchatsubmit").appendChild(submit);
  changechat();

//  <!-- <ul id="messages--MK6JCqEDYR2_te8fS9u"></ul>
//           <form onsubmit="return sendMessage('-MK6JCqEDYR2_te8fS9u');">
//             <input id="message" placeholder="Enter message" autocomplete="off">
//             <input id="button" type="submit">
//           </form> -->

}
