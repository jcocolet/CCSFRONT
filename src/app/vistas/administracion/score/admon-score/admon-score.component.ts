import { CgAccionResp } from './../../../../modelo/cgAccionRes.model';
import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { ClaseCreditoRequestDTO } from '../../../../dto/getClaseCreditoRequestDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { MatrizDecisionDTO } from '../../../../dto/matrizDecisionDTO';
import { MatrizDecisionResponseDTO } from '../../../../dto/matrizDecisionResponseDTO';
import { ParamBusquedaScore } from '../../../../modelo/paramBusquedaScore.model';
import { CgClasificacionDTO } from '../../../../dto/cgClasificacionDTO';

@Component({
  selector: 'app-admon-score',
  templateUrl: './admon-score.component.html',
  styleUrls: ['./admon-score.component.css']
})
export class AdmonScoreComponent implements OnInit {
  public idRegion: number;
  public idComponente: number;
  public cbmClasecredito: ClaseCreditoRequestDTO[];
  public cbmEstatus: EstatusRequestDTO[];
  public cmbClasifiHistPagos: CgClasificacionDTO[];
  public cmbClasifiBC: CgClasificacionDTO[];
  public cmbClasifiFinal: CgClasificacionDTO[];
  public cmbAccionLstNegra: CgAccionResp [];
  public datos: MatrizDecisionDTO = new MatrizDecisionDTO();
  public response: MatrizDecisionResponseDTO[] = [];
  public parametros: ParamBusquedaScore = new ParamBusquedaScore();
  public descEstatus: string;
  public idSeleccionado: number;
  public nombreRegla: string;
  public estatusClave: string;
  public desClaseCredito: string;
  public indexTabla: number;

  constructor(public servicios: ScoreService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getCgClaseCredito();
    this.getCgEstatusregistro();
    this.getCgClasificacionHistPagos();
    this.getCgClasificacionBC();
    this.getCgClasificacionFinal();
    this.getCgAccionLstNegra();
    this.idRegion = 9;
    this.idComponente = 168;
    this.parametros.nombreMatriz = undefined;
    this.parametros.idClasecredito = '-1';
    this.parametros.estatusClave = '-3';
    this.parametros.idClasifHistPagos = '-1';
    this.parametros.idClasifBC = '-1';
    this.parametros.idClasifFinanciamiento = '-1';
    this.parametros.idAccionLstNegra = '-1';
  }
  /*FUNCION QUE REALIZA LA BUSQUEDA POR PARAMETROS*/
  buscar = () => {
    console.log('INICIA LA FUNCION PARA BUSCAR POR PARAMETROS LA MATRIZ DE REGLA');
    // VALIDA LOS PARAMETROS DE ENTRADA DE BUSQUEDA
    this.clearMessage();
    if (this.validaDatos()) {
      // REALIZA LA PETICION AL SERVICIO PARA REALIZAR LA CONSULTA DE INFORMACION
      this.servicios.getBusqueda(this.parametros).subscribe((data) => {

        this.response = data;
        for (let i = 0; i < this.response.length; i++) {
          const stat = this.response[i].estatusMatriz;
          this.response[i].descEstatus = this.estatusConvert(stat);
          //    this.checkBoxElements.push(false);
        }
        // RESETEA LOS CHECK DE LA TABLA COMO INABILITADOS
        //   this.pushCkeck();
        // INVOCA LA FUNCION PARA EL PAGINADO EN LA TABLA DE RESULTADO
        //   this.cargarDatosTabla();
        //  this.paginaActual = this.paginas[this.numeroPaginaActual];
        if (this.response[0].estatusMatriz === 'SIN RESULTADO') {
          this.response = [];
          this.alertService.info(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO, null, null);
        }
      });
    } else {
      this.alertService.error(ConstantesMsg.ERROR_PARAMETROS_VACIO, null, null);
      this.response = [];
    }
  }
  /*FUNCION QUE SE ENCARGA DE VALIDAR LOS PARAMETROS DE BUSQUEDA */
  validaDatos(): boolean {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE BUSQUEDA');
    if (this.parametros.nombreMatriz === undefined &&
      this.parametros.idClasecredito === '-1' &&
      this.parametros.estatusClave === '-3') {
      return false;
    } else {
      return true;
    }
  }
  limpiarForm() {
    this.parametros.nombreMatriz = undefined;
    this.parametros.idClasecredito = '-1';
    this.parametros.estatusClave = '-3';
    this.clearMessage();
  }
  // FUNCION QUE SE ENCARGA DE ENVIAR LOS VALORES INICIALES A LA PANTALLA MODIFICA REGLA
  modifica(form: MatrizDecisionResponseDTO, index: number) {
    console.log('INICIA LA FUNCION QUE PASA LOS VALORES INICIALES PARA MODIFICAR LA REGLA');
    // this.modificaRegla.idRegla = form.idMatrizDecision;
    this.nombreRegla = form.nombreMatriz;
    this.estatusClave = form.estatusMatriz;
    this.idSeleccionado = form.idMatrizDecision;
    this.indexTabla = index;
    console.log('INDEX SELECIONADO DE LA TABLA ' + this.indexTabla);
    console.log('ESTATUS ' + this.estatusClave);
    console.log('NOMBRE ' + this.nombreRegla);
  }
  // FUNCION QUE SE ENCARGA DE ACTUALIZAR LA REGLA
  eventActualizarRegla(event): void {
    console.log('INICIA EL EVENTO PARA ACTUALIZAR LA REGLA');
    this.clearMessage();
    this.datos.usuarioModificacion = 'EVERIS a';
    this.datos = event.datos;
    this.datos.idComponente = this.idComponente;
    // INVOCA EL SERVICIO PARA ACTUALIZAR LA REGLA
    this.servicios.actualizaRegla(this.datos).subscribe((datos) => {
      this.datos = datos;
      // this.cargarDatosTabla();
      // this.paginaActual = this.paginas[this.numeroPaginaActual];
      if (this.datos.estatus === 'NOMBRE EXISTENTE') {
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null, null);
      }
      if (this.datos.estatus === 'ERROR ACTUALIZA') {
        this.alertService.error(ConstantesMsg.ERROR_ACTUALIZA_REGLA, null, null);
      } else {
        // ELIMINA EL RESITRO SELECCIONADO DE LA LISTA DE RESULTADO
        this.borraIndexTabla(this.indexTabla);
        this.alertService.success(ConstantesMsg.SUCCESS_ACTUALIZAR, null, null);
        // SE OBTIENE LA DESCRIPCION DEL ESTATUS DE REGISTRO
        this.descEstatus = this.estatusConvert(this.datos.estatus);
        console.log('estatus de la regla' + this.descEstatus);
        // AGREGA EL REGISTRO ACTUALIZADO A LA LISTA
        this.response.push(new MatrizDecisionResponseDTO(this.datos.idMatrizDecision, this.datos.nombreMatriz,
          this.datos.estatus, 0, this.descEstatus));
      }
    });
  }

  /*FUNCION QUE REALIZA EL EVENTO DE CREAR LA REGLA*/
  eventCrearRegla(event): void {
    console.log('INICIA EL EVENTO PARA CREAR LA REGLA');
    this.clearMessage();
    this.datos = event.datos;
    this.datos.idComponente = this.idComponente;
    this.servicios.crearRegla(this.datos).subscribe((datos) => {
      this.datos = datos;
      if (this.datos.estatus === 'NOMBRE EXISTENTE') {
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null, null);
      } else {
        if (this.datos.estatus === 'ERROR_AL_CREAR_LA_REGLA') {
          this.alertService.error(ConstantesMsg.ERROR_CREAR_REGLA, null, null);
        } else {
          console.log('ID MATRIZ' + this.datos.idMatrizDecision);
          this.descEstatus = this.estatusConvert(this.datos.estatus);
          this.response.push(new MatrizDecisionResponseDTO(this.datos.idMatrizDecision, this.datos.nombreMatriz,
            this.datos.estatus, 0, this.descEstatus));
        }
      }
    });
  }
  // FUNCION QUE SE ENCARGA DE OBTENER LA DESCRIPCION DEL ESTATUS DE REGISTRO
  estatusConvert(searchVal) {
    for (let i = 0; i < this.cbmEstatus.length; i++) {
      const currentEst = this.cbmEstatus[i];
      if (currentEst.clave === searchVal) {
        return currentEst.descripcion;
      }
    }
  }

  /*FUNCION QUE OBTIENE EL CATALOGO DE CLASE DE CREDITO */
  getCgClaseCredito() {
    this.servicios.getClaseCredito(9).subscribe(res => this.cbmClasecredito = res);
  }
  /*FUNCION QUE OBTIENE EL CATALOGO DE ESTATUS REGISTRO */
  getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }

  getCgClasificacionHistPagos() {
    this.servicios.getCgClasificacionHistPagos(9).subscribe(res => this.cmbClasifiHistPagos = res);
  }


  getCgClasificacionBC() {
    this.servicios.getCgClasificacionBC(9).subscribe(res => this.cmbClasifiBC = res);
  }

  getCgClasificacionFinal() {
    this.servicios.getCgClasificacionFinal(9).subscribe(res => this.cmbClasifiFinal = res);
  }

  getCgAccionLstNegra() {
    this.servicios.getCgAccionLstNegra(9).subscribe(res => this.cmbAccionLstNegra = res);
  }
  /*FUNCION QUE SE ENCARGA DE QUITAR EL MENSAJE DE ALERTA */
  clearMessage = () => {
    this.alertService.clearMessage();
  }
  // EVENTO QUE SE ENCARGA DE VALIDAR DATOS ESPECIALES
  soloCaracteres(evt): void {
    const regEx = /^([0-9A-Za-z ])$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }
  // EVENTO QUE SE ENCARGA DE VALIDAR CAPTURA SOLO NUMEROS
  soloNumeros(evt): void {
    const regEx = /^([0-9.,])$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }
  // ELIMINA EL REGISTRO POR EL INDEX DE LA TABLA
  borraIndexTabla(index: number) {
    this.response.splice(index, 1);
  }
  }

