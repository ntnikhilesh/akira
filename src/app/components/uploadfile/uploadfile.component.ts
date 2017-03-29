import { Component, OnInit } from '@angular/core';

import {AngularFire} from 'angularfire2';

import { LocalStorageService } from 'angular-2-local-storage';

import { Http, Response } from '@angular/http';
import {Test} from '../../providers/test.service';

import * as firebase from 'firebase';
import {Router} from "@angular/router";

import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
  providers: [Test]
})
export class UploadfileComponent implements OnInit {

   image:any;



  title='Billing';
  result:any;

  userToken:any;
  flag:any;
  error:any;
  fileUploadStatus:any;

  constructor(private firebaseService:FirebaseService,public af:AngularFire,private localStorageService: LocalStorageService,private http: Http,public provider:Test,public router: Router) { }


  ngOnInit() {
  }


    onAddSubmit1()
  {

    


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
        //  // this.result="You are offline...pl check your nw conn...";
        //  console.log("item in BC",successMessage)
        //    var hai= this.provider.firebaseFileUpload()
        // .map(
        // res=>
        // {
        //     console.log("Result in BC= ",res.text());
        //     this.result=res.text();
        // }
        // )
        //  .subscribe
        //  (
        //     data => console.log(data),
        //     err => console.log(err),
        //     () => console.log('Done')
        //  );


          this.firebaseService.oaddInDB(successMessage)
          {

          }

        }
   
}).catch(e=>{
  this.result="Please select file..";
  console.log("Error Found buddy Yoyo");
  console.log(e)
});

  }

}