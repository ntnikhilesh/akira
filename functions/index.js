

'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
var mongoose = require('mongoose');
var fs=require('fs');
var request=require('request');

//download file

const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')();
const exec = require('child-process-promise').exec;
const LOCAL_TMP_FOLDER = '/tmp/';

// File extension for the created JPEG files.
const JPEG_EXTENSION = 'jpg';

//Write CSV file
//var mongoose = require('mongoose');
var csv      = require('csv-stream');
//var request  = require('request');
var zlib     = require('zlib');







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



exports.testFileUpload = functions.https.onRequest((req, res) => 
{



 cors(req, res, () => 
  {

//          try{
//   mongoose.Promise = global.Promise;
//   mongoose.connect('mongodb://cc:cc123@ds135800.mlab.com:35800/mydb');
// mongoose.plugin(require('mongoose-write-stream'));
//  console.log("inside fun")
// var Tick = mongoose.model('Tick3', {
  
//   time: Number,
//   price: Number,
//   quantity: Number
// });
 
// request('https://firebasestorage.googleapis.com/v0/b/td-demo-df34d.appspot.com/o/shopgro-storage%2F0.620173534694672?alt=media&token=80498423-e2c6-4cab-b5bd-e8ae661ad93b')
//   .pipe(zlib.createGunzip())
//   .pipe(csv.createStream({
    
//     columns: ['time', 'price', 'quantity']
//   }))
//   .pipe(Tick.writeStream())
//   .on('error', function (err) {
//             console.error("e1="+err);
//             mongoose.connection.close()
//             res.send("Result ="+err)
//           })
//           .on('finish', function() {
//             console.log("CSV Inserted ");
//             mongoose.connection.close()
//             res.send("CSV Inserted")
            
//           });
  
//   }catch (e) {
//         console.error("e2="+e);
//         mongoose.connection.close()
//         res.send(e)
//       }
//       mongoose.connection.close()
//       res.send("Item insterted successfully...")










 writeCSVData(function(result)
          {
            res.send(result);
          })
// mongoose.Promise = global.Promise;
//   mongoose.connect('mongodb://cc:cc123@ds135800.mlab.com:35800/mydb');
// mongoose.plugin(require('mongoose-write-stream'));
 
// var Tick = mongoose.model('Tick1', {
//   time: Number,
//   price: Number,
//   quantity: Number
// });
 
// request('http://api.bitcoincharts.com/v1/csv/bitstampUSD.csv.gz')
//   .pipe(zlib.createGunzip())
//   .pipe(csv.createStream({
//     columns: ['time', 'price', 'quantity']
//   }))
//   .pipe(Tick.writeStream());

//   res.send("successfully insert...");


  })

//mongoimport --db users --collection contacts --type csv --headerline --file /opt/backups/contacts.csv

// var destination = fs.createWriteStream('./savedImage.png');
// request('https://my.modulus.io/img/modulus-logoSmall-gray20.png').pipe(destination);




















  
  

  //   cors(request, response, () => 
  // {
  //   var param=request.query.mURL
  //   console.log("File URL1 ="+request.query.mURL)
  //   console.log("File uploaded successfully")
  //   response.send("Upload done")


  //     //Download File
  //     const file_url = 'https://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
  // // var el = document.createElement('a');
  //  el.download = file_url;
  //  el.href = file_url;
  //  document.body.appendChild(el);
  //  el.click();
  //  el.remove();





  //    setmConnection(function()
  //         {
  //            console.log("h1")
  //           //response.send(result);
  //         })
    


  // })
});


function writeCSVData(callback)
{


   try{
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://cc:cc123@ds135800.mlab.com:35800/mydb');
mongoose.plugin(require('mongoose-write-stream'));
 console.log("inside fun")
var Tick = mongoose.model('Tick3', {
  
  time: String,
  price: String,
  quantity: String
});
 
request('https://firebasestorage.googleapis.com/v0/b/td-demo-df34d.appspot.com/o/shopgro-storage%2F0.3684234664863155?alt=media&token=844f4532-6f92-4b60-bb5b-9ca5a9f7dd7d')
  .pipe(zlib.createGunzip())
  .pipe(csv.createStream({
    
    columns: ['time', 'price', 'quantity']
  }))
  .pipe(Tick.writeStream())
  .on('error', function (err) {
            console.error("e1="+err);
            mongoose.connection.close()
            callback("Result ="+err)
          })
          .on('finish', function() {
            console.log("CSV Inserted ");
            mongoose.connection.close()
            callback("CSV Inserted")
            
          });
  
  }catch (e) {
        console.error("e2="+e);
        mongoose.connection.close()
        callback(e)
      }
     //mongoose.connection.close()
    //callback("Item insterted successfully...")











//   try{
//   mongoose.Promise = global.Promise;
//   mongoose.connect('mongodb://cc:cc123@ds135800.mlab.com:35800/mydb');
// mongoose.plugin(require('mongoose-write-stream'));
//  console.log("inside fun")
// var Tick = mongoose.model('Tick3', {
  
//   time: Number,
//   price: Number,
//   quantity: Number
// });
 
// request('https://firebasestorage.googleapis.com/v0/b/td-demo-df34d.appspot.com/o/shopgro-storage%2F0.620173534694672?alt=media&token=80498423-e2c6-4cab-b5bd-e8ae661ad93b')
//   .pipe(zlib.createGunzip())
//   .pipe(csv.createStream({
    
//     columns: ['time', 'price', 'quantity']
//   }))
//   .pipe(Tick.writeStream())
//   .on('error', function (err) {
//             console.error("e1="+err);
//             callback(err)
//           })
//           .on('finish', function() {
//             console.log("CSV Inserted ");
//             callback("CSV Inserted")
            
//           });
  
//   }catch (e) {
//         console.error(e);
//         callback(e)
//       }
  
}












function setmConnection(callback)
{
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://cc:cc123@ds135800.mlab.com:35800/mydb');

  var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  console.log("Mongoos connected...")

  var kittySchema = mongoose.Schema({
    name: String
});


//   var Kitten = mongoose.model('Kitten', kittySchema);

//   var silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'



kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'Vinay' });

fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  console.log("Item inserted")
  fluffy.speak();

});
});
 




}





// exports.imageToJPG = functions.storage.object().onChange(event => {
//   const object = event.data;
//   const filePath = object.name;
//   const filePathSplit = filePath.split('/');
//   const fileName = filePathSplit.pop();
//   const fileNameSplit = fileName.split('.');
//   const fileExtension = fileNameSplit.pop();
//   const baseFileName = fileNameSplit.join('.');
//   const fileDir = filePathSplit.join('/') + (filePathSplit.length > 0 ? '/' : '');
//   const JPEGFilePath = `${fileDir}${baseFileName}.${JPEG_EXTENSION}`;//
//   const tempLocalDir = `${LOCAL_TMP_FOLDER}${fileDir}`;
//   const tempLocalFile = `${tempLocalDir}${fileName}`;//
//   const tempLocalJPEGFile = `${LOCAL_TMP_FOLDER}${JPEGFilePath}`;//

//   // Exit if this is triggered on a file that is not an image.
//   if (!object.contentType.startsWith('image/')) {
//     console.log('This is not an image.');
//     return;
//   }

//   // Exit if the image is already a JPEG.
//   if (object.contentType.startsWith('image/jpeg')) {
//     console.log('Already a JPEG.');
//     return;
//   }

//   // Exit if this is a move or deletion event.
//   if (object.resourceState === 'not_exists') {
//     console.log('This is a deletion event.');
//     return;
//   }

//   // Create the temp directory where the storage file will be downloaded.
//   return mkdirp(tempLocalDir).then(() => {
//     // Download file from bucket.
//     const bucket = gcs.bucket(object.bucket);
//     return bucket.file(filePath).download({
//       destination: tempLocalFile
//     }).then(() => {
//       console.log('The file has been downloaded to', tempLocalFile);
//       // Convert the image to JPEG using ImageMagick.
//       return exec(`convert "${tempLocalFile}" "${tempLocalJPEGFile}"`).then(() => {
//         console.log('JPEG image created at', tempLocalJPEGFile);
//         // Uploading the JPEG image.
//         return bucket.upload(tempLocalJPEGFile, {
//           destination: JPEGFilePath
//         }).then(() => {
//           console.log('JPEG image uploaded to Storage at', filePath);
//         });
//       });
//     });
//   });
// });
