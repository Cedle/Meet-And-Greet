const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
//admin.initializeApp();
const userApp = express();
const db = admin.database();
userApp.use(cors({origin: true}));


userApp.post('/addFriend/:uuidfriend/:uuiduser', async(req, res)=> {
        const snapshot = await db.ref("friends/"+req.params.uuiduser+"/requested").push().set({
            "uuid" : req.params.uuidfriend
        })
    
    
        res.status(200).send(snapshot);
    
  })








exports.friendservice = functions.https.onRequest(userApp);