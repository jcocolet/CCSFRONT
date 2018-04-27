import { Component, OnInit } from '@angular/core';
import { DepoGarantiaService } from '../depo-garantia-forzoso.service';
import { CgEstatusRegistro } from '../../../../modelo/cgEstatusRegistro.model';
import { CgClaseCreditoModel } from '../../../../modelo/cgClaseCredito.model';
import { AdmonPForzosoVo } from '../../../../modelo/admonPForzosoVO.model';
import { TgMatriz } from '../../../../modelo/TgMatriz.model';
import { RequestPForzosoVo } from '../../../../modelo/requestAdmonPF.model';
import { PForzosoVo } from '../../../../modelo/PlanForzosoVO.model';
import { Constants } from '../../../../utiles/constants';
import { AlertService } from '../../../../servicios/alert.service';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { DetallePForzosoVO } from '../../../../modelo/DetallesPForzosoVO.model';
import { CategoriasVO } from '../../../../modelo/CsCategoria.model';
import { CsMensajeSistema } from '../../../../modelo/csMensajeSistema.model';

@Component({
  selector: 'app-admin-depo-garantia-forzoso',
  templateUrl: './admin-depo-garantia-forzoso.component.html',
  styleUrls: ['./admin-depo-garantia-forzoso.component.css'],
  providers: [DepoGarantiaService]
})

export class AdminDepositoGarantiaForzosoComponent implements OnInit {
public clasCredito: CgClaseCreditoModel;
public lstClasCredito: CgClaseCreditoModel [];
public estatus: CgEstatusRegistro;
public lstEstatus: CgEstatusRegistro [];
public idRegion: number;
public msnDelete: String;
public planForzosoVo: AdmonPForzosoVo;
public lstTgMatriz: TgMatriz [];
public matrizVo: TgMatriz;
public selccion: String;
public reqAdmonPF: RequestPForzosoVo;
public lstReqAdmonPF: PForzosoVo [];
public idMatriz: number;
public estatusMatriz: String;
public checkBoxheader: boolean;
public detallePforzosoVo: DetallePForzosoVO;
public categoria: CategoriasVO;
public activaBtn: boolean;

  constructor(private servicio: DepoGarantiaService, private alertService: AlertService) {
    this.selccion = ConstantesMsg.SELECCION;
    this.idRegion = 9;
    this.planForzosoVo = new AdmonPForzosoVo(this.idRegion + '', '', '', '', '');
    this.matrizVo = new TgMatriz();
    this.lstTgMatriz = new Array;
    this.checkBoxheader = false;
    this.activaBtn = false;
    this.categoria = new CategoriasVO;
    this.detallePforzosoVo = new DetallePForzosoVO();
    this.detallePforzosoVo.lstCategoriaVo = new Array();
  }

  ngOnInit() {
  this.fn_clearAlert();
   this.fn_claseCredito(this.idRegion);
   this.fn_estatus();
  }

    /*BUSCA LAS CLASES DE CREDITO EN BASE A LA REGION */
    fn_claseCredito = (idRegionX) => {
      this.fn_clearAlert();
      this.servicio.getClaseCredito(idRegionX).subscribe(res => this.lstClasCredito = res);
     }

    /*OBTIENE LOS ESTATUS */
     fn_estatus = () => {
      this.fn_clearAlert();
      this.servicio.getEstatus().subscribe(res => this.lstEstatus = res);
     }

    /*CONSULTA MATRICES EN BASE A LOS FILTROS INGRESADOS */
    fn_getBuscarMatriz() {
      console.log('FUNCION QUE REALIZA LA CONSULTA');
      this.fn_clearAlert();
      if (this.fn_validaDatos()) {
        this.servicio.getMatriz(this.planForzosoVo).subscribe(res => {this.lstTgMatriz = res;
          if (this.lstTgMatriz.length === 0) {
            this.alertService.info(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO, null, null);
          }} );
      }
    }

    fn_validaDatos() {
      if (
        this.planForzosoVo.nomRegla !== '' ||
        this.planForzosoVo.estatus !== '' ||
        this.planForzosoVo.claseCredito !== '' ||
        this.planForzosoVo.bloqueado !== ''
      ) {
        return true;
      }
      this.alertService.error(ConstantesMsg.ERROR_PARAMETROS_VACIO, null, '');
      return false;
    }

  /*LIMPIA LOS FILTROS DE BUSQUEDA */
  fn_getLimpiar() {
        this.fn_clearAlert();
        this.planForzosoVo.claseCredito = '';
        this.planForzosoVo.estatus  = '';
        this.planForzosoVo.bloqueado  = '';
        this.planForzosoVo.nomRegla = '' ;
        this.lstTgMatriz = new Array;
       }

  /*CONSULTA LAS ADMINISTRACIONES DE PLAN FORZOSO */
   fn_getAdmonPF(evento, row) {
      this.fn_clearAlert();
      this.reqAdmonPF = new RequestPForzosoVo(row.idMatrizDecision, this.idRegion);
      this.servicio.getAdmonPF(this.reqAdmonPF).subscribe(res => this.lstReqAdmonPF = res);
    }

    /*DETERMINA LA ACCION AL REMOVER LA REGLA {DEPURAR O ELIMINACION}*/
   fn_getIdMatriz(evento, row) {
      this.fn_clearAlert();
      this.idMatriz = row.idMatrizDecision;
      this.estatusMatriz = row.estatusMatriz;
      if (row.estatusMatriz === Constants.D) {
        this.msnDelete = ConstantesMsg.MSN_ELIMINAR;
      } else {
        this.msnDelete = ConstantesMsg.MSN_DEPURAR;
      }
   }

  /*ELIMINA LA REGLA */
  eliminarRegistro() {
    this.fn_clearAlert();
    this.planForzosoVo.idMatriz = this.idMatriz;
    this.planForzosoVo.estatusMatriz = this.estatusMatriz;
    this.servicio.bajaMatrizPF(this.planForzosoVo).subscribe(res => this.lstTgMatriz = res);
  }

  /*CONSTRUYE EL OBJETO REGLA QUE SE MODIFICARA */
  fn_editarMatriz(evento, row) {
    this.fn_clearAlert();
    this.matrizVo = new TgMatriz(row.idMatrizDecision, row.nombreMatriz, row.estatusMatriz);
 }

  /*MODIFICA LA REGLA */
   fn_modificaMatriz() {
      this.fn_clearAlert();
      this.planForzosoVo.nomRegla = this.matrizVo.nombreMatriz;
      this.planForzosoVo.matrizVo = this.matrizVo;
      this.servicio.actualizaMatrizPF(this.planForzosoVo).subscribe(res => {this.lstTgMatriz = res;
      if (this.lstTgMatriz[0].idMatrizDecision === 0) {
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null, null);
        this.lstTgMatriz = new Array();
    } else {
        this.alertService.success(ConstantesMsg.SUCCES_MODIFICA_REGLA, null, null);
      }});
      this.planForzosoVo.nomRegla = '';
    }

    fn_clonarMatriz() {
      const fecha = new Date();
      let hoy = fecha.getFullYear() + '.' + (fecha.getMonth() + 1) + '.' + fecha.getDate() + '.';
      hoy +=  fecha.getHours() + '.' + fecha.getHours() + '.' + fecha.getMilliseconds();
      this.matrizVo.nombreMatriz = this.matrizVo.nombreMatriz + ' CLONADO ' + hoy;
      this.matrizVo.estatusMatriz = 'D';
      this.planForzosoVo.matrizVo = this.matrizVo;
      this.planForzosoVo.matrizVo.usuarioCreacion = 'SYSTEM';

      this.servicio.clonarMatrizPF(this.planForzosoVo).subscribe(res => {this.lstTgMatriz = res;
        this.fn_refrescaLista(this.lstTgMatriz, 'clonar');
      } );
    }

  /*REFRESCA LA INFORMACION DE LA TABLA */
  fn_refrescaLista(lstMatrizVo: TgMatriz[], valor: String) {
    this.fn_clearAlert();
    if (lstMatrizVo[0].idMatrizDecision === 0) {
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null, null);
    } else if (lstMatrizVo[0].idMatrizDecision === -1) {
      this.alertService.error(ConstantesMsg.ERROR_NOMBRE_RULE_VACIA, null, null);
    } else {
       this.lstTgMatriz = lstMatrizVo;
       if (valor === ConstantesMsg.ACCION_CREAR) {
        this.alertService.success(ConstantesMsg.SUCCESS_CREACION_REGLA, null, null);
      } else if (valor === ConstantesMsg.ACCION_CLONAR) {
        this.alertService.success(ConstantesMsg.SUCCESS_CLONACION_REGLA, null, null);
      }
    }
  }
  /*ELIMINA REGLAS SELECCIONADAS */
  eliminarAllRegistro() {
    this.fn_clearAlert();
    this.planForzosoVo.idMatriz = this.idMatriz;
    this.planForzosoVo.estatusMatriz = this.estatusMatriz;
    this.servicio.bajaMatrizPF(this.planForzosoVo).subscribe(res => this.lstTgMatriz = res);

  }
 /*CARGA EL MENSAJE DE ELIMINACION PARA EL CHECKBOX*/
    fn_eliminaAll(evento) {
      this.fn_clearAlert();
      this.msnDelete = ConstantesMsg.INFO_ELIMINAR_ALL;
   }
   /*SELECCIONA O DESMARCA LOS REGISTROS A ELIMINAR*/
   fn_selectAll(evento) {
      if (this.checkBoxheader) {
        for (let i = 0; i < this.lstTgMatriz.length; i++) {
          this.lstTgMatriz[i].seleccion = false;
        }
      } else {
        for (let i = 0; i < this.lstTgMatriz.length; i++) {
          this.lstTgMatriz[i].seleccion = true;
        }
      }
 }

/* CARGA LAS CATEGORIAS DE LA ADMINISTRACION */
  fn_getCategoriaPforzoso(evento, row) {
      this.fn_clearAlert();
      this.fn_getAdmonPF(evento, row);
      this.categoria.idregion = this.idRegion;
      this.categoria.idMatriz = row.idMatrizDecision;
      this.idMatriz = row.idMatrizDecision;
      this.servicio.categoriaPForzoso(this.categoria).subscribe(res => {this.detallePforzosoVo = res;
      this.fn_checkbox();
      });
  }

  /*LIMPIA ALERTA */
  fn_clearAlert() {
    this.alertService.clearMessage();
  }

  /*ACTIVA EL BOTON DE CATEGORIA */
  fn_checkbox() {
    for (let i = 0; i < this.detallePforzosoVo.lstCategoriaVo.length; i++) {
       if (this.detallePforzosoVo.lstCategoriaVo[i].seleccion) {
          this.activaBtn = false;
          break;
       } else {
          this.activaBtn = true;
       }
  }
}
}
