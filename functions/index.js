

'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();


exports.test = functions.https.onRequest((request, response) => 
{

  cors(request, response, () => 
  {


    var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://cc:cc123@ds135800.mlab.com:35800/mydb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
  response.send("Connected successfully to server")
});


    




    // console.log('inside cors')


    // //verify token

    //   admin.auth().verifyIdToken(request.headers.authorization).then(decodedIdToken => 
    //   {
    //       console.log('ID Token correctly decoded', decodedIdToken);
    //       request.user = decodedIdToken;
    //       console.log("Valid User")

          

    //       response.send("Valid user")
    //   }).catch(error => 
    //   {
    //     console.error('Error while verifying Firebase ID token:', error);
    
    //     response.send("Invalid user")
    
    //   });

  });

  
})







