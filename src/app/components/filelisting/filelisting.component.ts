import { Component, OnInit } from '@angular/core';

import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {AngularFire} from 'angularfire2';

import * as firebase from 'firebase';
import {Test} from '../../providers/test.service';


@Component({
  selector: 'app-filelisting',
  templateUrl: './filelisting.component.html',
  styleUrls: ['./filelisting.component.css'],
  providers: [Test]
  
})
export class FilelistingComponent implements OnInit {

  id:any;
	listing:any;
	imageUrl:any;
	path:string;
result:any;
userToken:any;
error:any;
mflag:any;


  	constructor
 	(
		private firebaseService:FirebaseService,
		private router:Router,
		private route:ActivatedRoute,
    public provider:Test,
    public af:AngularFire
  	) { }

  	ngOnInit() 
  	{ 
		//Get ID from URL
    this.getmUserToken();

		this.id=this.route.snapshot.params['id'];
		this.firebaseService.getFileDetails(this.id).subscribe(listing=>
		{
			this.listing=listing;
			

			console.log(listing);  
      //this.getUserToken();
			
			// let storageRef=firebase.storage().ref();
			// let spaceRef=storageRef.child(this.listing.path);

			// storageRef.child(this.listing.path).getDownloadURL().then((url)=>
			// {
				
			// 	this.imageUrl=url;
			// }).catch((error)=>
			// {
			// 	console.log(error);
			// });

		});

  	}


getmUserToken()
{

    this.mflag = navigator.onLine;
    if (this.mflag) {
      console.log("User is online....")


      // firebase.auth().currentUser.getToken(true).then((idToken) => 
      //     {
        this.firebaseService.getJWTToken().then(idToken => {

            if(idToken)
            {
              console.log("Id token in BC123=",idToken)

              this.userToken=idToken;
            }
            else{
              console.log("Not able to generate token...")
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

  //    getUserToken()
  // {

  //     this.af.auth.subscribe(auth => 
  //     {
  //       if(auth) 
  //       {
  //         //console.log('logged in');

  //         firebase.auth().currentUser.getToken(true).then((idToken) => 
  //         {
    
  //           //console.log("id token in BC1"+idToken);
  //           this.userToken=idToken;
    
  //         })
  //         .catch((error) => 
  //         {  
  //           this.error = error;
  //           console.log(this.error);
  //         });

  //       } 
  //       else 
  //       {
  //         console.log('not logged in');
  //         this.router.navigate(['login']);
  //       }
  //     });

  
  // }


hitCF()
{
   this.mflag = navigator.onLine;
    if (this.mflag) {
      console.log("User is online....")


     
        // this.getUserToken();

        //get idToken

       

      
          // this.result="You are offline...pl check your nw conn...";
          console.log("item in BC636" + this.listing.imageUrl)


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
    else {
      console.log("User is offline...")
      alert("Please check you internet connection...")
    }
}

  	// updateItem()
  	// {	
  	// 	console.log(this.id);
  	// 	this.id=this.route.snapshot.params['id'];
  	// 	this.firebaseService.updateoListing(this.id);
  		
  	// }

  	// deleteoItem()
  	// {
  	// 	console.log('offline id'+this.id);
  	// 	this.id=this.route.snapshot.params['id'];
  	// 	this.firebaseService.deleteoListing(this.id);
  	// } 


}
