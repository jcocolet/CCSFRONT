import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../../servicios/api';

@Injectable()
export class AdminPlanesLibresService {

  constructor(private api: Api) { }
  
  getPlanesLibres() {
    return this.api.get('getEvaluacionTramite', null, null).map(res => res.json());
  }

  getCatalogosVista(requestOptions: any) {
    return this.api.get('getInformacion', null, null).map(res => res.json());
  }

}
