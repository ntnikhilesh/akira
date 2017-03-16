import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

import { LocalStorageService } from 'angular-2-local-storage';
declare var $:any;
//declare var userID:any;

@Injectable()
export class Test {
userID:any;
  constructor( private http: Http,private localStorageService: LocalStorageService) {


 }




firebase(){
this.userID=this.getUserID('user-key');
//let params = 'nt1';
	return this.http.get("https://us-central1-td-demo-df34d.cloudfunctions.net/helloWorld?id=" + this.userID);
}
getUserID(key) 
      {
          console.log('User ID='+this.localStorageService.get(key));
          return this.localStorageService.get(key);
      }

}