import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
declare var $:any;

@Injectable()
export class Test {
  constructor( private http: Http) {

 }




firebase(){
	return this.http.get(`https://us-central1-td-demo-df34d.cloudfunctions.net/helloWorld`);
}

}