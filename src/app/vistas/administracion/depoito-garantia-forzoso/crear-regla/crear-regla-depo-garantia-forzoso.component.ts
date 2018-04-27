import { Component, OnInit, Input} from '@angular/core';
import { CgClaseCreditoModel } from '../../../../modelo/cgClaseCredito.model';
import { AdmonPForzosoVo } from '../../../../modelo/admonPForzosoVO.model';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { CgAccionResp } from '../../../../modelo/cgAccionRes.model';
import { DepoGarantiaService } from '../depo-garantia-forzoso.service';
import { CategoriasVO } from '../../../../modelo/CsCategoria.model';
import { CgAcionClave } from '../../../../modelo/cgAccionClave.model';
import { DetallePForzosoVO } from '../../../../modelo/DetallesPForzosoVO.model';
import { CsMensajeSistema } from '../../../../modelo/csMensajeSistema.model';
import { PForzosoVo } from '../../../../modelo/PlanForzosoVO.model';
import { RequestPForzosoVo } from '../../../../modelo/requestAdmonPF.model';
import { AlertService } from '../../../../servicios/alert.service';
import { Constants } from '../../../../utiles/constants';

@Component({
  selector: 'app-crear-regla-depo-garantia-forzoso',
  templateUrl: './crear-regla-depo-garantia-forzoso.component.html',
  styleUrls: ['./crear-regla-depo-garantia-forzoso.component.css'],
  providers: [DepoGarantiaService]

})

export class CrearReglaDepositoGarantiaForzosoComponent implements OnInit {
  public lstClasCredito: CgClaseCreditoModel [];
  public planForzosoVo: AdmonPForzosoVo;
  public selccion: string;
  public lstAccionResSi: Array<CgAccionResp>;
  public lstAccionResNo: Array<CgAccionResp>;
  public categoria: CategoriasVO;
  public lstAccionClave:  Array<CgAcionClave>;
  public detallePforzosoVo: DetallePForzosoVO;
  @Input() public auxDetallePF: DetallePForzosoVO;
  @Input() public lstReqAdmonPF: PForzosoVo [];
  @Input() public idRegion: number;
  @Input() public idMatriz: number;
  public reqAdmonPF: RequestPForzosoVo;
  public pForzosoVo: PForzosoVo;
  public campoVacio: boolean;
  public bntAccion: boolean;
  public bntSave: boolean;
  public msnDelete: String;


  public objClaseCredito: CgClaseCreditoModel;
  public objAccionRespNo: CgAccionResp;
  public objAccionRespSi: CgAccionResp;
  public objAccionClave: CgAcionClave;
  public objMsjSistemaSi: CsMensajeSistema;
  public objMsjSistemaNo: CsMensajeSistema;
  public estBloqueado: string;
  public idAmonPF: number;




  constructor(private servicio: DepoGarantiaService, private alertService: AlertService) {
    this.lstReqAdmonPF =  new Array<PForzosoVo>();
    this.selccion = ConstantesMsg.SELECCION;
    this.detallePforzosoVo = new DetallePForzosoVO ();
    this.categoria = new CategoriasVO();
    this.lstAccionResSi = new Array;
    this.lstAccionResNo = new Array;
    this.objClaseCredito = new CgClaseCreditoModel(this.selccion);
    this.objAccionClave = new CgAcionClave(this.selccion);
    this.objAccionRespNo = new CgAccionResp(this.selccion);
    this.objAccionRespSi = new CgAccionResp(this.selccion);
    this.objMsjSistemaNo = new CsMensajeSistema();
    this.objMsjSistemaNo.mensaje = '';
    this.objMsjSistemaSi = new CsMensajeSistema();
    this.objMsjSistemaSi.mensaje = '';
    this.lstClasCredito = new Array;
    this.estBloqueado = '-Seleccione-';
    this.bntAccion = false;
    this.bntSave = false;
    this.msnDelete = '';
  }

  ngOnInit() {
    this.fn_getAccionRespuestaSi();
    this.fn_getAccionRespuestaNo();
    this.fn_getAccionClave();
    this.fn_claseCredito();
    this.fn_clearAlert();
    this.fn_limpiar();
  }
/*ALMACENA NUEVOS REGISTROS EN ADMON PF */
  fn_guardaAdmonPf() {
    this.fn_clearAlert();
    this.reqAdmonPF = new RequestPForzosoVo(this.idMatriz, this.idRegion, this.lstReqAdmonPF);
    this.reqAdmonPF.lstCategoriaVo = new Array<CategoriasVO>();
    this.reqAdmonPF.lstCategoriaVo = this.auxDetallePF.lstCategoriaVo;
    this.servicio.agregaAdmonPF(this.reqAdmonPF).subscribe(res => {this.lstReqAdmonPF = res;
    this.fn_limpiar();
    this.alertService.success(ConstantesMsg.SUCCESS_CREACION_REGLA, null,null);
    });
    this.bntSave = false;

  }

  /*EDITAR REGLA*/
  fn_modificar() {
    this.fn_clearAlert();
    this.reqAdmonPF = new RequestPForzosoVo(this.idMatriz, this.idRegion, this.lstReqAdmonPF);

    this.pForzosoVo = new PForzosoVo();
    this.pForzosoVo.idAcciosnClave = this.objAccionClave.id;
    this.pForzosoVo.idAccionNo = this.objAccionRespNo.idAccion;
    this.pForzosoVo.idAccionSi = this.objAccionRespSi.idAccion;
    this.pForzosoVo.idClaseCredito = this.objClaseCredito.idClaseCredito;
    this.pForzosoVo.idAdmonPF = this.idAmonPF;
    this.pForzosoVo.acciosnClave = this.objAccionClave.descripcion;
    this.pForzosoVo.accionNo = this.objAccionRespNo.descripcion;
    this.pForzosoVo.accionSi = this.objAccionRespSi.descripcion;
    this.pForzosoVo.claseCredito = this.objClaseCredito.clave;
    this.pForzosoVo.msjNoCumple = this.objMsjSistemaNo.mensaje === null ? '' : this.objMsjSistemaNo.mensaje.trim();
    this.pForzosoVo.msjSiCumple = this.objMsjSistemaSi.mensaje === null ? '' : this.objMsjSistemaSi.mensaje.trim();
    this.pForzosoVo.bloqueado = this.estBloqueado;
    this.pForzosoVo.idmsjNoCumple = this.objMsjSistemaNo.idMensajeSistema;
    this.pForzosoVo.idMsjSiCumple = this.objMsjSistemaSi.idMensajeSistema;
    this.reqAdmonPF.lstAdmonPForzoso = new Array<PForzosoVo>();
    this.reqAdmonPF.lstCategoriaVo = new Array<CategoriasVO>();
    this.reqAdmonPF.lstAdmonPForzoso.push(this.pForzosoVo);
    this.reqAdmonPF.lstCategoriaVo = this.auxDetallePF.lstCategoriaVo;
    this.servicio.agregaAdmonPF(this.reqAdmonPF).subscribe(res => {this.lstReqAdmonPF = res;
    this.fn_limpiar();
    this.alertService.success(ConstantesMsg.SUCCES_MOD_ADMONPF, null,null); });
  }

     /*GURDA LAS REGLAS EN MEMORIA DE ADMON PF */
     fn_agregar() {
      this.fn_clearAlert();
      this.fn_validaGuardado();
        if (!this.campoVacio) {
          this.pForzosoVo = new PForzosoVo();
          this.pForzosoVo.idAcciosnClave = this.objAccionClave.id;
          this.pForzosoVo.idAccionNo = this.objAccionRespNo.idAccion;
          this.pForzosoVo.idAccionSi = this.objAccionRespSi.idAccion;
          this.pForzosoVo.idClaseCredito = this.objClaseCredito.idClaseCredito;

          this.pForzosoVo.acciosnClave = this.objAccionClave.descripcion;
          this.pForzosoVo.accionNo = this.objAccionRespNo.descripcion;
          this.pForzosoVo.accionSi = this.objAccionRespSi.descripcion;
          this.pForzosoVo.claseCredito = this.objClaseCredito.clave;
          this.pForzosoVo.msjNoCumple = this.objMsjSistemaNo.mensaje === null ? '' : this.objMsjSistemaNo.mensaje.trim();
          this.pForzosoVo.msjSiCumple = this.objMsjSistemaSi.mensaje === null ? '' : this.objMsjSistemaSi.mensaje.trim();
          this.pForzosoVo.bloqueado = this.estBloqueado;

          this.lstReqAdmonPF.push(this.pForzosoVo);
          this.bntSave = true;
          this.fn_limpiar();
        } else {
          this.alertService.error(ConstantesMsg.MSN_ERROR_AGREGAR, null,null);
        }
     }

      /*OBTIENE LA ACCION RESPUESTA DE ADMON PF */
     fn_getAccionRespuestaSi() {
      this.fn_clearAlert();
        this.servicio.accionResp(this.idRegion).subscribe(res => {this.lstAccionResSi = res;
          this.lstAccionResSi.push(this.objAccionRespSi);
        });
      }

      fn_getAccionRespuestaNo() {
        this.fn_clearAlert();
        this.servicio.accionResp(this.idRegion).subscribe(res => {this.lstAccionResNo = res;
          this.lstAccionResNo.push(this.objAccionRespNo);
        });
      }

    /*OBTIENE LA ACCION RESPUESTA DE ADMON PF */
    fn_getAccionClave() {
      this.fn_clearAlert();
      this.categoria.idregion = this.idRegion;
      this.servicio.accionClavePForzoso(this.categoria).subscribe(res => {this.detallePforzosoVo = res;
      this.lstAccionClave = this.detallePforzosoVo.lstAccionClave;
      this.lstAccionClave.push(this.objAccionClave);
      });
    }

       /*BUSCA LAS CLASES DE CREDITO EN BASE A LA REGION */
       fn_claseCredito () {
        this.fn_clearAlert();
        this.servicio.getClaseCredito(this.idRegion).subscribe(res => {this.lstClasCredito = res;
          this.lstClasCredito.push(this.objClaseCredito);
        });
       }
    fn_reinicia() {
       this.fn_limpiar();
     }
    fn_limpiar() {
      this.fn_clearAlert();
      this.objClaseCredito.descripcion = this.selccion;
      this.estBloqueado = this.selccion;
      this.objAccionClave.accion = this.selccion;
      this.objAccionRespSi.descripcion = this.selccion;
      this.objAccionRespNo.descripcion = this.selccion;
      this.objMsjSistemaNo.mensaje = '';
      this.objMsjSistemaSi.mensaje = '';
      this.bntAccion = false;
    }

    fn_validaGuardado() {
      this.fn_clearAlert();
      this.campoVacio = false;
        if (this.objAccionClave.accion === this.selccion ? true : false ||
          this.objAccionClave.accion === this.selccion ? true : false ||
          this.objAccionRespSi.descripcion === this.selccion ? true : false ||
          this.objAccionRespNo.descripcion === this.selccion ? true : false ||
          this.objClaseCredito.descripcion === this.selccion ? true : false ||
          this.estBloqueado === this.selccion ? true : false ||
          (this.objMsjSistemaSi.mensaje === null || this.objMsjSistemaSi.mensaje.trim()) === '' ? true : false ||
          (this.objMsjSistemaNo.mensaje === null || this.objMsjSistemaNo.mensaje.trim()) === '' ? true : false ) {
            this.campoVacio = true;
        }
    }

    fn_editarAdmon(evento, row) {
    this.fn_clearAlert();
    for (let i = 0; i < this.lstReqAdmonPF.length; i++) {
      if (this.lstReqAdmonPF[i].idAdmonPF === row.idAdmonPF) {
        this.objAccionClave.accion = this.lstReqAdmonPF[i].acciosnClave;
        this.objAccionRespNo.descripcion = this.lstReqAdmonPF[i].accionNo;
        this.objAccionRespSi.descripcion = this.lstReqAdmonPF[i].accionSi;
        this.objClaseCredito.descripcion = this.lstReqAdmonPF[i].claseCredito;
        this.objMsjSistemaNo.mensaje = this.lstReqAdmonPF[i].msjNoCumple;
        this.objMsjSistemaSi.mensaje = this.lstReqAdmonPF[i].msjSiCumple;
        this.estBloqueado = this.lstReqAdmonPF[i].bloqueado;
        this.idAmonPF = this.lstReqAdmonPF[i].idAdmonPF;

        this.objAccionClave.id = this.lstReqAdmonPF[i].idAcciosnClave;
        this.objAccionRespNo.idAccion = this.lstReqAdmonPF[i].idAccionNo;
        this.objAccionRespSi.idAccion = this.lstReqAdmonPF[i].idAccionSi;
        this.objClaseCredito.idClaseCredito = this.lstReqAdmonPF[i].idClaseCredito;
        this.objMsjSistemaNo.idMensajeSistema = this.lstReqAdmonPF[i].idmsjNoCumple;
        this.objMsjSistemaSi.idMensajeSistema = this.lstReqAdmonPF[i].idMsjSiCumple;
       }
      }
      this.bntAccion = true;
    }

    fn_eliminaPF(evento, row) {
      this.fn_clearAlert();
      this.pForzosoVo = new PForzosoVo();
      this.pForzosoVo.idmsjNoCumple = row.idmsjNoCumple;
      this.pForzosoVo.idMsjSiCumple = row.idMsjSiCumple;
      this.pForzosoVo.idAdmonPF = row.idAdmonPF;

      this.reqAdmonPF = new RequestPForzosoVo(this.idMatriz, this.idRegion, this.lstReqAdmonPF, this.pForzosoVo);
      this.servicio.eliminaAdmonPF(this.reqAdmonPF).subscribe(res => {this.lstReqAdmonPF = res;
      this.fn_limpiar();
      this.alertService.success(ConstantesMsg.SUCCESS_ELIMINA_REGLA, null,null); } );

    }

    fn_clonarPF(evento, row) {
      this.fn_clearAlert();
    this.reqAdmonPF = new RequestPForzosoVo(this.idMatriz, this.idRegion, this.lstReqAdmonPF);

    this.pForzosoVo = new PForzosoVo();
    this.pForzosoVo.idAcciosnClave = row.idAcciosnClave;
    this.pForzosoVo.idAccionNo = row.idAccionNo;
    this.pForzosoVo.idAccionSi = row.idAccionSi;
    this.pForzosoVo.idClaseCredito = row.idClaseCredito;
    /* this.pForzosoVo.idAdmonPF = this.idAmonPF; */
    this.pForzosoVo.acciosnClave = row.acciosnClave;
    this.pForzosoVo.accionNo = row.accionNo;
    this.pForzosoVo.accionSi = row.accionSi;
    this.pForzosoVo.claseCredito = row.claseCredito;
    this.pForzosoVo.msjNoCumple = row.msjNoCumple;
    this.pForzosoVo.msjSiCumple = row.msjSiCumple;
    this.pForzosoVo.bloqueado = row.bloqueado;
/*this.pForzosoVo.idmsjNoCumple = row.objMsjSistemaNo.idMensajeSistema;
    this.pForzosoVo.idMsjSiCumple = row.objMsjSistemaSi.idMensajeSistema; */

    this.reqAdmonPF.lstAdmonPForzoso = new Array<PForzosoVo>();
    this.reqAdmonPF.lstAdmonPForzoso.push(this.pForzosoVo);

      this.servicio.agregaAdmonPF(this.reqAdmonPF).subscribe(res => {this.lstReqAdmonPF = res;
      this.fn_limpiar();
      this.alertService.success(ConstantesMsg.SUCCESS_CLONACION_REGLA, null,null);
      });
      this.bntSave = false;
    }

       /*LIMPIA ALERTA */
    fn_clearAlert() {
      this.alertService.clearMessage();
    }

}
