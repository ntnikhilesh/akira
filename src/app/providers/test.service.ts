import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

import * as firebase from 'firebase';

import { LocalStorageService } from 'angular-2-local-storage';
declare var $:any;
//declare var userID:any;

@Injectable()
export class Test {
userID:any;
flag:any;
  constructor( private http: Http,private localStorageService: LocalStorageService) {


 }
/*
 createAuthorizationHeader(headers: Headers) { 
   this.userID=this.getUserID('user-key');
 	headers.append('Authorization', 'Bearer' + btoa(this.userID)); 
 } */





firebase()
{

	let authHeader = new Headers();
	this.userID=firebase.auth().currentUser.uid;
	console.log('UID form srvice = '+this.userID);

	authHeader.append('Authorization', 'Bearer ' + this.userID);

	 return this.http.get('https://us-central1-td-demo-df34d.cloudfunctions.net/helloWorld', {
    headers: authHeader
  })
  





















	/*

	this.userID=firebase.auth().currentUser.uid;

//let params = 'nt1';
//let headers=new Headers();
//this.createAuthorizationHeader(headers);
	//return this.http.get("https://us-central1-td-demo-df34d.cloudfunctions.net/helloWorld?id=10" ,headers);


	//return this.http.get("https://us-central1-td-demo-df34d.cloudfunctions.net/authorizedHello");

	return this.http.get("https://us-central1-td-demo-df34d.cloudfunctions.net/helloWorld?id="+this.userID);

	*/


}


firebase1(uid,flag){

	this.userID=uid;
	this.flag=flag;

	console.log(this.userID+"from firebase1"+this.flag);
	console.log("FB UID= "+firebase.auth().currentUser.uid);

//let params = 'nt1';
//let headers=new Headers();
//this.createAuthorizationHeader(headers);
	//return this.http.get("https://us-central1-td-demo-df34d.cloudfunctions.net/helloWorld?id=10" ,headers);


	//return this.http.get("https://us-central1-td-demo-df34d.cloudfunctions.net/authorizedHello");
	this.setFlag();

	return this.http.get("https://us-central1-td-demo-df34d.cloudfunctions.net/helloWorld?id="+this.userID+"&flag="+this.flag);
	

}

getUserID(key) 
      {
          console.log('User ID='+this.localStorageService.get(key));
          return this.localStorageService.get(key);
      }

      setFlag() 
      {
          return this.localStorageService.set("flag", 2);
      }

}