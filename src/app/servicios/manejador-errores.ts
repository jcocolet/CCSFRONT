import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Constants } from '../utiles/constants';

@Injectable()
export class ManejadorErroresService {
	constructor(private alertService: AlertService) {

	}

	resuelveErroresServidor(code: number) {
		
		switch (code) {
			case Constants.ERROR_INTERNO_SERVIDOR:
				this.alertService.warn(''+code,null,null);
				break;
			default:
				this.alertService.warn('error_servidor',null,null);
				break;
		}
		setTimeout(()=>{
			this.alertService.clearMessage();
		},11000);
	}
}