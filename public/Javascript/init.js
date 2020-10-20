let allData;
const uuid = uuidv4();

firebase.auth().onAuthStateChanged( async function(user){
    if (user) {
      
      
      allData={
        "uid" : user.uid,
        "userName" : user.displayName,
        "email" : user.email,
        "bio" : "",
        "imgUrl" : "",
        "uuid" : uuid
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
    $.getScript("./Javascript/chat.js", function(){
    
    });
    $.getScript("./Javascript/home.js", function(){
      
    });
    $.getScript("./Javascript/profile.js", function(){
      
    });
    $.getScript("./Javascript/uiOnChange.js", function(){
      
    });
    await $.getScript("./Javascript/map.js", function(){
      
    });
    await $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCcaSqSolT95GBxvo0TEmaKzZ5m0fEt088&callback=initAutocomplete&libraries=places&v=weekly", function(){
      
    });
    await $.getScript("./Javascript/event.js", function(){
      
    });
    
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
