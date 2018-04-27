import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../../servicios/api';
import { Constants } from '../../../../utiles/constants';

@Injectable()
export class DetalleReglaService {
	constructor(private api : Api) {
  	}

  	getDetallesRegla(idRegla: number) {
    return this.api.get(Constants.EVALUACION_TRAMITE+Constants.DIAGONAL+Constants.DETALLES_REGLA+
    	Constants.DIAGONAL+idRegla,{ cache: true}, null).map(res => res.json())
  	}
}