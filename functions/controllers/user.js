const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp();
const userApp = express();
const db = admin.firestore();
userApp.use(cors({origin: true}));


// userApp.get('/:email',async(req,res) => {
//   const snapshot = await db.collection('users').get();

//   let users = [];
//   snapshot.forEach(doc => {
//     let id = doc.id;
//     let data = doc.data();

//     users.push({id, ...data});

//   });
//   res.status(200).send(JSON.stringify(users));
// });

//Holen
userApp.get("/:uid", async (req, res) => {
  const snapshot = await db.collection('users').get();
  let userId;
  let userData;
  snapshot.forEach(doc => {
    
    if(doc.data().uid === req.params.uid){
      userId = doc.id;
      userData = doc.data();
    }

    
  });
  if(userId !== null){
    res.status(200).send(JSON.stringify({id: userId, ...userData}));
  }
  
});

//Erstellen
userApp.post('/', async(req,res)=> {
  const user = req.body;
  const temp = {
    "temp" : "temp"
  }
  await db.collection('users').add(user);
  db.collection('users/temp').add(temp);
  res.status(201).send();
  
});

//Überschreiben(Update)
userApp.put("/:id", async (req, res) =>{
  const body = req.body;
  await db.collection('users').doc(req.params.id).update(body);
  

  res.status(201).send();
});
//Löschen
userApp.delete("/:id", async (req, res) =>{
  await db.collection("users").doc(req.params.id).delete();

  res.status(200).send();
});
  




exports.user = functions.https.onRequest(userApp);

