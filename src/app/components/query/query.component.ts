import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

import * as firebase from 'firebase';
import { Test } from '../../providers/test.service';


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

 favoriteSeason: string;
 id: any;
  listing: any;
  imageUrl: any;
  path: string;
  result: any;
  userToken: any;
  error: any;
  mflag: any;

  seasons = [
    'Select All Documents in a Collection',
    'selects from the inventory collection all documents where the MRP equals "75"',
    'retrieves all documents from the inventory collection where MRP equals either "75" or "25"',
    'retrieves all documents in the inventory collection where the Item-Name equals "7 UP PET 250ML" and MRP is less than ($lt) 30',
    'retrieves all documents in the collection where the Item-Name equals "7 UP PET 250ML" or MRP is less than ($lt) 30',
    
  ];
  constructor(
      private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    public provider: Test,
    public af: AngularFire
  )
   { }

  ngOnInit() {
    
  }


    hitCF() {
    this.mflag = navigator.onLine;
    if (this.mflag) {
      console.log("User is online....")


      // this.result="You are offline...pl check your nw conn...";
     // console.log("item in BC636", this.listing.imageUrl)

      firebase.auth().currentUser.getToken().then((idToken) => 
      {

        console.log("TOken in listing=", idToken)

        if (idToken) 
        {

          this.firebaseService.hitCF(idToken,"not require",2).map(
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

}
