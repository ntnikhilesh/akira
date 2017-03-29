import { Component, OnInit } from '@angular/core';

import {AngularFire} from 'angularfire2';

import {FirebaseService} from '../../services/firebase.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error: any;
  constructor(public af:AngularFire,public afService: FirebaseService, private router: Router) {}

  ngOnInit() 
  {
    this.checkAuth();
  }


  checkAuth()
  {
       this.af.auth.subscribe(auth => 
       {
        if(auth) 
        {
          //console.log('logged in');
           this.router.navigate(['filelistings']);
      

        } else 
        {
          console.log('not logged in');
        }
      });
  }
 



  loginWithEmail(event, email, password)
  {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => 
    {
      this.router.navigate(['filelistings']);
    })
      .catch((error: any) => 
      {
        if (error) 
        {
          this.error = error;
          console.log(this.error);
        }
      });
  }

}
