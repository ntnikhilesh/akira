import { Component, OnInit } from '@angular/core';

import {FirebaseService} from './../services/firebase.service';
import {Router} from "@angular/router";

import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {

  public error: any;
  constructor(private afService: FirebaseService, private router: Router,private localStorageService: LocalStorageService) { }
	//registers the user and logs them in
  register(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
    //this.submitID('user-key',user.uid);
    this.setFlag();
    console.log(user.uid);
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {

        this.router.navigate(['billing']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }


  /*submitID(key, val) 
      {
          return this.localStorageService.set(key, val);
      } */

      setFlag() 
      {
          return this.localStorageService.set("flag", 1);
      }


}