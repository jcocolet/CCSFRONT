import { Injectable } from '@angular/core';
import { Api } from '../../../servicios/api';
import { Constants } from '../../../utiles/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { AdmonPForzosoVo } from '../../../modelo/admonPForzosoVO.model';
import { RequestPForzosoVo } from '../../../modelo/requestAdmonPF.model';
import { CategoriasVO } from '../../../modelo/CsCategoria.model';

@Injectable()
export class DepoGarantiaService {
  constructor(private api: Api) { }

   getClaseCredito(idRegion: number) {
    return this.api.get(Constants.GET_CGCLASECREDITO + '/' + idRegion, null, null).map(res => res.json());
  }

  getEstatus() {
    return this.api.get(Constants.GET_CGESTATUSREGISTRO, null, null).map(res => res.json());
  }
  getMatriz(admonPForzoso: AdmonPForzosoVo) {
    return this.api.post(Constants.GET_MATRIZPFORZOSO, admonPForzoso, null).map(res => res.json());
  }
  getAdmonPF(requestPForzoso: RequestPForzosoVo) {
    return this.api.post(Constants.GET_ADMONPFORZOSO, requestPForzoso, null).map(res => res.json());
  }
  bajaMatrizPF(admonPForzoso: AdmonPForzosoVo) {
    return this.api.post(Constants.BAJA_MATRIZPF, admonPForzoso, null).map(res => res.json());
  }
  actualizaMatrizPF(admonPForzoso: AdmonPForzosoVo) {
    return this.api.post(Constants.ACTUALIZA_MATRIZPF, admonPForzoso, null).map(res => res.json());
  }
  agregaMatrizPF(admonPForzoso: AdmonPForzosoVo) {
    return this.api.post(Constants.AGREGA_MATRIZPF, admonPForzoso, null).map(res => res.json());
  }
  clonarMatrizPF(admonPForzoso: AdmonPForzosoVo) {
    return this.api.post(Constants.CLONAR_MATRIZPF, admonPForzoso, null).map(res => res.json());
  }
  bajaMatrizAll(admonPForzoso: AdmonPForzosoVo) {
    return this.api.post(Constants.BAJA_ALL_MATRIZPF, admonPForzoso, null).map(res => res.json());
  }
  categoriaPForzoso(categoriaVo: CategoriasVO) {
    return this.api.post(Constants.GET_CATEGORIAPF, categoriaVo, null).map(res => res.json());
  }
  accionResp(idRegion: number) {
    return this.api.get(Constants.GET_CGACCIONRESPUESTA + '/' + idRegion, null, null).map(res => res.json());
  }
  accionClavePForzoso(categoriaVo: CategoriasVO) {
    return this.api.post(Constants.GET_ACCIONCLAVEPF, categoriaVo, null).map(res => res.json());
  }
  agregaAdmonPF(requestPForzoso: RequestPForzosoVo) {
    return this.api.post(Constants.AGREGA_ADMON_PF, requestPForzoso, null).map(res => res.json());
  }
  eliminaAdmonPF(requestPForzoso: RequestPForzosoVo) {
    return this.api.post(Constants.ELIMINA_ADMON_PF, requestPForzoso, null).map(res => res.json());
  }
}
