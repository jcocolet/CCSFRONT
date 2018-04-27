import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../../servicios/api';
import { Constants } from '../../../../utiles/constants';

@Injectable()
export class AgruparComponentesService {

  constructor(private api : Api) { 
  }

  getComponentes(idFlujoDecision: number) {
      return this.api.get(Constants.AGRUPAR_COMPONENTES+Constants.DIAGONAL+
      Constants.COMPONENTES+Constants.DIAGONAL+
      idFlujoDecision,{ cache: true}, null).map(res => res.json());
  }
}