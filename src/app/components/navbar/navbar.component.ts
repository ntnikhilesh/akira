import { Component, OnInit } from '@angular/core';

import { AngularFire } from 'angularfire2';

import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public af:AngularFire ,public router:Router) { }

  ngOnInit() {
  }



  logout() {
    //this.setFlag();
    this.af.auth.logout();
    console.log('Logout succ..');
    this.router.navigate(['login']);
  }
}
