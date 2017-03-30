import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

import * as firebase from 'firebase';
import { Test } from '../../providers/test.service';
import { Http, Response, URLSearchParams } from '@angular/http';
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
    public http:Http,
    public localStorageService:LocalStorageService

    ) { }

  ngOnInit() {
    //this.getUserToken();
    //Get ID from URL
    //this.getmUserToken();

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


      console.log(listing);


    });

  }


getUserToken() 
  {

    this.af.auth.subscribe(auth => {
      if (auth) {
        //console.log('logged in');

        firebase.auth().currentUser.getToken().then((idToken) => {

          console.log("id token in 101",idToken);
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


  hitCF() {
    this.mflag = navigator.onLine;
    if (this.mflag) {
      console.log("User is online....")


      // this.result="You are offline...pl check your nw conn...";
      console.log("item in BC636", this.listing.imageUrl)

      firebase.auth().currentUser.getToken(true).then((idToken) => 
      {

        console.log("TOken in listing=", idToken)

        if (idToken) 
        {



          // this.loadUsers(idToken)

          this.doSomething(idToken, data => {
            console.log("89");
            //this.result="123";
          });
          // console.log("555");
          // this.result="555"

          // this.firebaseService.hitCF(idToken, this.listing.imageUrl).map(
          //   res => {
          //     //console.log("Result in BC1221= " + res.text());
          //     //this.result = res.text();
          //   }
          // )
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


// loadUsers(mtoken) {

//   var mres:any;
// let data = new URLSearchParams();
// 		data.append('mytoken', mtoken);
// 		data.append('myurl', this.listing.imageUrl);
// 		console.log('token form srvice = ' + mtoken);
// 		console.log('File URL form srvice = ' +this.listing.imageUrl);
//   this.http
// 			.post('https://us-central1-td-demo-df34d.cloudfunctions.net/test', data)
//       .map((response) => {
//         console.log(response)
//     //return response.json();
//   }).subscribe
//             (
//             data => console.log(data),
//             err => console.log(err),
//             () => console.log('Done')
//             );
// }




 onAddSubmit1() 
  {

    this.mflag = navigator.onLine;
    if (this.mflag) {
      console.log("User is online....")


      let listing =
        {

        }

      console.log("data1=" + listing);
      this.firebaseService.testCF(listing).then(successMessage => {
        console.log(successMessage);
        if (!successMessage) {

          this.result = "You are offline...pl check your nw conn...";

        }
        else {
          // this.result="You are offline...pl check your nw conn...";
          console.log("file url131" + this.listing.imageUrl)
          //this.getUserToken();
         //this.userToken="eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyYjE1NjU1N2M5MTgwYTU5MzlkOGNiYTliOWNiOWMyZjNmYTFiZTEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGQtZGVtby1kZjM0ZCIsImF1ZCI6InRkLWRlbW8tZGYzNGQiLCJhdXRoX3RpbWUiOjE0OTA4ODE0NDksInVzZXJfaWQiOiI5dnJsbFppNnA0VVdpbjQwZGo2Y1NmSEFCZEozIiwic3ViIjoiOXZybGxaaTZwNFVXaW40MGRqNmNTZkhBQmRKMyIsImlhdCI6MTQ5MDg4NTM1NywiZXhwIjoxNDkwODg4OTU3LCJlbWFpbCI6IjEybnRuaWtoaWxlc2hAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEybnRuaWtoaWxlc2hAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.KgFqTpXEkO-8TsyJuVn4F72V_Aw9Gc2XBH5eH_Rh4WmnghUghcdpxNMix0oa5Ck5nI-KEETkO3nE4fp1RxrSIwglOdxX_LJCpuWueuHgGkww2xQTQaS2hFaNLJ47Cyf4XCnZHVmeYjaM12eH4pb8mAL12QK6v5GohiyBvnEhpfmYf7z6CjCaLuat6czqui4JPvt4IdA8gJ_EaRRhS92bC6qhuKppduXvVtm4h9j9uKzBgo8fbulmVKNfgIf1II2hSoW12ZkdfzSVb2cRQzQt8RiJgbCqu94euCdQjgaSTU3TITyMlqUJEo3mdf_1rfDLzRq7yZtqRN10USdLnogJEA"

          var hai = this.provider.firebase1(this.userToken, this.listing.imageUrl)
            .map(
            res => {
              console.log("Result in BC898= " + res.text());
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















doSomething(idToken,callback)
{
//callback(name)
   this.firebaseService.hitCF(idToken, this.listing.imageUrl).map(
            res => {
               callback("999")
              //console.log("Result in BC1221= " + res.text());
              //this.result = "145"
            }
          )
            .subscribe
            (
            data => console.log(data),
            err => console.log(err),
            () => console.log('Done')
            );
}

  executeURL(token, fillURL, callback) {
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
