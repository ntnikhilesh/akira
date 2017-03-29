import { Component } from '@angular/core';

import {Weg} from './models/weg';
import {WegService} from './services/weg.service';




@Component({
  selector: 'app-root',
  templateUrl: './components/dashboard/dashboard.component.html',
  styleUrls: ['./components/dashboard/dashboard.component.css']
})
export class AppComponent {
  title = 'Hello Ravi';
weg:Weg[];


/* Consume weg service */
 constructor(private wegService:WegService){}

 ngOnInit():void{
 this.getWeg();
 }

 getWeg():void {
 this.wegService.getWeg().then(weg=>this.weg=weg);
 }

}
