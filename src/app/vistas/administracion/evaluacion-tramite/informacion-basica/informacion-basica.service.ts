import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Api } from '../../../../servicios/api';
import { Constants } from '../../../../utiles/constants';

@Injectable()
export class InformacionBasicaService {

  constructor(private api : Api) { 
  }
	//añadir headers a los metodos
  getOpcionesInfoBasicUsuResponseDTO(idRegionUsuario: number) {
    return this.api.get(Constants.INFORMACION_BASICA+Constants.DIAGONAL+
      Constants.GET_OPCIONES_INFBSC_USUARIO+Constants.DIAGONAL+
      idRegionUsuario,{ cache: true}, null).map(res => res.json());
  }

  getFuerzaVenta(idCanalVenta: number) {
	return this.api.get(Constants.INFORMACION_BASICA+Constants.DIAGONAL+Constants.GET_FUERZAVENTA+
    Constants.DIAGONAL+idCanalVenta,{ cache: true}, null).map(res => res.json());
  }

  getModelos(idMarca: number) {
  	return this.api.get(Constants.INFORMACION_BASICA+Constants.DIAGONAL+Constants.GET_MODELOS+
      Constants.DIAGONAL+idMarca,{ cache: true}, null).map(res => res.json());
  }

  crearFlujo(requestOptions: any) {
    return this.api.post(Constants.INFORMACION_BASICA+Constants.DIAGONAL+Constants.INFORMACION_BASICA_CREAR_FLUJO,requestOptions, null).map(res => res.json());
  }

  recuperarInformacionFlujo(idFlujo: number) {
    return this.api.get(Constants.INFORMACION_BASICA+Constants.DIAGONAL+Constants.RECUPERAR_INFORMACION_FLUJO+
      Constants.DIAGONAL+idFlujo,{ cache: true}, null).map(res => res.json());
  }

}