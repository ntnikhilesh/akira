import { Component, OnInit } from '@angular/core';

import { AfoListObservable, AngularFireOffline } from 'angularfire2-offline';
import {FirebaseService} from '../../services/firebase.service';

import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'app-filelistings',
  templateUrl: './filelistings.component.html',
  styleUrls: ['./filelistings.component.css']
})
export class FilelistingsComponent implements OnInit {

  	mFileListings:any;
    userToken: any;
  mflag: any;
    error: any;

  constructor(private firebaseService:FirebaseService,public af: AngularFire,private localStorageService: LocalStorageService,public router: Router) { }

  ngOnInit() {


 this.mflag = navigator.onLine;
    this.localStorageService.clearAll;
    if (this.mflag) {
      console.log("User is online....")
      this.getUserToken();
    }
    else {
      console.log("User is offline...")
      alert("Please check you internet connection...")
    }
  


  this.firebaseService.getFileListings().subscribe(filelistings=>{
  console.log(filelistings);
  this.mFileListings=filelistings;
  }); 
}



 getUserToken() 
  {

    this.af.auth.subscribe(auth => {
      if (auth) {
        //console.log('logged in');

        firebase.auth().currentUser.getToken().then((idToken) => {

          //console.log("id token in BC1"+idToken);
          this.userToken = idToken;

        })
          .catch((error) => {
            //alert("Please check your internet connection..")
            this.error = error;
            console.log(this.error);
          });

      }
      else {
        console.log('not logged in');
        this.router.navigate(['login']);
      }
    });


  }


}
