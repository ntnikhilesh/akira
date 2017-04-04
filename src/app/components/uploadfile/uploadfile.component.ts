import { Component, OnInit } from '@angular/core';

import { AngularFire } from 'angularfire2';

import { LocalStorageService } from 'angular-2-local-storage';

import { Http, Response } from '@angular/http';
import { Test } from '../../providers/test.service';

import * as firebase from 'firebase';
import { Router } from "@angular/router";

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
  providers: [Test]
})
export class UploadfileComponent implements OnInit {

  image: any;



  title = 'Billing';
  result: any;

  userToken: any;
  flag: any;
  error: any;
  fileUploadStatus: any;
  mflag: any;

  constructor(private firebaseService: FirebaseService, public af: AngularFire, private localStorageService: LocalStorageService, private http: Http, public provider: Test, public router: Router) { }


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


  uploadFile() {

    this.mflag = navigator.onLine;
    if (this.mflag) {
      console.log("User is online....")


      let listing =
        {

        }

      console.log("data1=" + listing);
      this.firebaseService.uploadCSV(listing).then(successMessage => {
        console.log(successMessage);
        if (!successMessage) {

          this.result = "You are offline...pl check your nw conn...";

        }
        else {
          // this.result="You are offline...pl check your nw conn...";
          console.log("item in 123", successMessage)

          this.firebaseService.addInDB(successMessage)
          {

          }



        }

      }).catch(e => {
        this.result = "Please select file..";
        console.log("Error Found buddy Yoyo");
        console.log(e)
      });


    }
    else {
      console.log("User is offline...")
      alert("Please check you internet connection...")
    }

  }




 logout() {
    //this.setFlag();
    this.af.auth.logout();
    console.log('Logout succ..');
    this.router.navigate(['login']);
  }




}
