// Eventdaten bekommen und eintragen




function setEvent(location,type){



  let btn= document.createElement("button");
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let picture = document.createElement("img");
  picture.setAttribute("src",location['imgUrl']);
  let content1 = document.createTextNode(location['title']);
  let content2 = document.createTextNode(location['name']);
  let content3 = document.createTextNode(location['desc']);
  
  btn.className = "Eventlistprivatedesign";
  div1.className = "Eventpicture";
  div2.className = "Eventdesc";
  // content.setAttribute("value",location['title']+"<br>"+location['name']+"<br>"+location['desc']);
  div1.appendChild(picture);
  div2.appendChild(content1);
  var br = document.createElement("br");
  div2.appendChild(br);
  div2.appendChild(content2);
  var br = document.createElement("br");
  div2.appendChild(br);
  div2.appendChild(content3);
  btn.appendChild(div1);
  btn.appendChild(div2);
  if(type == "private"){
    document.getElementById("Eventlistprivate").appendChild(btn);
  }else if(type == "public"){
    document.getElementById("Eventlistpublic").appendChild(btn);
  }
} 

