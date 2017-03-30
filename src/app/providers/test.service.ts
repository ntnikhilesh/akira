import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods, } from 'angularfire2';

import * as firebase from 'firebase';

import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";

import * as admin from "firebase-admin";
declare var $: any;

//declare var userID:any;

@Injectable()
export class Test {
	userID: any;
	flag: any;
	mFileURL: any;
	userToken:any;
	error:any;
	constructor(
		private http: Http,
		public router:Router,
		public af:AngularFire,
		 private localStorageService: LocalStorageService)
	{ }





	firebase1(mtoken, mfileURL) {

		//this.getUserToken();
		//console.log("demo token-",firebase.auth().currentUser.getToken)
          

		let data = new URLSearchParams();
		data.append('mytoken', mtoken);
		data.append('myurl', mfileURL);
		console.log('token form srvice = ' + mtoken);
		console.log('File URL form srvice = ' + mfileURL);


		return this.http
			.post('https://us-central1-td-demo-df34d.cloudfunctions.net/test', data)

	}



	// getUserToken() 
  // {

  //   this.af.auth.subscribe(auth => {
  //     if (auth) {
  //       //console.log('logged in');

  //       firebase.auth().currentUser.getToken().then((idToken) => {

  //         console.log("id token in 1001",idToken);
  //         this.userToken = idToken;

  //       })
  //         .catch((error) => {
  //           this.error = error;
  //           console.log(this.error);
  //         });

  //     }
  //     else {
  //       console.log('not logged in');
  //       this.router.navigate(['login']);
  //     }
  //   });


  // }


		firebaseFileUpload()
	{


	 	//let authHeader = new Headers();
	   	//console.log( 'token form srvice = '+mtoken);

		//authHeader.append('Authorization',"11ssd");

	 	return this.http.get('https://us-central1-td-demo-df34d.cloudfunctions.net/testFileUpload')
	}



// 	  getStringFromWebServerAsync(mtoken: string,mfileURL:string) {
//     return new Promise<string>((resolve, reject) => {
//         // note: could be written `$.get(url).done(resolve).fail(reject);`,
//         //       but I expanded it out for clarity

// 		let data = new URLSearchParams();
// 		data.append('mytoken', mtoken);
// 		data.append('myurl', mfileURL);
// 		console.log('token form srvice = ' + mtoken);
// 		console.log('File URL form srvice = ' + mfileURL);
//         $.post('https://us-central1-td-demo-df34d.cloudfunctions.net/test',data).done((data) => {
//             resolve(data);
//         }).fail((err) => {
//             reject(err);
//         });
//     });
// }




}