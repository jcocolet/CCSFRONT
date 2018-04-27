import { Injectable } from '@angular/core';
import { Api } from '../../../servicios/api';
import { Constants } from '../../../utiles/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class RangoEquipoService {
  constructor(private api: Api) { }

  getClaseCredito(idRegion: number) {
    return this.api.get(Constants.GET_CGCLASECREDITO + '/' + idRegion, null, null).map(res => res.json());
  }
  getEstatusRegistro() {
    return this.api.get(Constants.GET_CGESTATUSREGISTRO, null, null).map(res => res.json());
  }
  getAccionClave(parametros) {
    return this.api.get(Constants.GET_ACCIONCLAVE + '/' + parametros, null, null).map(res => res.json());
  }
  getAccionRespuesta(parametros) {
    return this.api.get(Constants.GET_ACCIONRESPUESTA + '/' + parametros, null, null).map(res => res.json());
  }
  getCategoria(parametros: any) {
    return this.api.get(Constants.GET_CGCATEGORIAA + '/' + parametros, null, null).map(res => res.json());
  }
  getBusqueda(parametros: any) {
    return this.api.post(Constants.GET_BUSQUEDARANGOEQUIPO, parametros, null).map(res => res.json());
  }
  crearMatriz(parametros: any) {
    return this.api.post(Constants.CREAR_MATRIZ, parametros, null).map(res => res.json());
  }
  crearRegla(parametros: any) {
    return this.api.post(Constants.PUT_CREAR_REGLA , parametros, null).map(res => res.json());
  }
  getRangoDetalle(parametros: any) {
    return this.api.post(Constants.GET_RANGODESCRIPCION, parametros, null).map(res => res.json());
  }
  eliminarMatriz(parametros: any) {
    return this.api.post(Constants.DEL_MATRIZ, parametros, null).map(res => res.json());
  }
  eliminarRangoEquipo(parametros: any){
    return this.api.post(Constants.DEL_RANGOEQUIPO, parametros, null).map(res => res.json());
  }
}
