import { ConstantesMsg } from './../../../../../assets/constantesMsg';
import { BuscarDetalle } from './../../../../modelo/buscarDetalle';
import { AdministracionModule } from './../../administracion.module';
import { DetalleDepoGarantiaPLibresDTO } from './../../../../dto/detalledepoGarantiaPLibresDTO';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DepositoGarantiaPLibresService } from '../deposito-garantia-libre.service';
import { ParametrosDepGPlanesLibres } from '../../../../modelo/parametrosDepGPlanesLibres';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ClaseCreditoRequestDTO } from '../../../../dto/getClaseCreditoRequestDTO';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { DepGarantiaPLibresDTO } from '../../../../dto/depGarantiaPLibresDTO';
import { BajaReglasRequestDTO } from '../../../../dto/bajaReglasRequestDTO';
import { ClonarReglaRequestDTO } from '../../../../dto/clonarReglaRequestDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { DatosCreacionRegla } from '../../../../dto/getDatosCreacionRegla';
import { CrearReglaResponseDTO } from '../../../../dto/CrearReglaResponseDTO';
import { GetMatrizDecisionDepoGarantiaPLibresDTO } from '../../../../dto/getMatrizDecisionDepoGarantiaPLibreDTO';
import { DecimalPipe } from '@angular/common';
import { MatrizRangoEquipoResponseDTO } from '../../../../dto/matrizRangoEquipoResponseDTO';
import { EliminarDepurarDepoPLibres } from '../../../../dto/eliminarDepurarDepoPLibres';

@Component({
  selector: 'app-admin-depo-garantia-libre',
  templateUrl: './admin-depo-garantia-libre.component.html',
  styleUrls: ['./admin-depo-garantia-libre.component.css']
})
export class AdminDepositoGarantiaLibreComponent implements OnInit {
  public loading: boolean;
  public idRegion: number;
  public idComponente: number;
  public cbmClasecredito: ClaseCreditoRequestDTO[];
  public cbmEstatus: EstatusRequestDTO[];
  public parametros: ParametrosDepGPlanesLibres = new ParametrosDepGPlanesLibres();
  public isValidform: boolean;
  public activaProgreso: boolean;
  public avanzaProgreso: string;
  public message: any;
  public response: DepGarantiaPLibresDTO[] = [];
  public responseClonar: DepGarantiaPLibresDTO;
  public tablaVacia: DepGarantiaPLibresDTO[] = [];
  public checkBoxheaderSelected: boolean;
  public registros: BajaReglasRequestDTO = new BajaReglasRequestDTO();
  public lstDetalle: DetalleDepoGarantiaPLibresDTO [] = [];
  public parametrosDetalle: BuscarDetalle = new BuscarDetalle();

  // VAIABLES PARA EL PAGINADOR DE LA TABLA DE RESULTADOS
  public multiplosPaginador: number[] = [5, 10, 15];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any [] = [];
  public numeroPaginas: number;
  public paginaActual: any = [];
  public numeroPaginaActual: number;
  //

  public idSeleccionado: number;
  public nombreRegla: string;
  public estatusClave: string;
  public desClaseCredito: string;
  public minimPorte: number;
  public maximporte: number;
  public deposito: number;
  public indexTabla: number;
  private descEstatus: string;

  public datos: GetMatrizDecisionDepoGarantiaPLibresDTO = new GetMatrizDecisionDepoGarantiaPLibresDTO();
  public responseRegla: CrearReglaResponseDTO [] = [];
  public datosActualiza: GetMatrizDecisionDepoGarantiaPLibresDTO = new GetMatrizDecisionDepoGarantiaPLibresDTO();


  // ELIMINAR
  public elementosAAlterar: EliminarDepurarDepoPLibres[] = new Array<EliminarDepurarDepoPLibres>();
  public checkBoxheader: boolean;
  public checkBoxElements: boolean [] = new Array<boolean>();

  // DEPURAR ELIMINAR
  public totalDepurarEliminar: number;
  public totalDepurar: number;
  public totalEliminar: number;

  // RENDERIZA LA ALERTA
  public componentePropietarioET: boolean;
  public componentePropietarioIB: boolean;

  constructor(public servicios: DepositoGarantiaPLibresService,
    private alertService: AlertService) {
    this.isValidform = true;
    this.clearMessage();
  }

  ngOnInit() {
    this.checkBoxheaderSelected = false;
    this.getCgClaseCredito();
    this.getCgEstatusregistro();
    this.parametros.idRegion = '9';
    this.parametros.clasecredito = '-1';
    this.parametros.clave = '-3';
    this.parametros.nombreRegla = undefined;
    this.parametros.minimporte = undefined;
    this.parametros.maximporte = undefined;
    this.parametros.deposito = undefined;
    this.idRegion = 9;
    this.idComponente = 2;
    this.clearMessage();
    // this.numeroPaginas = 0;
    // this.numeroPaginaActual = 0;
    // this.paginaActual = [];
    // this.paginas = [];
    this.indexTabla = null;
    this.componentePropietarioET = false;
    this.componentePropietarioIB = true;
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
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null,null);
      } else {
        if (this.datos.estatus === 'ERROR_AL_CREAR_LA_REGLA') {
          this.alertService.error(ConstantesMsg.ERROR_CREAR_REGLA, null,null);
        } else {
          this.descEstatus = this.estatusConvert(this.datos.estatus);
        this.response.push(new DepGarantiaPLibresDTO(this.datos.idMatrizDecision, this.datos.nombreMatriz,
          this.datos.estatus, 0 , this.descEstatus));
        }
      }
    },
    err => {
      console.log('ERROR AL CREAR LA REGLA');
    });
  }
    // FUNCION QUE SE ENCARGA DE ENVIAR LOS VALORES INICIALES A LA PANTALLA MODIFICA REGLA
    modifica(form: DepGarantiaPLibresDTO, index: number) {
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
    this.datosActualiza.usuarioModificacion = 'EVERIS a';
    this.datosActualiza = event.datos;
    this.datosActualiza.idComponente = this.idComponente;
    // INVOCA EL SERVICIO PARA ACTUALIZAR LA REGLA
    this.servicios.actualizaRegla(this.datosActualiza).subscribe((datos) => {
        this.datosActualiza = datos;
        // this.cargarDatosTabla();
        // this.paginaActual = this.paginas[this.numeroPaginaActual];
        if (this.datosActualiza.estatus === 'NOMBRE EXISTENTE') {
          this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null,null);
        }
        if (this.datosActualiza.estatus === 'ERROR ACTUALIZA') {
          this.alertService.error(ConstantesMsg.ERROR_ACTUALIZA_REGLA, null,null);
        } else {
          // ELIMINA EL RESITRO SELECCIONADO DE LA LISTA DE RESULTADO
          this.borraIndexTabla(this.indexTabla);
          this.alertService.success(ConstantesMsg.SUCCESS_ACTUALIZAR, null,null);
          // SE OBTIENE LA DESCRIPCION DEL ESTATUS DE REGISTRO
          this.descEstatus = this.estatusConvert(this.datosActualiza.estatus);
          console.log('estatus de la regla' + this.descEstatus);
          // AGREGA EL REGISTRO ACTUALIZADO A LA LISTA
          this.response.push(new DepGarantiaPLibresDTO(this.datosActualiza.idMatrizDecision, this.datosActualiza.nombreMatriz,
            this.datosActualiza.estatus, 0 , this.descEstatus));
        }
    });
  }
  /*FUNCION QUE REALIZA LA BUSQUEDA POR PARAMETROS*/
  buscar = () => {
    console.log('INICIA LA FUNCION PARA BUSCAR POR PARAMETROS LA MATRIZ DE REGLA');
    this.componentePropietarioET = false;
    this.componentePropietarioIB = true;
    // VALIDA LOS PARAMETROS DE ENTRADA DE BUSQUEDA
    this.clearMessage();
    if (this.validaDatos()) {
      // REALIZA LA PETICION AL SERVICIO PARA REALIZAR LA CONSULTA DE INFORMACION
      this.servicios.getBusqueda(this.parametros).subscribe((data) => {

          this.response = data;
          for (let i = 0; i < this.response.length; i++) {
            const stat = this.response[i].estatusMatriz;
            this.response[i].descEstatus = this.estatusConvert(stat);
            this.checkBoxElements.push(false);
          }
           // RESETEA LOS CHECK DE LA TABLA COMO INABILITADOS
        //   this.pushCkeck();
          // INVOCA LA FUNCION PARA EL PAGINADO EN LA TABLA DE RESULTADO
       //   this.cargarDatosTabla();
        //  this.paginaActual = this.paginas[this.numeroPaginaActual];
        if (this.response[0].estatusMatriz === 'SIN RESULTADO') {
          this.response = this.tablaVacia;
          this.alertService.info(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO, null,null);
        }
      });
    } else {
      this.alertService.error(ConstantesMsg.ERROR_PARAMETROS_VACIO, null,null);
      this.response = this.tablaVacia;
    }
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
  // FUNCION QUE SE ENCARGA DE DESELECCIONAR LOS CHECK DE LA TABLA DE RESULTADOS
  pushCkeck() {
    this.checkBoxheader = false;
    this.checkBoxElements = [];
    for (let i = 0; i < this.response.length; i++) {
       this.checkBoxElements.push(false);
     }
  }
  /*FUNCION QUE SE ENCARGA DE VALIDAR LOS PARAMETROS DE BUSQUEDA */
  validaDatos(): boolean {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE BUSQUEDA');
    console.log('ESTATUS' +  this.parametros.clave);
    if (this.parametros.nombreRegla === undefined &&
      this.parametros.clasecredito === '-1' &&
      this.parametros.clave === '-3' &&
      this.parametros.minimporte === undefined &&
      this.parametros.maximporte === undefined &&
      this.parametros.deposito === undefined ) {
      return false;
    } else {
      return true;
    }

  }
  /*FUNCION QUE SE ENCARGA DE DESPLEGAR EL DETALLE DE MATRIZ DE REGLA*/
  verDetalle(evento, result) {
    console.log('INICIA EL EVENTO PARA OBTENER EL DETALLE LA REGLA');
    this.idSeleccionado = result.idMatrizDecision;
    this.nombreRegla = result.nombreMatriz;
    this.estatusClave = result.descEstatus;
    this.parametrosDetalle.idMatrizDecision = this.idSeleccionado;
    this.idRegion = result.idRegion;
    this.clearMessage();
    this.pushCkeck();
    // REALIZA LA PETICION AL SERVICIO PARA OBTENER EL DETALLE DE LA REGLA
    this.servicios.getDetalleDepoGarantiaPLibres(this.parametrosDetalle).subscribe(
      (data) => {
         // SE ASINA EL VALOR DEVUELTO POR EL SERVICO A LA LISTA DE DETALLE 
         this.lstDetalle = data;
         // VALIDA SI LA RESPUESTA ES VACIA
         if (this.lstDetalle[0].desClaseCredito !== 'SIN RESULTADO') {
           // this.cargarDatosTabla();
           // this.paginaActual = this.paginas[this.numeroPaginaActual];
         }
      });
  }

  /*FUNCION QUE SE ENCARGA DE CLONAR EL REGISTRO SELECCIOANDO DE LA TABLA DE RESULTADO*/
  clonarRegla(evento, result) {
    this.componentePropietarioET = false;
    this.componentePropietarioIB = true;
    this.clearMessage();
    this.pushCkeck();
    this.idSeleccionado = result.idMatrizDecision;
    this.servicios.clonarRegla(new ClonarReglaRequestDTO(this.idSeleccionado)).subscribe((response) => {
        this.responseClonar = response;
      if (this.responseClonar.estatusMatriz === 'ERROR_CLONACION') {
        this.alertService.error(ConstantesMsg.ERROR_CLONACION_REGLA, null,null);
      }
      if (this.responseClonar.estatusMatriz === 'ERROR_NOMBRE_MAYOR250') {
        this.alertService.error(ConstantesMsg.ERROR_CLONACION_REGLA_MAX_NOMBRE, null,null);
      } else {
        this.alertService.success(ConstantesMsg.SUCCESS_CLONACION_REGLA + ' ' + ConstantesMsg.SUCCESS_CORRECTAMENTE, '', null);
      }
    });
  }

  /*FUNCION QUE SE ENCARGA DE DE LIMPIAR LOS PARAMETROS DE BUSQUEDA  */
  limpiarCampos = () => {
    this.componentePropietarioET = false;
    this.componentePropietarioIB = true;
    this.parametros.nombreRegla = undefined,
    this.parametros.clasecredito = '-1',
    this.parametros.clave = '-3',
    this.parametros.maximporte = undefined,
    this.parametros.minimporte = undefined,
    this.parametros.deposito = undefined;
    this.clearMessage();
    this.checkBoxheaderSelected = false;
    this.response = this.tablaVacia;
    this.checkBoxheader = false;
    this.checkBoxElements = [];
    this.numeroPaginas = 0;
    this.numeroPaginaActual = 0;
    this.paginaActual = [];
    this.paginas = [];
    this.pushCkeck();
  }

  boxCheckAll() {
    console.log('INICIA EL EVENTO BOXCHECKALL');
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      this.checkBoxElements[i] = this.checkBoxheader;
    }
  }
  borrarSeleccionados() {
    this.clearMessage();
    console.log('INICIA EL EVENTO BORRARSELECCIONADO');
    this.elementosAAlterar = [];
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      if (this.checkBoxElements[i]) {
         this.elementosAAlterar.push(this.response[i]);
      }
    }
    // ENVOSCA LA FUNCION PARA OBTENER LOS VALORES INICIALES AL DESPLEGAR EL DIALOGO DE DEPURAR Y ELIMINAR
    this.asignaValoresInicialesDepurarEliminar();
  }
  // FUNCION QUE INICIALIZA LOS VALORES AL DIALOGO DE ELIMINAR Y DEPURAR REGLAS
  asignaValoresInicialesDepurarEliminar() {
    console.log('INICIA EL EVENTO PARA ASIGNAR LOS VALORES INICIALES A DIALOGO DE DEPURAR Y ELIMINAR');
    const contadorTotal = this.response.length;
    let contadorDepuarar = 0;
    let contadorEliminar = 0;
    for (let i = 0; i < this.response.length; i++) {
      if (this.checkBoxElements[i]) {
        const elemento = this.response;
        if (elemento[i].estatusMatriz === 'D') {
          contadorEliminar++;
        } else {
          contadorDepuarar++;
        }
      }
    }
    this.totalDepurarEliminar = contadorTotal;
    this.totalDepurar = contadorDepuarar;
    this.totalEliminar = contadorEliminar;
  }
  // FUNCION QUE SE ENCARGA DE VALIDAR LOS DATOS SELECCIONADOS DE LA TABLA DE RESULTADOS
  validarDatosSeleccionados() {
    let vacio = true;
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      if (this.checkBoxElements[i]) {
        vacio = false;
      }
    }
    return !vacio;
  }
  emptyChkBox() {
    this.alertService.error('NO HAY NINGuN ELEMENTO SELECCIONADO.', null,null);
  }
  // AGREGA A LA LISTA LOS REGISTROS A ELIMINAR
  borrarSeleccionado(result: MatrizRangoEquipoResponseDTO, index: number) {
    this.elementosAAlterar.push(result);
    this.indexTabla = index;
  }

  // FUNCION QUE SEENCARGA DE ACTUALIZAR EL ESTATUS DE DEPURAR 
  // Y SI EL ESTATUS ESTA DE DEPURAR ELIMINA EL REGISTRO DE LA BASE DE DATOS
  eliminarRegistro(): void {
    this.servicios.depurarReglas(this.elementosAAlterar).subscribe((res) => {
        if (res && res.length > 0) {
          for (; this.elementosAAlterar.length > 0;) {
            const elemento = this.elementosAAlterar.splice(0, 1);
            elemento[0].estatusMatriz = 'D';
          }
          this.alertService.success(ConstantesMsg.SUCCESS_DEPURAR_ELIMINAR, null,null);
        } else {
          this.alertService.error('NO SE PUDO DEPURAR EL(LOS) REGISTRO(S).', null,null);
        }
    });
    this.borraIndexTabla(this.indexTabla);
    this.pushCkeck();
  }

  // ELIMINA EL REGISTRO POR EL INDEX DE LA TABLA
  borraIndexTabla (index: number) {
  this.response.splice(index, 1);
  }

  /*FUNCION QUE SE ENCARGA DE QUITAR EL MENSAJE DE ALERTA */
  clearMessage = () => {
    this.alertService.clearMessage();
  }
  /*FUNCION QUE OBTIENE EL CATALOGO DE CLASE DE CREDITO */
  getCgClaseCredito() {
    this.servicios.getClaseCredito(9).subscribe(res => this.cbmClasecredito = res);
  }
  /*FUNCION QUE OBTIENE EL CATALOGO DE ESTATUS REGISTRO */
  getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }
  // FUNCION QUE SE ENCARGA DE OBTENER EL ID DE LA CATEGORIA
  categoria(id: number) {
    this.idSeleccionado = id;
    this.componentePropietarioET = true;
    this.componentePropietarioIB = false;
    console.log('INGRESA A LA FUNCION CATEGORIA CON ID SELECCIONADO ' + this.idSeleccionado);
  }
  /*FUNCION QUE SE ENCARGA DE LA ACCION DE SIGUIENTE PAGUINA DEL PAGINADO */
  siguientePagina() {
    console.log('INICIA EL EVENTO PAGINA SIGUIENTE');
    this.numeroPaginaActual++;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }
  paginaAnterior() {
    console.log('INICIA EL EVENTO PAGINA ANTERIOR');
    this.numeroPaginaActual--;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }
  establecerRegistrosMostrar(evento) {
    console.log('INICIA EL EVENTO PAGINA ACTUAL' + evento.target.value);
    this.numeroRegistrosPagina = evento.target.value;
    this.cargarDatosTabla();
    this.numeroPaginaActual = 0;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }
  cargarDatosTabla() {
    console.log('INICIA EL EVENTO CARGA DATOS A LA TABLA');
    let pagina = [];
    let contador = 0;
    this.numeroPaginas = Math.ceil(this.response.length / this.numeroRegistrosPagina);
    if (this.paginas.length > 0) {
      this.paginas = [];
    }
    for (let i = 0; i < this.response.length; i++) {
      pagina.push(this.response[i]);
      console.log('itera push pagina ' + pagina.push(this.response[i]));
      contador++;
      if(contador === this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
        contador = 0;
        pagina = [];
        console.log('contador' + pagina);
        continue;
      }
    }
    if (pagina.length < this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
    }
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
}
