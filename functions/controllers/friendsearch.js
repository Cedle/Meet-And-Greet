const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
//admin.initializeApp();
const userApp = express();
const db = admin.firestore();
userApp.use(cors({origin: true}));



userApp.get('/:name', async(req, res)=> {
    const snapshot = await db.collection('users').get();
    let data = '{"results":[{"uuid":"placeholder","name":"placeholder"}';
    let name = req.params.name;
    snapshot.forEach(doc => {

      if((doc.data().userName.toLowerCase().search(name.toLowerCase())) >= 0 && name !== ""){
        data += ',{"uuid":"' + doc.data().uuid + '","name":"' + doc.data().userName + '"}';
      }
  
      
    });
    data += ']}';
    result = JSON.parse(data);
    
    res.status(200).send(result);
  })

  userApp.get('/friend/:uuid', async(req, res)=> {
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







exports.friendsearch = functions.https.onRequest(userApp);