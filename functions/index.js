

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



    //verify token

      admin.auth().verifyIdToken(request.headers.authorization).then(decodedIdToken => 
      {
          console.log('ID Token correctly decoded', decodedIdToken);
          request.user = decodedIdToken;
          console.log("Valid User")

          
          setConnection(function(result)
          {
            response.send(result);
          })


          
      }).catch(error => 
      {
        console.error('Error while verifying Firebase ID token:', error);
    
        response.send("Invalid user")
    
      });

 


    




  });



  
})


function setConnection(callback)
{


    console.log("hi form c2")

    var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

    // Connection URL
    var url = 'mongodb://cc:cc123@ds135800.mlab.com:35800/mydb';
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) 
    {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        insertDocuments(db,function(err,docs)
        {
            if(err)
              callback(err)
             
            else
              callback(docs)
              
        })

    });


}



function insertDocuments(db, callback) 
{
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany(
    [
      {d : 1}, {e : 2}, {f : 3}
    ], function(err, result) 
    {
      if(err)
      callback(err);
      console.log("Inserted 3 documents into the collection");
      callback(null,result);
    });
}



exports.testFileUpload = functions.https.onRequest((request, response) => 
{
  var param=request.query.mURL
  console.log("File URL0 ="+param)

    cors(request, response, () => 
  {
    console.log("File URL1 ="+request.query.mURL)
    console.log("File uploaded successfully")
    response.send("Upload done")

  })
});

