import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

import * as firebase from 'firebase';

import { LocalStorageService } from 'angular-2-local-storage';

import * as admin from "firebase-admin";
declare var $:any;

//declare var userID:any;

@Injectable()
export class Test 
{
	userID:any;
	flag:any;
	mFileURL:any;
  	constructor( private http: Http,private localStorageService: LocalStorageService) 
  	{}

	firebase(mtoken)
	{


	 	let authHeader = new Headers();
	   	console.log( 'token form srvice = '+mtoken);

		authHeader.append('Authorization',mtoken);

	 	return this.http.get('https://us-central1-td-demo-df34d.cloudfunctions.net/test', 
	 	{
    		headers: authHeader
  		})
	}



	firebaseFileUpload()
	{


	 	//let authHeader = new Headers();
	   	//console.log( 'token form srvice = '+mtoken);

		//authHeader.append('Authorization',"11ssd");

		   console.log("hi form file upload")

  	 //console.log("User id in Upload fun="+this.localStorageService.get("fileID1"))
	   this.mFileURL="google.com"

	 	return this.http.get('https://us-central1-td-demo-df34d.cloudfunctions.net/testFileUpload?mURL='+this.mFileURL)
	}

}