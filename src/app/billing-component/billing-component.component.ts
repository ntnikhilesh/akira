import { Component, OnInit } from '@angular/core';

import {Weg} from './../models/weg';
import {WegService} from './../services/weg.service';

import {AngularFire} from 'angularfire2';

import { LocalStorageService } from 'angular-2-local-storage';

import { Http, Response } from '@angular/http';
import {Test} from './../providers/test.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-billing-component',
  templateUrl: './billing-component.component.html',
  styleUrls: ['./billing-component.component.css'],
  providers: [Test]
})
export class BillingComponentComponent implements OnInit {
title='Billing';
result:any;
weg:Weg[];
userID:any;
flag:any;

  constructor(private wegService:WegService,public af:AngularFire,private localStorageService: LocalStorageService,private http: Http,public provider:Test) { }

  ngOnInit() {
  this.userID=firebase.auth().currentUser.uid;
  this.flag=this.getFlag();
  this.checkBrowser();
  this.getWeg();
  this.executeCF(this.userID,this.flag);
  }

  getWeg():void {
 this.wegService.getWeg().then(weg=>this.weg=weg);
 }

 logout()
{
        this.setFlag();
        this.af.auth.logout();
        console.log('Logout succ..');
}

setFlag() 
      {
          return this.localStorageService.set("flag", 1);
      }

checkBrowser()
{
  if(this.localStorageService.isSupported) {
  console.log('yes i support Local storage');
    //...
  }
}

/*getUserID(key) 
      {
          console.log('User ID BC='+this.localStorageService.get(key));
          return this.localStorageService.get(key);
      }*/

      getFlag() 
      {
          console.log('Falg in BC='+this.localStorageService.get("flag"));
          return this.localStorageService.get("flag");
      }



      executeCF(uid,flag)
      {
        console.log(uid+"------"+flag);
        var hai= this.provider.firebase1(uid,flag)
        .map(
        res=>
        {
        console.log("1 -"+res.text());
        this.result=res.text();
        }
        )
        .subscribe
        (
          data=> 
          {
            console.log(data);
            //this.result=data;


          },
          err=>
          {
            console.log(err);
          },
          () => 
          { 
          console.log("done") 
          }
        );
      }



      executeURL()
      {


        var hai= this.provider.firebase()
        .map(
        res=>
        {
        console.log("1 -"+res.text());
        this.result=res.text();
        }
        )
        .subscribe
        (
          data=> 
          {
            console.log(data);
            //this.result=data;


          },
          err=>
          {
            console.log(err);
          },
          () => 
          { 
          console.log("done") 
          }
        );
     
    
      }

     

}
