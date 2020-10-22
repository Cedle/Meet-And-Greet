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
  btn.onclick = function() {showEvent(locationstring)};
  if(type == "private"){
    document.getElementById("Eventlistprivate").appendChild(btn);
  }else if(type == "public"){
    document.getElementById("Eventlistpublic").appendChild(btn);
  }
} 

async function showEvent(location){
  location = JSON.parse(location);
  console.log(location['imgUrl']);
  document.getElementById("infopic").src = await location['imgUrl'];
  document.getElementById("infohead").textContent = location['title'];
  document.getElementById("infotime").textContent = location['time'];
  document.getElementById("infodesc").textContent = location['desc'];
  if(typeof btn == "undefined"){
  btn = document.createElement("button");
  }
  btn.className = "infoDeleteEventButtonDesign";
  btn.onclick = function() {deleteEvent(allData.uuid,location['host'],location['id'])};
  document.getElementById("infoDeleteEventButton").appendChild(btn);
  changeEvent();
}