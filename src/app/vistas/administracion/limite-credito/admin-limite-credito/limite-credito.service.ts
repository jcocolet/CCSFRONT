import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../../servicios/api';
import { Constants } from '../../../../utiles/constants';
import { ClonarReglaRequestDTO } from '../../../../dto/clonarReglaRequestDTO';
import { BajaReglasRequestDTO } from '../../../../dto/bajaReglasRequestDTO';

@Injectable()
export class AdministracionReglasLimiteCreditoService {

  constructor(private api : Api) { 
  }

	//añadir headers a los metodos
  getParametrosBusqueda(idRegion : number) {
    return this.api.get(
      Constants.LIMITE_CREDITO+
      Constants.DIAGONAL+
      Constants.PARAMETROS_BUSQUEDA+
      Constants.DIAGONAL+idRegion,
      {cache: true}, null).map(res => res.json());
  }

  getReglas(nombreRegla: string, estatus: string, minimo: number, maximo: number, clasificacion: string, claseCredito: string, deposito: number) {
    return this.api.get(Constants.LIMITE_CREDITO+Constants.DIAGONAL+Constants.REGLAS+Constants.INTERROGACION+Constants.NOMBRE_REGLA+
      Constants.IGUAL+nombreRegla+Constants.AMPERSAND+Constants.ESTATUS+Constants.IGUAL+
      estatus+Constants.AMPERSAND+Constants.MINIMO+Constants.IGUAL+minimo+
      Constants.AMPERSAND+Constants.MAXIMO+Constants.IGUAL+maximo+Constants.AMPERSAND+
      Constants.CLASIFICACION+Constants.IGUAL+clasificacion+Constants.AMPERSAND+
      Constants.CLASE_CREDITO+Constants.IGUAL+claseCredito+Constants.AMPERSAND+Constants.DEPOSITO+
      Constants.IGUAL+deposito,{cache: true}, null).map(res => res.json());
  }

  getCategoriasListaNegra() {
	  return this.api.post(Constants.LISTA_NEGRA+Constants.GET_CATEGORIAS_LISTA_NEGRA,{ cache: true}, null).map(res => res.json());
  }

  crearReglaListaNegra(requestOptions: any) {
    return this.api.post(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS,requestOptions,null).map(res => res.json());
  }

  clonarRegla(idRegla: number) {
    return this.api.post(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS+Constants.DIAGONAL+
      idRegla,null,null).map(res => res.json())
  }

  bajaReglas(requestOptions: BajaReglasRequestDTO) {
    return this.api.patch(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS,requestOptions, null).map(res => res.json());
  }

  eliminarReglas(requestOptions: BajaReglasRequestDTO) {
    return this.api.delete(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS,new RequestOptions({body:requestOptions})).map(res => res.json());
  }

}