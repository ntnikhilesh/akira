import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-sedenav',
  templateUrl: './test-sedenav.component.html',
  styleUrls: ['./test-sedenav.component.css']
})
export class TestSedenavComponent implements OnInit {

  color = 'praimry';
  mode = 'determinate';
  value = 50;

  constructor() { }

  ngOnInit() {
  }

}
