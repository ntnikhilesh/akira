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



 image:any;



  title='Billing';
  result:any;
  weg:Weg[];
  userToken:any;
  mflag:any;
  error:any;
  fileUploadStatus:any;
  mFileURL:any;

  constructor(private firebaseService:FirebaseService,private wegService:WegService,public af:AngularFire,private localStorageService: LocalStorageService,private http: Http,public provider:Test,public router: Router) { }

  ngOnInit() 
  {
    this.mflag =navigator.onLine;
    this.localStorageService.clearAll;
    if(this.mflag)
    {
      console.log("User is online....")
      this.getUserToken();
    }
    else{
      console.log("User is offline...")
      alert("Please check you internet connection...")
    }
    


    
 
  }


// ngAfterViewChecked()
// {

//   console.log("ID in BC="+this.localStorageService.get("fileID1"));
//   if(this.localStorageService.get("fileID1")!=null)
//   {
//     console.log("I have ID")
//   }

  
// }

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


  onAddSubmit1()
  {

      this.mflag =navigator.onLine;
    if(this.mflag)
    {
      console.log("User is online....")
      
    
    


  		console.log('offline adding1');

  		//console.log(this.title);


  		let listing=
  		{

  		}
  		
  		console.log("data1="+listing);
  	  this.firebaseService.oaddListing1(listing).then(successMessage => {
        console.log(successMessage);
        if(!successMessage)
        {

          this.result="You are offline...pl check your nw conn...";
          
        }
        else{
         // this.result="You are offline...pl check your nw conn...";
         console.log("item in BC21"+successMessage)
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


          this.mFileURL=this.firebaseService.oaddInDB(successMessage)
          //console.log("Object Key in BC"+this.mFileURL)
          
          
          

        }
   
}).catch(e=>{
  this.result="Please select file..";
  console.log("Error Found buddy Yoyo");
  console.log(e)
});


}
    else{
      console.log("User is offline...")
      alert("Please check you internet connection...")
    }

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


       this.mflag =navigator.onLine;
    if(this.mflag)
    {
      console.log("User is online....")
     
    


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
    else{
      console.log("User is offline...")
      alert("Please check you internet connection...")
    }
          

   }



}
