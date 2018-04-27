import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../servicios/api';
import { Constants } from '../../../utiles/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { BajaReglasRequestDTO } from '../../../dto/bajaReglasRequestDTO';
import { ClonarReglaRequestDTO } from '../../../dto/clonarReglaRequestDTO';
import { AdmPlanesLibresMatrizDTO } from '../../../dto/AdmPlanesLibresMatrizDTO';


@Injectable()
export class AdminPlanesLibresService {

  constructor(private api: Api) { }

  crearRegla(AdmPlanesLibresMatrizDTO: any) {
    return this.api.post(Constants.CREAR_MATRIZ_ADM_P_LIBRES, AdmPlanesLibresMatrizDTO, null).map(res => res.json());
  }

  getAccionRespuesta(idRegion: number) {
    return this.api.get(Constants.GET_CGACCIONRESPUESTA + '/' + idRegion, null, null).map(res => res.json());
  }

  getEstatusRegistro() {
    return this.api.get(Constants.GET_CGESTATUSREGISTRO, null, null).map(res => res.json());
  }

  getClaseCredito(idRegion: number) {
    return this.api.get(Constants.GET_CGCLASECREDITO + '/' + idRegion, null, null).map(res => res.json());
  }

  getCgSiNo(idRegion: number) {
    return this.api.get(Constants.GET_CGSINO + '/' + idRegion, null, null).map(res => res.json());
  }

  getBusqueda(parametros: any) {
    return this.api.post(Constants.GET_BUSQUEDAMATRIZPLANESLIBRES, parametros, null).map(res => res.json());
  }

  getCategoria(parametroCategoria: any) {
    return this.api.post(Constants.GET_CGCATEGORIA, parametroCategoria, null).map(res => res.json());
  }
  
  getComponente(cveComponente: any , idRegion: any) {
    return this.api.get(Constants.GET_COMPONENTEBYCVE + '/' +cveComponente + '/' + idRegion, null, null).map(res => res.json());
  }

  getMatrizAdmPlanLibres(cargarMatriz: any){
    return this.api.post(Constants.GET_MATRIZADMPLANLIBRES, cargarMatriz, null).map(res => res.json());
  }

  elimaReglaMatrizAdmPlanLibres(idRegla: any){
    return this.api.post(Constants.ELIMINA_REGLA_ADM_PLANES_LIBRES  ,idRegla , null).map(res => res.json());
  }

  crearMatrizDepoGarantiaPLibres(form: any) {
    return this.api.post(Constants.PUT_CREAR_MATRIZ_PLANES_LIBRES, form, null).map(res => res.json());
  }

  actualizaRegla(AdmPlanesLibresMatrizDTO: any) {
    return this.api.post(Constants.ACTUALIZAR_REGLA_ADM_PLANES_LIBRES, AdmPlanesLibresMatrizDTO, null).map(res => res.json());
  }
  clonarRegla(requestOptions: ClonarReglaRequestDTO) {
    return this.api.post(Constants.CLONAR_REGLA_ADM_PLANES_LIBRES, requestOptions, null).map(res => res.json());
  }

  getDetalleDepoGarantiaPLibres(buscarDetalle: any) {
    return this.api.post(Constants.GET_DETALLEDEPOGARANTIAPLIBRES, buscarDetalle, null).map(res => res.json());
  }

  depurarReglas(requestOptions: any) {
    return this.api.post(Constants.BAJA_REGLAS_ADM_PLAN_LIBRES, requestOptions, null).map(res => res.json());
  }

}
