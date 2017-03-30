import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

import * as firebase from 'firebase';
import { Test } from '../../providers/test.service';


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
    public af: AngularFire
    ) { }

  ngOnInit() {
    //Get ID from URL
    //this.getmUserToken();

    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getFileDetails(this.id).subscribe(listing => {
      this.listing = listing;


      console.log(listing);


    });

  }





  hitCF() {
    this.mflag = navigator.onLine;
    if (this.mflag) {
      console.log("User is online....")



      // this.getUserToken();

      //get idToken




      // this.result="You are offline...pl check your nw conn...";
      console.log("item in BC636", this.listing.imageUrl)

      firebase.auth().currentUser.getToken(true).then((idToken) => {

        console.log("TOken in listing=", idToken)

        if (idToken) {

        this.executeURL(idToken,this.listing.imageUrl, function (result) {
        console.log("final result=",result);
      })

//
          // var hai = this.provider.firebase1(idToken, this.listing.imageUrl)
          //   .map(
          //   res => {
          //     console.log("Result in BC= " + res.text());
          //     this.result = res.text();
          //   }
          //   )
          //   .subscribe
          //   (
          //   data => console.log(data),
          //   err => console.log(err),
          //   () => console.log('Done')
          //   );

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


   executeURL(token,fillURL, callback) {
   console.log("f3")
   //callback("done dude..")
   var hai = this.provider.firebase1(token, fillURL)
            .map(
            res => {
              console.log("Result in listing= " + res.text());
              this.result = res.text();
              callback(this.result)
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
