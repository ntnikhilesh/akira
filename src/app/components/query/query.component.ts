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

 selectQuery: string;
 id: any;
  listing: any;
  imageUrl: any;
  path: string;
  result: any;
  userToken: any;
  error: any;
  mflag: any;
  mcode: any;

  seasons = [
    'Select All Documents in a Collection',
    'Select from the inventory collection all documents where the MRP equals 100',
    'Retrieves all documents from the inventory collection where MRP equals either 100 or 25',
    'Retrieves all documents in the inventory collection where the Item-Name equals 7 UP PET 250ML and MRP is less than 30',
    'Retrieves all documents in the collection where the Barcode equals 8901361301510 or MRP is less than 30',
    
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
        
        console.log("Token in Query =", idToken)
        console.log("Code in Query =", this.selectQuery)

        if(this.selectQuery=="Select All Documents in a Collection")
        {
          this.mcode=2;
        }
        else if(this.selectQuery=="Select from the inventory collection all documents where the MRP equals 100")
        {
          this.mcode=3;
        }
         else if(this.selectQuery=="Retrieves all documents from the inventory collection where MRP equals either 100 or 25")
        {
          this.mcode=4;
        }
         else if(this.selectQuery=="Retrieves all documents in the inventory collection where the Item-Name equals 7 UP PET 250ML and MRP is less than 30")
        {
          this.mcode=5;
        }
        else if(this.selectQuery=="Retrieves all documents in the collection where the Barcode equals 8901361301510 or MRP is less than 30")
        {
          this.mcode=6;
        }
        

        if (idToken) 
        {

          this.firebaseService.hitCF(idToken,"not require",this.mcode).map(
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
