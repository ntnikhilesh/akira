

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

        // insertDocuments(db,function(err,docs)
        // {
        //     if(err)
        //       callback(err)
             
        //     else
        //       callback(docs)
              
        // })



        //  updateDocuments(db,function(err,docs)
        // {
        //     if(err)
        //       callback(err)
             
        //     else
        //       callback(docs)
              
        // })


        //   deleteDocuments(db,function(err,docs)
        // {
        //     if(err)
        //       callback(err)
             
        //     else
        //       callback(docs)
              
        // })


           findAllDocuments(db,function(err,docs)
        {
            if(err)
              callback(err)
             
            else
              callback(docs)
              
        })

    });


}



// function insertDocuments(db, callback) 
// {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany(
//     [
//       {d : 1}, {e : 2}, {f : 3}
//     ], function(err, result) 
//     {
//       if(err)
//       callback(err);
//       console.log("Inserted 3 documents into the collection");
//       callback(null,result);
//     });
// }


// function updateDocuments(db, callback) 
// {
  
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({ a : 2 }
//     , { $set: { b : 1 } ,new:true,upsert:false}, function(err, result) 
//     {
    
//     console.log("Updated the document with the field a equal to 2");
//     callback(result);
//   });  


// }


// function deleteDocuments(db, callback) 
// {
  
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Delete document where a is 3
//   collection.deleteOne({ a : 3 }, function(err, result) {
    
//     console.log("Removed the document with the field a equal to 3");
//     callback(result);
//   });    


// }



// function deleteDocuments(db, callback) 
// {
  
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Delete document where a is 3
//   collection.deleteOne({ a : 3 }, function(err, result) {
    
//     console.log("Removed the document with the field a equal to 3");
//     callback(result);
//   });    


// }

function findAllDocuments(db, callback) 
{
  
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  }); 


}


