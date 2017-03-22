import { Injectable } from '@angular/core';

import {AngularFire, FirebaseListObservable,FirebaseObjectObservable,AuthProviders, AuthMethods,} from 'angularfire2';

import { AfoListObservable,AfoObjectObservable, AngularFireOffline } from 'angularfire2-offline';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseService 
{
    listings:FirebaseListObservable<any[]>;
    olistings:AfoListObservable<any[]>;

    listing:FirebaseObjectObservable<any[]>;
    olisting:AfoObjectObservable<any>;

    folder:any;
    num:number;

    constructor(private af:AngularFire,
    private afo: AngularFireOffline) 
    { 
        this.folder='shopgro';
    }

   


    

     oaddListing(listing)
    {

    
    
    //this.num=this.num+1;

      //Create root ref
      console.log("hi from oaddListing fun")
      let storageRef=firebase.storage().ref();

      for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]])
      {
          console.log("hi from inside for")

        let path='/shopgro/'+Math.random();
        let iRef=storageRef.child(path);
        iRef.put(selectedFile).then((snapshot)=>
        {
           listing.image=selectedFile.name;
           listing.path=path;
           listing.imageUrl='CC';
           console.log('offline adding done...');
          
          // return " File uploaded succ..."
           //console.log(iRef.snapshot)
           //return this.olistings.push(listing);

        }); 



        //Monitor upload progress

        
        

      } 
      //return "Error..."

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

