const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const userApp = express();
const db = admin.database();
userApp.use(cors({origin: true}));


userApp.post('/sendMessage', async(req,res)=> {
    messageinfo = req.body;
    db.ref("messages/"+messageinfo.id).push().set({
        "sender": messageinfo.sender,
        "message": messageinfo.message,
        "uuid": messageinfo.uuid
    });
    res.status(201).send(messageinfo);
});

userApp.delete('/deleteMessage', async(req,res)=> {
    del = req.body;

    db.ref("messages/" + del.eventId).child(del.messageId).remove();
    res.status(201).send();
});
exports.chatservice = functions.https.onRequest(userApp);