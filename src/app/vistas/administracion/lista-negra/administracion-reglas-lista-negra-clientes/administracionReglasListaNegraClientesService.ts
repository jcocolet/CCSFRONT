import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../../servicios/api';
import { Constants } from '../../../../utiles/constants';
import { ClonarReglaRequestDTO } from '../../../../dto/clonarReglaRequestDTO';
import { BajaReglasRequestDTO } from '../../../../dto/bajaReglasRequestDTO';
import { GuardarCategoriasListaNegraRequestDTO } from '../../../../dto/guardarCategoriasListaNegraRequestDTO';

@Injectable()
export class AdministracionReglasListaNegraClientesService {

  constructor(private api : Api) {
  }

	//añadir headers a los metodos
  getParametrosBusqueda(idRegion : number) {
    return this.api.get(
      Constants.LISTA_NEGRA+
      Constants.DIAGONAL+
      Constants.PARAMETROS_BUSQUEDA+
      Constants.DIAGONAL+idRegion,
      {cache: true}, null).map(res => res.json());
  }

  getReglas(nombreRegla: string,accion:string,estatus:string,rechazaut:string,mostrcoin:string,modinvest:string) {
    return this.api.get(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS+
      Constants.INTERROGACION+Constants.ID_COMPONENTE+Constants.IGUAL+1+Constants.AMPERSAND+Constants.NOMBRE_REGLA+Constants.IGUAL+nombreRegla+Constants.AMPERSAND+
      Constants.ACCION+Constants.IGUAL+accion+Constants.AMPERSAND+Constants.ESTATUS+Constants.IGUAL+
      estatus+Constants.AMPERSAND+Constants.RECHAZO_AUTOMATICO+Constants.IGUAL+rechazaut+
      Constants.AMPERSAND+Constants.MOSTRAR_COINCIDENCIA+Constants.IGUAL+mostrcoin+
      Constants.AMPERSAND+Constants.MODALIDAD_INVESTIGACION+Constants.IGUAL+modinvest,{cache: true}, null).map(res => res.json());
  }

  getCategoriasListaNegra() {
	  return this.api.post(Constants.LISTA_NEGRA+Constants.GET_CATEGORIAS_LISTA_NEGRA,{ cache: true}, null).map(res => res.json());
  }

  crearReglaListaNegra(requestOptions: any) {
    console.log(requestOptions);
    return this.api.post(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS,requestOptions,null).map(res => res.json());
  }

  editarRegla(idRegla: number,requestOptions: any ) {
    console.log(idRegla);
    console.log(requestOptions);
      return this.api.patch(Constants.LISTA_NEGRA+Constants.DIAGONAL+
        Constants.REGLAS+Constants.DIAGONAL+idRegla,requestOptions, null).map(res => res.json());
  }

  clonarRegla(idRegla: number) {
    return this.api.post(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS+Constants.DIAGONAL+
      idRegla,null,null).map(res => res.json());
  }

  bajaReglas(requestOptions: BajaReglasRequestDTO) {
    return this.api.patch(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS,requestOptions, null).map(res => res.json());
  }

  eliminarReglas(requestOptions: BajaReglasRequestDTO) {
    return this.api.delete(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.REGLAS,new RequestOptions({body:requestOptions})).map(res => res.json());
  }

  detallesRegla(idRegla: number) {
      return this.api.get(
      Constants.LISTA_NEGRA+
      Constants.DIAGONAL+
      Constants.REGLAS+
      Constants.DIAGONAL+idRegla,
      {cache: true}, null).map(res => res.json());
  }

  guardarCategorias(requestOptions: GuardarCategoriasListaNegraRequestDTO) {
      return this.api.post(Constants.LISTA_NEGRA+Constants.DIAGONAL+Constants.GUARDAR_CATEGORIAS,requestOptions,null).map(res => res.json());
  }

}