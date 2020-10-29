
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
//admin.initializeApp();
const userApp = express();
const db = admin.database();
userApp.use(cors({origin: true}));

userApp.post('/newEvent', async (req,res) =>{
    const event = req.body;
    if(event.evisibility === "private"){
        let eventKey = await db.ref('events/private/'+ event.eventHost).push().key
    
        db.ref('events/private/'+ event.eventHost+"/"+eventKey).set(event);
        res.status(201).send(eventKey);
    }else{
        let eventKey = await db.ref('events/public').push().key
    
        db.ref('events/public/'+eventKey).set(event);
        res.status(201).send();
    }

    
})
userApp.put('/:eventid/:key', (req, res)=> {
    const event = req.params.eventid;
    const eventPath = req.params.key;
    const friend = req.body;
    let check = true;
    let keys;
        db.ref("events/management/"+eventPath+"/added").once("value",function(snapshot){
            keys = Object.keys(snapshot.val());
            for (let i = 0; i < keys.length; i++) {
                const element = keys[i];
                if(snapshot.val()[element].uuid === friend.uuid){
                    check = false;
                }
            }
        })
        if(check){
            const userKey = db.ref("events/management/"+eventPath+"/added").push().key;
            const eventKey = db.ref("events/management/"+friend.uuid+"/added").push().key;
            db.ref("events/management/"+eventPath+"/added/"+userKey).set({
                "uuid" : friend.uuid,
                "key" : eventKey
            })
            db.ref("events/management/"+friend.uuid+"/added/"+eventKey).set({
                "path" : event+"/"+eventPath,
                "key" : userKey
            })
        }
        
   
    
    res.status(201).send(JSON.stringify({test : eventPath}));
})
userApp.put('/editEvent/:eventid/:uuid', (req, res)=> {
    const data = req.body;
    const uuid = req.params.uuid;
    let debug;
    if(data.host === uuid){
        if(data.evisibility === "private"){
            debug = "private";
            db.ref("events/private/"+uuid+"/"+data.id).set({
                eventDateTime : data.time ,
                eventDescription : data.desc ,
                eventHost : data.host ,
                eventName : data.title ,
                eventPlace : {
                    lng : data.lng,
                    lat : data.lat
                },
                evisibility: data.evisibility
            })
        }else{
            debug = "public";
            db.ref("events/public/"+data.id).set({
                eventDateTime : data.time ,
                eventDescription : data.desc ,
                eventHost : data.host ,
                eventName : data.title ,
                eventPlace : {
                    lng : data.lng,
                    lat : data.lat
                },
                evisibility: data.evisibility
            })
        }
    }else{
        debug = "nth";
    }
    

    res.status(201).send(JSON.stringify(debug));
})

userApp.put('/joinEvent', (req, res)=> {
    const user = req.body;
    const userKey = db.ref("events/management/joinedPublic/"+user.eid+"/added").push().key;
    const eventKey = db.ref("events/management/joinedPublic/"+user.uuid+"/added").push().key;
        db.ref("events/management/joinedPublic/"+user.eid+"/added/"+userKey).set({
            "uuid" : user.uuid,
            "key" : eventKey
        })
        db.ref("events/management/joinedPublic/"+user.uuid+"/added/"+eventKey).set({
            "path" : user.eid,
            "key" : userKey
        })
    res.status(201).send();
})

userApp.delete('/leaveEvent', async(req, res) => {
    const data = req.body;
    let keys;
    let key;
    let path;
    let debug = [];
    await db.ref("events/management/"+data.uuid+"/added").once("value",function(snapshot){
        keys = Object.keys(snapshot.val());
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            if(snapshot.val()[element].path === data.host + "/"+ data.eid){
                
                debug.push(snapshot.val()[element]);
                path = snapshot.val()[element].key;
                key = element;
            }
        }
    })
   
    db.ref("events/management/"+data.eid+"/added").child(path).remove();
    db.ref("events/management/"+data.uuid+"/added").child(key).remove();

    
    res.status(200).send(debug);
})
userApp.delete('/deleteEvent/:eventkey', async(req, res) =>{
    let eventKey = req.params.eventkey;
    let data = req.body;
    let keys;
    let debug = [];
    if(data.visibility === "private"){
        await db.ref('events/private/'+data.host).child(eventKey).remove();
        await db.ref('events/management/'+eventKey+'/added').once("value",async function(snapshot){
            
            keys = Object.keys(await snapshot.val());
            for (let i = 0; i < keys.length; i++) {
                const element = keys[i];
                debug.push(snapshot.val()[element]);
                db.ref('events/management/'+snapshot.val()[element].uuid+"/added").child(snapshot.val()[element].key).remove();
            }
        db.ref('events/management/'+eventKey).remove();
            
        })
        
    }else{
        await db.ref('events/public').child(eventKey).remove();
        await db.ref('events/management/joinedPublic/'+eventKey+'/added').once("value",async function(snapshot){
            
            keys = Object.keys(await snapshot.val());
            for (let i = 0; i < keys.length; i++) {
                const element = keys[i];
                debug.push(snapshot.val()[element]);
                db.ref('events/management/joinedPublic/'+snapshot.val()[element].uuid+"/added").child(snapshot.val()[element].key).remove();
            }
        db.ref('events/management/joinedPublic/'+eventKey).remove();
            
        })
    }
    res.status(200).send(debug);
})
exports.eventservice = functions.https.onRequest(userApp);