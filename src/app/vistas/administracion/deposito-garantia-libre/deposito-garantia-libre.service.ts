import { Injectable } from '@angular/core';
import { Api } from '../../../servicios/api';
import { Constants } from '../../../utiles/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { BajaReglasRequestDTO } from '../../../dto/bajaReglasRequestDTO';
import { ClonarReglaRequestDTO } from '../../../dto/clonarReglaRequestDTO';

@Injectable()
export class DepositoGarantiaPLibresService {
  constructor(private api: Api) { }
  
  getTipoRegla(idRegion: number) {
  return this.api.get(Constants.GET_TIPOREGLA + '/' + idRegion, null, null).map(res => res.json());
  }
  getAccionRespuesta(idRegion: number) {
    return this.api.get(Constants.GET_CGACCIONRESPUESTA + '/' + idRegion, null, null).map(res => res.json());
  }
   getClaseCredito(idRegion: number) {
    return this.api.get(Constants.GET_CGCLASECREDITO + '/' + idRegion, null, null).map(res => res.json());
  }
  getEstatusRegistro() {
    return this.api.get(Constants.GET_CGESTATUSREGISTRO, null, null).map(res => res.json());
  }
  getCategoria(parametroCategoria: any) {
    return this.api.post(Constants.GET_CGCATEGORIA, parametroCategoria, null).map(res => res.json());
  }
  getBusqueda(parametros: any) {
    return this.api.post(Constants.GET_BUSQUEDADEPOGARANTIAPLIBRES, parametros, null).map(res => res.json());
  }
  crearRegla(crearReglaDTO: any) {
    return this.api.post(Constants.CREAR_REGLA_DEPOSITO_LIBRES, crearReglaDTO, null).map(res => res.json());
  }
  actualizaRegla(GetMatrizDecisionDepoGarantiaPLibresDTO: any) {
    return this.api.post(Constants.ACTUALIZAR_REGLA_DEPOSITO_LIBRES, GetMatrizDecisionDepoGarantiaPLibresDTO, null).map(res => res.json());
  }
  depurarReglas(requestOptions: any) {
    return this.api.post(Constants.BAJA_REGLAS_DEPOSITOS_LIBRES, requestOptions, null).map(res => res.json());
  }

  clonarRegla(requestOptions: ClonarReglaRequestDTO) {
    return this.api.post(Constants.CLONAR_REGLA_DEPOSITO_LIBRES, requestOptions, null).map(res => res.json());
  }
  getDetalleDepoGarantiaPLibres(buscarDetalle: any) {
    return this.api.post(Constants.GET_DETALLEDEPOGARANTIAPLIBRES, buscarDetalle, null).map(res => res.json());
  }
  crearMatrizDepoGarantiaPLibres(form: any) {
    return this.api.post(Constants.PUT_CREAR_MATRIZ_DEPGARANTIA_PLIBRES, form, null).map(res => res.json());
  }
  getMatrizDepoGarantiaPLibres(cargarMatriz: any){
    return this.api.post(Constants.GET_MATRIZDEPOGARANTIAPLIBRES, cargarMatriz, null).map(res => res.json());
  }
  eliminarTablaMatrizPLibres(idMatrizPLibres: any) {
    return this.api.post(Constants.ELIMINAR_REGLA_DEPOGARANTIAPLIBRES, idMatrizPLibres, null).map(res => res.json());
  }
}
