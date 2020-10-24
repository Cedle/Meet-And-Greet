let readWrite;


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
  let locationstring = JSON.stringify(location);

  btn.id = location['id'];
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

  var html = "";
  html += "<button id='eventChatHead'>"+title+"</button>"
  html += "<ul id='messages-"+eid+"'></ul>"
  html += "<form onsubmit='return sendMessage("+'"'+eid+'"'+");'>"
  html += "<input id='message' placeholer='Enter message' autocomplete='off'>"
  html += "<input id='button' type='submit'>"
  html += "</form>"

  document.getElementById("chat").innerHTML =  html;
  document.getElementById("eventChatHead").onclick = function(){showEvent(locationstring)};
  var check = true;
  // delete readWrite.read;
  // delete readWrite.delete;
  // readWrite = null;
  
  try {
    disable(readWrite.eid,readWrite.delete,readWrite.read);
    console.log(readWrite.eid);
  } catch (error) {
    console.log("init");
    
  }
  readWrite = new MakeReadDelete(eid);
  
  
  // for (let i = 0; i < readWrite.length; i++) {
  //   const element = readWrite[i];
  //   if(element.eid === eid){
  //     check = false;
  //   }
  // }
  // if(check){
  //   readWrite.push(new MakeReadDelete(eid));
  // }
  // console.log(readWrite.length);

  // readWrite = jQuery.unique(readWrite);

  console.log(readWrite);


  changechat();




}
