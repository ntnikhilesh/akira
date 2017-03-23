import { Component, OnInit } from '@angular/core';

import {Weg} from './../models/weg';
import {WegService} from './../services/weg.service';

import {AngularFire} from 'angularfire2';

import { LocalStorageService } from 'angular-2-local-storage';

import { Http, Response } from '@angular/http';
import {Test} from './../providers/test.service';

import * as firebase from 'firebase';
import {Router} from "@angular/router";

import {FirebaseService} from './../services/firebase.service';

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
  fileUploadStatus:any;

  constructor(private firebaseService:FirebaseService,private wegService:WegService,public af:AngularFire,private localStorageService: LocalStorageService,private http: Http,public provider:Test,public router: Router) { }

  ngOnInit() 
  {
  
    this.getUserToken();
 
  }

  getUserToken()
  {

      this.af.auth.subscribe(auth => 
      {
        if(auth) 
        {
          //console.log('logged in');

          firebase.auth().currentUser.getToken(true).then((idToken) => 
          {
    
            //console.log("id token in BC1"+idToken);
            this.userToken=idToken;
    
          })
          .catch((error) => 
          {  
            this.error = error;
            console.log(this.error);
          });

        } 
        else 
        {
          console.log('not logged in');
          this.router.navigate(['login']);
        }
      });

  
  }


onAddSubmit()
{

  let listing=
  		{

  		
  		}
      console.log("hi from submit")

      this.firebaseService.oaddListing(listing).then(successMessage => {
        console.log(successMessage);
        if(successMessage)
        {
            var hai= this.provider.firebaseFileUpload()
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
        else{
          this.result="You are offline...pl check your nw conn...";
        }
   
}).catch(e=>{
  this.result="Please select file..";
  console.log("Error Found buddy Yoyo");
  console.log(e)
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
