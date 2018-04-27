import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
  	<main class="border border-dark rounded-bottom">
  		<router-outlet></router-outlet>
	  </main>
  `,
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
