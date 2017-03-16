/*var functions = require('firebase-functions');


exports.helloWorld = functions.https.onRequest((request, response) => {

var param=request.query.id

if(param==='c2N0mLPV8gfzkgxC1qHwuQuE1w63'){
	response.send('Valid user');

}
else{
	response.send("Invalid user");
}

 
 




})

*/


var functions = require('firebase-functions');

//const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
var num=1;
var userID = [];
var validUser=0;


exports.helloWorld = functions.https.onRequest((request, response) => {


var param=request.query.id
var flag=request.query.flag


if(flag==1)
{
	userID.push(param);
	response.send("Total user="+userID.length);
}

if(flag==2)
{
	for (var i = 0; i < userID.length; i++) 
	{		
		if(userID[i]==param)
		{
			validUser=1;
			response.send("Valid user");
		}
	}	
	if (validUser==0) 
	{
		response.send("Invalid user");
	}
}

//response.send("1 ID="+fruits[0]+"2 ID"+fruits[1]);
/*if(param==='c2N0mLPV8gfzkgxC1qHwuQuE1w63')
{

	response.send('Valid user no-'+num+" param="+param+"Flag-"+flag);
	
	num=num+1;

	

}
else{
	response.send("Invalid user");
} */

 
 




})





