import { Component, OnInit } from '@angular/core';

import { AfoListObservable, AngularFireOffline } from 'angularfire2-offline';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-filelistings',
  templateUrl: './filelistings.component.html',
  styleUrls: ['./filelistings.component.css']
})
export class FilelistingsComponent implements OnInit {

  	mFileListings:any;

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
  this.firebaseService.getFileListings().subscribe(filelistings=>{
  console.log(filelistings);
  this.mFileListings=filelistings;
  }); 
  }

}
