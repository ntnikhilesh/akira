import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

import * as firebase from 'firebase';
import { Test } from '../../providers/test.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'app-filelisting',
  templateUrl: './filelisting.component.html',
  styleUrls: ['./filelisting.component.css'],
  providers: [Test]

})
export class FilelistingComponent implements OnInit {

  id: any;
  listing: any;
  imageUrl: any;
  path: string;
  result: any;
  userToken: any;
  error: any;
  mflag: any;


  constructor
    (
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    public provider: Test,
    public af: AngularFire,
    private localStorageService: LocalStorageService
    ) { }

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
    //Get ID from URL
    //this.getmUserToken();

    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getFileDetails(this.id).subscribe(listing => {
      this.listing = listing;


      console.log(listing);


    });

  }


  getUserToken() {

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





  hitCF() {
    this.mflag = navigator.onLine;
    if (this.mflag) {
      console.log("User is online....")


      // this.result="You are offline...pl check your nw conn...";
      console.log("item in BC636", this.listing.imageUrl)

      firebase.auth().currentUser.getToken().then((idToken) => {

        console.log("TOken in listing=", idToken)

        if (idToken) {

          this.firebaseService.hitCF(idToken, this.listing.imageUrl, 1).map(
            res => {
              console.log("Result in BC1221= " + res.text());
              this.result = res.text();
            }
          )
            .subscribe
            (
            data => console.log(data),
            err => console.log(err),
            () => console.log('Done')
            );




        }




      }).catch((error) => {
        this.error = error;
        console.log("Listing error :", this.error);
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
