'use strict';

let functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
let mresult;
let mrequest;
let mresponse;


exports.test=functions.https.onRequest((request, response) => {



console.log("UID from CF1="+request.headers.authorization)



 response.send("Valid User");


this.mresult =admin.auth().verifyIdToken(request.headers.authorization).then(decodedIdToken => {
    console.log('ID Token correctly decoded', decodedIdToken);
    request.user = decodedIdToken;
    console.log("result form cf decoded done")
   return 'Valid user';
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error);
    response.status(403).send('Unauthorized456');
    return 'Invalid user'
  });



  })









