const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
//admin.initializeApp();
const userApp = express();
const db = admin.database();
userApp.use(cors({origin: true}));


userApp.post('/addFriend/:uuidfriend', async(req, res)=> {
    const user = req.body;
    const friend = req.params.uuidfriend;

    const userKey = db.ref("friends/"+user.uuid+"/requested").push().key;


    await db.ref("friends/"+user.uuid+"/requested/"+userKey).set({
        "uuid" : friend
    })
    await db.ref("friends/"+friend+"/pending").push().set({
        "uuid" : user.uuid,
        "key" : userKey
    })
    
    res.status(201).send();
    
  })

userApp.put('/acceptFriend/:uuidfriend/:friendid/:userid', async(req, res) => {
    const user = req.body;
    const friend = req.params.uuidfriend;
    let userid = req.params.userid;
    let friendid = req.params.friendid;

    await db.ref("friends/"+user.uuid+"/pending").child(userid).remove();
  
    await db.ref("friends/"+friend+"/requested").child(friendid).remove();
    userid = db.ref("friends/"+user.uuid+"/added").push().key
    
    friendid = db.ref("friends/"+friend+"/added").push().key
    await db.ref("friends/"+friend+"/added/"+friendid).set({
        "uuid": user.uuid,
        "key" : userid 
    })
    await db.ref("friends/"+user.uuid+"/added/"+userid).set({
        "uuid": friend,
        "key" : friendid
      })
    res.status(200).send();
})
userApp.put('/declineFriend/:uuidfriend/:friendid/:userid', async(req, res) => {
    const user = req.body;
    const friend = req.params.uuidfriend;
    const userid = req.params.userid;
    const friendid = req.params.friendid;

    await db.ref("friends/"+user.uuid+"/pending").child(userid).remove();
  
    await db.ref("friends/"+friend+"/requested").child(friendid).remove();
    res.status(200).send();
})

userApp.delete('/deleteFriend/:uuidfriend/:friendid/:userid', async(req, res) => {
    const user = req.body;
    const friend = req.params.uuidfriend;
    const userid = req.params.userid;
    const friendid = req.params.friendid;

    await db.ref("friends/"+user.uuid+"/added").child(userid).remove();
  
    await db.ref("friends/"+friend+"/added").child(friendid).remove();
    res.status(200).send();
})




exports.friendservice = functions.https.onRequest(userApp);