import { Injectable } from '@angular/core';
import { Api } from '../../../servicios/api';
import { Constants } from '../../../utiles/constants';

@Injectable()
export class LineasAutorizadasService {

  constructor(private api: Api) { }


  getMatrizLineasAutorizadas() {
    return this.api.get(Constants.GET_MATRIZ_LINEAS_AUTORIZADAS, null, null).map(res => res.json());
  }
  setMatrizLineasAutorizadas(parametros: any ) {
    return this.api.post(Constants.SET_MATRIZ_LINEAS_AUTORIZADAS, parametros, null).map(res => res.json());
  }
  delMatrizLineasAutorizadas(parametros: any ) {
    return this.api.post(Constants.DEL_MATRIZ_LINEAS_AUTORIZADAS, parametros, null).map(res => res.json());
  }
  actualizaRegla(datos: any) {
    return this.api.post(Constants.ACTUALIZAR_REGLA_LINEAS_AUTORIZADAS, datos, null).map(res => res.json());
  }
  getBusqueda(parametros: any ) {
    return this.api.post(Constants.GET_BUSQUEDA_LINEAS_AUTORIZADAS, parametros, null).map(res => res.json());
  }
  crearRegla(crearReglaDTO: any) {
    return this.api.post(Constants.CREAR_REGLA_LINEAS_AUTORIZADAS, crearReglaDTO, null).map(res => res.json());
  }

  getAccionRespuesta(idRegion: number) {
    return this.api.get(Constants.GET_CGACCIONRESPUESTA + '/' + idRegion, null, null).map(res => res.json());
  }
  getCgClasificacion(idRegion: number) {
    return this.api.get(Constants.GET_CGCLASIFICACION + '/' + idRegion, null, null).map(res => res.json());
  }
  getEstatusRegistro() {
    return this.api.get(Constants.GET_CGESTATUSREGISTRO, null, null).map(res => res.json());
  }
  getCategoria(parametroCategoria: any) {
    return this.api.post(Constants.GET_CGCATEGORIA, parametroCategoria, null).map(res => res.json());
  }

}
