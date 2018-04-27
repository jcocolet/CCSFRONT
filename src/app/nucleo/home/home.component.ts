import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  	<app-header></app-header>
  	<app-menu-bar></app-menu-bar>
  	<app-main></app-main>
	<app-footer></app-footer>
  `
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  }

}
