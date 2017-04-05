import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {
  }

  logout() {
    //this.setFlag();
    this.af.auth.logout();
    console.log('Logout succ..');
    //this.router.navigate(['login']);
  }

}
