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
export class BillingComponentComponent implements OnInit 
{
  title='Billing';
  result:any;
  weg:Weg[];
  userToken:any;
  flag:any;
  error:any;

  constructor(private wegService:WegService,public af:AngularFire,private localStorageService: LocalStorageService,private http: Http,public provider:Test) { }

  ngOnInit() 
  {
  
    this.getUserToken();
 
  }

  getUserToken()
  {
    firebase.auth().currentUser.getToken(true).then((idToken) => 
    {
    
      console.log("id token in BC1"+idToken);
      this.userToken=idToken;
    
    })
    .catch((error) => 
    {
        this.error = error;
        console.log(this.error);
    });
  }

 logout()
  { 
        //this.setFlag();
        this.af.auth.logout();
        console.log('Logout succ..');
  }


checkBrowser()
{
  if(this.localStorageService.isSupported) 
  {
    console.log('yes i support Local storage');
    //...
   }
}
 executeURL(event,midToken)
  {
      event.preventDefault();
         var hai= this.provider.firebase(midToken)
        .map(
        res=>
        {
            console.log("Result in BC= "+res.text());
            this.result=res.text();
        }
        )
         .subscribe
         (
            data => console.log(data),
            err => console.log(err),
            () => console.log('Done')
         );
          

   }



}
