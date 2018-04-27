import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable()
export class OnlineService {
	private estaAplicacionOnline: boolean = undefined;
	iniciar() {
		let timer = Observable.timer(500,500);
		timer.subscribe((data)=>{
			this.estaAplicacionOnline = navigator.onLine;
		});
	}

	estaOnline(): boolean {
		return this.estaAplicacionOnline;
	}
}