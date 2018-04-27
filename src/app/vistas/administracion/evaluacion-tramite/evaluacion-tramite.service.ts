import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../servicios/api';
import { Constants } from '../../../utiles/constants';
import { BajaReglasRequestDTO } from '../../../dto/bajaReglasRequestDTO';
import { ClonarReglaRequestDTO } from '../../../dto/clonarReglaRequestDTO';

@Injectable()
export class EvaluacionTramiteService {

  constructor(private api : Api) {
  }

	//añadir headers a los metodos
  getParametrosBusqueda(idRegion: number) {
    return this.api.get(Constants.EVALUACION_TRAMITE+Constants.DIAGONAL+Constants.PARAMETROS_BUSQUEDA+
      Constants.DIAGONAL+idRegion,{ cache: false}, null).map(res => res.json());
  }

  getReglas(nombreRegla: string,tramite: string,estatus: string,fechaInicio: string,fechaFin: string,canal:string,
    mercado:string,tipoPersona:string,tipoPlazo:string,tipoProyecto:string) {
    return this.api.get(Constants.EVALUACION_TRAMITE+Constants.DIAGONAL+Constants.REGLAS+Constants.INTERROGACION
      +Constants.NOMBRE_REGLA+Constants.IGUAL+nombreRegla+Constants.AMPERSAND+Constants.TRAMITE+Constants.IGUAL
      +tramite+Constants.AMPERSAND+Constants.ESTATUS+Constants.IGUAL+estatus+Constants.AMPERSAND+
      Constants.FECHA_INICIO+Constants.IGUAL+fechaInicio+Constants.AMPERSAND+Constants.FECHA_FIN+Constants.IGUAL+
      fechaFin+Constants.AMPERSAND+Constants.CANAL+Constants.IGUAL+canal+Constants.AMPERSAND+Constants.MERCADO+
      Constants.IGUAL+mercado+Constants.AMPERSAND+Constants.TIPO_PERSONA+Constants.IGUAL+tipoPersona+Constants.AMPERSAND+
      Constants.TIPO_PLAZO+Constants.IGUAL+tipoPlazo+Constants.AMPERSAND+Constants.TIPO_PROYECTO+Constants.IGUAL+tipoProyecto,
      { cache: true}, null).map(res => res.json());
  }

  bajaReglas(requestOptions: BajaReglasRequestDTO) {
  	return this.api.put(Constants.EVALUACION_TRAMITE+Constants.DIAGONAL+Constants.REGLAS,requestOptions, null).map(res => res.json());
  }

  clonarRegla(requestOptions: ClonarReglaRequestDTO) {
    return this.api.post(Constants.EVALUACION_TRAMITE+Constants.DIAGONAL+Constants.REGLAS,requestOptions,
      null).map(res => res.json())
  }

  eliminarReglas(requestOptions: BajaReglasRequestDTO) {
    return this.api.delete(Constants.EVALUACION_TRAMITE+Constants.DIAGONAL+Constants.REGLAS,new RequestOptions({body:requestOptions})).map(res => res.json());
  }
}