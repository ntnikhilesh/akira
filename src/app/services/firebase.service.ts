import { Injectable } from '@angular/core';

import {Http, Response} from '@angular/http';



import {AngularFire, FirebaseListObservable,FirebaseObjectObservable,AuthProviders, AuthMethods,} from 'angularfire2';

import { AfoListObservable,AfoObjectObservable, AngularFireOffline } from 'angularfire2-offline';

import * as firebase from 'firebase';

import {Router} from "@angular/router";

@Injectable()
export class FirebaseService 
{
    listings:FirebaseListObservable<any[]>;
    olistings:AfoListObservable<any[]>;

    listing:FirebaseObjectObservable<any[]>;
    olisting:AfoObjectObservable<any>;

    folder:any;
    num:number;
    fileUploadStatus:any;

    constructor(private router: Router,private http: Http,private af:AngularFire,
    private afo: AngularFireOffline) 
    { 
        this.folder='listingimages';
    }

    ngOnInit() 
  {
  
    //let mUploadFile;
 
  }

   






    myFirstPromise = new Promise((resolve, reject) => {
    
   
});



    

  // oaddListing(listing)
  // {

  //   return new Promise(function(resolve,reject)
  //   {
    



  //     // this.mUploadFile(function(result)
  //     //     {
  //     //       if(result)
  //     //       {
  //     //         resolve(result)
  //     //       }
  //     //       else{
  //     //         reject(false)
  //     //       }
  //     //       //response.send(result);
  //     //     })


      
  //   //this.num=this.num+1;

  //     //Create root ref
  //     console.log("hi from oaddListing fun")
  //     let storageRef=firebase.storage().ref();

  //     for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]])
  //     {
  //         console.log("hi from inside for")

  //       let path='/shopgro/'+Math.random();
  //       let iRef=storageRef.child(path);
  //       iRef.put(selectedFile).then((snapshot)=>
  //       {
  //          listing.image=selectedFile.name;
  //          listing.path=path;
  //          listing.imageUrl='CC';
  //          console.log('offline adding done...');
  //          resolve(true);
  //       }); 



       

        
        

  //     } 
  //    // reject(false);

  
  //   })
  // }





oaddListing(listing) {

return new Promise(function (resolve, reject) {


//Create root ref
console.log("hi from oaddListing fun")
let storageRef = firebase.storage().ref();

for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
console.log("hi from inside for")

let path = '/shopgro-data/' + Math.random();
let iRef = storageRef.child(path);
iRef.put(selectedFile).then((snapshot) => {
listing.image = selectedFile.name;
listing.path = path;
listing.imageUrl = 'CC';
console.log('offline adding done...');
console.log(snapshot);
if(snapshot['f']==="success") {
console.log("Sucess Upload Dude");
resolve(snapshot)
}
else {
console.log("Failure");
reject(snapshot)
}
}).catch(e=>{
  console.log("NetWork Error",e);
})

}


})
}






mUploadFile(callback)
{
      console.log("hi from oaddListing fun")
      let storageRef=firebase.storage().ref();

      for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]])
      {
          console.log("hi from inside for")

        let path='/shopgro/'+Math.random();
        let iRef=storageRef.child(path);
        iRef.put(selectedFile).then((snapshot)=>
        {
           //listing.image=selectedFile.name;
           //listing.path=path;
           //listing.imageUrl='CC';
           console.log('offline adding done...');
           callback(true)
        }); 
      }
}

  	firebaseFileUpload()
	{

    console.log("hi form file upload")
	 	//let authHeader = new Headers();
	   	//console.log( 'token form srvice = '+mtoken);

		//authHeader.append('Authorization',"11ssd");

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

