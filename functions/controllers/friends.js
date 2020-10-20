const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
//admin.initializeApp();
const userApp = express();
const db = admin.firestore();
userApp.use(cors({origin: true}));




//Erstellen
userApp.post('/:id', async(req,res)=> {
    const freunde = req.body; 
    db.collection('/users/' + req.params.id + '/friends').add(freunde);
    res.status(201).send();
    
  });

userApp.post('/:id/:ownid/:friendid',  async(req,res)=> {
    const friend = req.body; 
    db.collection('users').doc(req.params.id).collection('friends').doc(req.params.ownid).collection('requested').doc(req.params.friendid).add(friend);
    res.status(201).send(JSON.stringify({id : req.params.id, freund : req.params.friendid, ich : req.params.ownid}));
    
  });
//freund hinzufügen
userApp.put("/:id", async (req, res) =>{
    const body = req.body;
  
    await db.collection('users').doc(req.params.id).update(body);
  
    res.status(200).send();
  
  
  });

  userApp.get('/:uuid', async(req, res)=> {
    const snapshot = await db.collection('users').get();
    let userImgUrl;
    let name;
    snapshot.forEach(doc => {

      if(doc.data().uuid === req.params.uuid){
        userImgUrl = doc.data().imgUrl;
        name = doc.data().userName;
      }
  
      
    });
    if(name !== null){
      if(userImgUrl === ""){
        userImgUrl = "./Bilder/profilepicture.jpg";
      }
      res.status(200).send(JSON.stringify({imgUrl: userImgUrl, userName: name}));
    }
  })


  exports.friends = functions.https.onRequest(userApp);