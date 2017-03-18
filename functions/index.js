'use strict';

let functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
let result;

// var mrequest;


// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//









// exports.helloWorld = functions.https.onRequest((request, response) => {

//   console.log('Check if request is authorized with Firebase ID token');

//   if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
//     console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
//         'Make sure you authorize your request by providing the following HTTP header:',
//         'Authorization: Bearer <Firebase ID Token>');
//     response.status(403).send('Unauthorized123');
   
//   }

//   const idToken = request.headers.authorization.split('Bearer ')[1];
//   admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
//     console.log('ID Token correctly decoded', decodedIdToken);
//     request.user = decodedIdToken;
//     response.send(request.user);
//   }).catch(error => {
//     console.error('Error while verifying Firebase ID token:', error);
//     response.status(403).send('Unauthorized456');
//   });
 
//   })

exports.test=functions.https.onRequest((request, response) => {
const idToken = request.headers.authorization.split('Bearer ')[1];
console.log("UID from CF="+idToken)
response.send("UID from CF="+idToken);
// admin.auth()
//   .then(function() {
//   response.send(request.user);
//   })
//   .catch(function(error) {

//     console.log("Error creating custom token:", error);
//     response.status(403).send('Unauthorized456');
//   });


  })








