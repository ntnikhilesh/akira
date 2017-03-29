import { Component, OnInit } from '@angular/core';

import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-filelisting',
  templateUrl: './filelisting.component.html',
  styleUrls: ['./filelisting.component.css']
})
export class FilelistingComponent implements OnInit {

  id:any;
	listing:any;
	imageUrl:any;
	path:string;



  	constructor
 	(
		private firebaseService:FirebaseService,
		private router:Router,
		private route:ActivatedRoute
  	) { }

  	ngOnInit() 
  	{ 
		//Get ID from URL

		this.id=this.route.snapshot.params['id'];
		this.firebaseService.getoListingDetails(this.id).subscribe(listing=>
		{
			this.listing=listing;
			

			console.log(listing);  

			
			let storageRef=firebase.storage().ref();
			let spaceRef=storageRef.child(this.listing.path);

			// storageRef.child(this.listing.path).getDownloadURL().then((url)=>
			// {
				
			// 	this.imageUrl=url;
			// }).catch((error)=>
			// {
			// 	console.log(error);
			// });

		});

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
