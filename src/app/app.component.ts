import { Component } from '@angular/core';
import { OnlineService } from './servicios/online.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="container pt-4">
      <router-outlet></router-outlet>
  </div>`,
  providers:[ ]
})
export class AppComponent {
	constructor(private onlineService: OnlineService) {
		//this.onlineService.iniciar();
	}
}