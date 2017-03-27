import {Injectable} from '@angular/core';
import {Http, Response,URLSearchParams} from '@angular/http';
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


		let data = new URLSearchParams();
  data.append('mytoken', mtoken);
  data.append('myurl', "google.com");

  return this.http
    .post('https://us-central1-td-demo-df34d.cloudfunctions.net/test', data)
    

	 	// let authHeader = new Headers();
	   	// console.log( 'token form srvice = '+mtoken);

		// authHeader.append('Authorization',mtoken);

	 	// return this.http.get('https://us-central1-td-demo-df34d.cloudfunctions.net/test', 
	 	// {
    	// 	headers: authHeader
  		// })
	}



	firebaseFileUpload(myFileURL)
	{


	 	let authHeader = new Headers();
	   	console.log( 'File URL form srvice = '+myFileURL);

		authHeader.append('Authorization',myFileURL);

		
	   this.mFileURL=myFileURL

	 	return this.http.get('https://us-central1-td-demo-df34d.cloudfunctions.net/testFileUpload',
		 {
			 headers: authHeader
		 })
	}

}