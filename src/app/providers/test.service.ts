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

}