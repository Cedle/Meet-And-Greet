const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
//admin.initializeApp();
const userApp = express();
const db = admin.firestore();
userApp.use(cors({origin: true}));








  exports.friends = functions.https.onRequest(userApp);