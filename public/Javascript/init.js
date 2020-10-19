let allData;
let myuser;

firebase.auth().onAuthStateChanged( async function(user){
    if (user) {
      let check = 0;
      let dbEmail;
      
      allData={
        "uid" : user.uid,
        "userName" : user.displayName,
        "email" : user.email,
        "bio" : "",
        "imgUrl" : ""
      }
      await $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/" + user.uid , function(usersData){
         
        // usersData.forEach(element => {
        //   email = element.email;
          
        if(usersData.uid === allData.uid){
            allData = usersData;
        }else{
          $.post("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user",allData,function(data,status){
            console.log(`${data} and status is ${status}`)
            $.getJSON("https://us-central1-meet-and-greet-cb3de.cloudfunctions.net/user/" + user.uid , function(usersData){
              allData = usersData;
            });
          });
        }
        // });
      });
    }
  });