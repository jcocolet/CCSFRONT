import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType, Response } from '@angular/http';
import { Api } from '../../../../servicios/api';
import { Constants } from '../../../../utiles/constants';

@Injectable()
export class CgClaseCreditoService {
    private url: Constants;
  constructor(private api: Api) {
  }

  getRegionesEstatus() {
  	return this.api.get(Constants.GET_LC_REGN_ESTS_NR,null, null).map(res => res.json());
  }
}
