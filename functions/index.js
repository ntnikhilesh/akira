

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
var mcode;









exports.test = functions.https.onRequest((request, response) => {


  cors(request, response, () => {

    console.log("CSV file URL =", request.body.myurl)
    console.log("ID Token =", request.body.mytoken)
    console.log("Operation Code =", request.body.mcode)

    mcode = request.body.mcode;
    //response.send("done...")

    //verify token

    admin.auth().verifyIdToken(request.body.mytoken).then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken);
      request.user = decodedIdToken;
      console.log("Valid User")

      if (mcode == 1) {
        getCSVData(request.body.myurl, function (result) {
          response.send(result);
        })
      }
      else if (mcode == 2 || mcode == 3 || mcode == 4 || mcode == 5 || mcode == 6) {
        console.log("Operation No -2,3,4,5,6")
        //response.send("Operation No -2");

        setConnection(function (result) {
          response.send(result)
        })
      }
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

        console.log("Pre---")
        console.log(populatedObject);
        _.map(populatedObject, function (item) {
          Object.keys(item).forEach(key => {
            if (item[key] === "" || item[key] === null || item[key] === 'undefined') {
              delete item[key];
            }
            if (key === 'itemName') {
              if (typeof item[key] != 'undefined') {
                item[key] = item[key].replace(/(^\s+|\s+$)/g, '');
              }
            }
            if (key === 'categories') {
              item[key] =
                {
                  __type: 'Pointer',
                  className: 'Category',
                  objectId: item['categories']
                }
            }
          })
        });
        console.log("Post---")
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
    if (mcode == 1) {
      insertDocuments(db, function (err, docs) {
        if (err)
          callback(err)

        else
          callback(docs)
      })
    }
    else if (mcode == 2) {
      findDocuments(db, function (err, docs) {
        if (err)
          callback(err)
        else
          callback(docs)
      })
    }
    else if (mcode == 3) {
      findSpecDocuments(db, function (err, docs) {
        if (err)
          callback(err)
        else
          callback(docs)
      })
    }
    else if (mcode == 4) {
      findSpecDocuments1(db, function (err, docs) {
        if (err)
          callback(err)
        else
          callback(docs)
      })
    }
    else if (mcode == 5) {
      findSpecDocuments2(db, function (err, docs) {
        if (err)
          callback(err)
        else
          callback(docs)
      })
    }
    else if (mcode == 6) {
      findSpecDocuments3(db, function (err, docs) {
        if (err)
          callback(err)
        else
          callback(docs)
      })
    }
  });
}



function insertDocuments(db, callback) {
  // Get the documents collection
  var collection = db.collection('inventory');
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


function findDocuments(db, callback) {
  // Get the documents collection
  var collection = db.collection('inventory');
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    if (err)
      callback(err);
    db.close
    console.log("Find all doc from DB");
    db.close
    callback(null, docs);
  });
}


function findSpecDocuments(db, callback) {
  // Get the documents collection
  var collection = db.collection('inventory');
  // Find some documents
  collection.find({ mrp: "100" }).toArray(function (err, docs) {
    if (err)
      callback(err);
    db.close
    console.log("Find specific doc from DB");
    db.close
    callback(null, docs);


  });
}

function findSpecDocuments1(db, callback) {
  // Get the documents collection
  var collection = db.collection('inventory');
  // Find some documents
  collection.find({ mrp: { $in: ["100", "25"] } }).toArray(function (err, docs) {
    if (err)
      callback(err);
    db.close
    console.log("Find very specific doc from DB");
    db.close
    callback(null, docs);


  });
}

function findSpecDocuments2(db, callback) {
  // Get the documents collection
  var collection = db.collection('inventory');
  // Find some documents
  collection.find({ itemName: "7 UP PET 250ML", mrp: { $lt: "30" } }).toArray(function (err, docs) {
    if (err)
      callback(err);
    db.close
    console.log("Query 5 done");
    db.close
    callback(null, docs);


  });
}

function findSpecDocuments3(db, callback) {
  // Get the documents collection
  var collection = db.collection('inventory');
  // Find some documents
  collection.find({ $or: [{ barcode: "8901361301510" }, { mrp: { $lt: "30" } }] }).toArray(function (err, docs) {
    if (err)
      callback(err);
    db.close
    console.log("Query 6 done");
    db.close
    callback(null, docs);


  });
}



















































