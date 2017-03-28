

'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({ origin: true });
const app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var request = require('request');

//download file

const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')();
const exec = require('child-process-promise').exec;
const LOCAL_TMP_FOLDER = '/tmp/';

// File extension for the created JPEG files.
const JPEG_EXTENSION = 'jpg';

var csv = require('csv-stream');
//var request  = require('request');
var zlib = require('zlib');

var _ = require('lodash');

const concat = require('concat-stream');

var populatedObject;









exports.test = functions.https.onRequest((request, response) => {


  cors(request, response, () => {




    console.log(request.body.myurl)
    console.log(request.body.mytoken)
    //response.send("done...")

    //verify token

    admin.auth().verifyIdToken(request.body.mytoken).then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken);
      request.user = decodedIdToken;
      console.log("Valid User")


      getCSVData(request.body.myurl, function (result) {
        response.send(result);
      })





    }).catch(error => {
      console.error('Error while verifying Firebase ID token:', error);

      response.send("Invalid user")

    });









  });




})




function getCSVData(fillURL, callback) {


  try {

    mongoose.plugin(require('mongoose-write-stream'));
    console.log("inside fun")




    request(fillURL)
      .pipe(zlib.createGunzip())
      .pipe(concat(stringBuffer => {
        let test = stringBuffer.toString();
        var arr = test.split('\n');
        console.log(arr)


        var objects = _.map(arr, function (item) { return item.split(','); });
        var headers = objects[0];
        objects.splice(0, 1); // remove the header line
        populatedObject = [];
        objects.forEach(function (item) {
          var obj = _.zipObject(headers, item);
          populatedObject.push(obj);
        });


        console.log(populatedObject);


        setConnection(function (result) {
          callback(result)
        })



      }));



  } catch (e) {
    console.error("e2=" + e);
    mongoose.connection.close()
    callback(e)
  }


}





function setConnection(callback) {


  console.log("hi form c2")

  var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

  // Connection URL
  var url = 'mongodb://cc:cc123@ds135800.mlab.com:35800/mydb';
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertDocuments(db, function (err, docs) {
      if (err)
        callback(err)

      else
        callback(docs)

    })

  });


}



function insertDocuments(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany(
    populatedObject, function (err, result) {
      if (err)
        callback(err);
      db.close
      console.log("Inserted into the collection");
      db.close
      callback(null, result);
    });
}



//Download file from storage and write data on DB


// exports.testFileUpload = functions.https.onRequest((req, res) => {



//   cors(req, res, () => {



//     var fileURL = req.headers.authorization
//     console.log("File URL1 =" + fileURL)

//     getCSVData(fileURL, function (err, result) {
//       res.send(result);
//     })



//   })



// });





























// function setmConnection(callback) {
//   mongoose.Promise = global.Promise;
//   mongoose.connect('mongodb://cc:cc123@ds135800.mlab.com:35800/mydb');

//   var db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', function () {

//     console.log("Mongoos connected...")

//     var kittySchema = mongoose.Schema({
//       name: String
//     });






//     kittySchema.methods.speak = function () {
//       var greeting = this.name
//         ? "Meow name is " + this.name
//         : "I don't have a name";
//       console.log(greeting);
//     }

//     var Kitten = mongoose.model('Kitten', kittySchema);

//     var fluffy = new Kitten({ name: 'Vinay' });

//     fluffy.speak(); // "Meow name is fluffy"

//     fluffy.save(function (err, fluffy) {
//       if (err) return console.error(err);
//       console.log("Item inserted")
//       fluffy.speak();

//     });
//   });





// }





