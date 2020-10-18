let file = {};

function updateProfil(){
    document.getElementById("name").textContent = allData.userName;
    document.getElementById("bio").textContent = allData.bio;
}
  
function changeUserInfo(){
    changedData= {
      "userName": document.getElementById("name").value,
      "bio": document.getElementById("bio").value
    }
    $.put("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/"+allData.id,changedData,function(){
      console.log("vielleicht geht s ja");
    });
}
  
  
  
async function chooseFile(e){
    file = await e.target.files[0];
    await firebase.storage().ref("users/"+ allData.uid + "/profile.jpg").put(file).then(function(){
      console.log("succesfully uploaded")
    }).catch(error => {
      console.log(error.message);
    })
    firebase.storage().ref("users/" + allData.uid + "/profile.jpg").getDownloadURL().then(imgUrl =>{
        allData.imgUrl = imgUrl;
        document.getElementById("img").src = imgUrl;
    })
}