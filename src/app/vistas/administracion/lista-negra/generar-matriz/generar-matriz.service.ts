import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../../servicios/api';
import { Constants } from '../../../../utiles/constants';

@Injectable()
export class GenerarMatrizService {
	constructor(private api : Api) {
  	}

  	guardarMatriz(requestOptions: any) {
  		return this.api.post(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.GUARDAR_MATRICES,requestOptions,null).map(res => res.json());
  	}
}