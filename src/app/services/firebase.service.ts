import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';



import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods, } from 'angularfire2';

import { AfoListObservable, AfoObjectObservable, AngularFireOffline } from 'angularfire2-offline';

import * as firebase from 'firebase';

import { Router } from "@angular/router";

@Injectable()
export class FirebaseService {
 public listings: FirebaseListObservable<any[]>;
  olistings: AfoListObservable<any[]>;

  listing: FirebaseObjectObservable<any[]>;
  olisting: AfoObjectObservable<any>;

  images: FirebaseListObservable<any[]>

  folder: any;
  num: number;
  fileUploadStatus: any;

  constructor(private router: Router, private http: Http, private af: AngularFire,
    private afo: AngularFireOffline) {
    //this.folder='listingimages';
    this.images = this.af.database.list('shopgro-DB') as FirebaseListObservable<Images[]>
    this.folder = 'demo-folder1';
    this.listings = this.af.database.list('/shopgro-DB')as FirebaseListObservable<Listings[]>;
    
  }

  ngOnInit() {

    //let mUploadFile;

  }








  myFirstPromise = new Promise((resolve, reject) => {


  });





 




  oaddListing1(listing) {


    return new Promise(function (resolve, reject) {
      console.log("hi from oaddListing fun")
      let storageRef = firebase.storage().ref();

      //var self=this;
      for (let selectedFile of [(<HTMLInputElement>document.getElementById('image1')).files[0]]) {


        let path = '/shopgro-storage/' + Math.random();
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          console.log("hi from inside for")
         
          listing.image = selectedFile.name;
          listing.path = path;
          listing.imageUrl = snapshot.downloadURL;
          console.log('offline adding done...');

          console.log(listing)
          console.log(snapshot.downloadURL);
          //this.listings.push(listing);
          if (snapshot['f'] === "success") {
            console.log("Sucess Upload Dude");
            resolve(listing)
          }
          else {
            console.log("Failure");
            reject(false)
          }



        }).catch(function (e) {
          console.log("merror=" + e);
        });

      }

    })
  }




oaddInDB(listing)
{
  console.log("Item added in BD as well")
  this.listings.push(listing);

}


 

  firebaseFileUpload() {

    console.log("hi form file upload")
  

    return this.http.get('https://us-central1-td-demo-df34d.cloudfunctions.net/testFileUpload')

  }






























  // Start email/pass auth

  /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log(email)
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }




  /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + uid).set({
      name: name,
      email: email,


    });
  }





  /**
 * Logs the user in using their Email/Password combo
 * @param email
 * @param password
 * @returns {firebase.Promise<FirebaseAuthState>}
 */
  loginWithEmail(email, password) {
    return this.af.auth.login({
      email: email,
      password: password,
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }



  //end email/pass auth





}

interface Listings {
  // $key?:string;
  // name?:string;
  // category?:string;
  path?: string;
  image?: string;
  imageUrl?: string;


  // price?:string;

}
interface Images {
  name?: string;
}
