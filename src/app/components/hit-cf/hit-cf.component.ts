import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

import * as firebase from 'firebase';
import { Test } from '../../providers/test.service';
import { Http, Response, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-hit-cf',
  templateUrl: './hit-cf.component.html',
  styleUrls: ['./hit-cf.component.css']
})
export class HitCFComponent implements OnInit {

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
    public http:Http,
    public localStorageService:LocalStorageService

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

    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getFileDetails(this.id).subscribe(listing => {
      this.listing = listing;


      console.log("file detain from hit cf-",listing);


    });


    var hai = this.provider.firebase1(this.userToken, this.listing.imageUrl)
            .map(
            res => {
              console.log("Result in BC= " + res.text());
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







 getUserToken() 
  {

    this.af.auth.subscribe(auth => {
      if (auth) {
        //console.log('logged in');

        firebase.auth().currentUser.getToken(true).then((idToken) => {

          //console.log("id token in BC1"+idToken);
          this.userToken = idToken;

        })
          .catch((error) => {
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
