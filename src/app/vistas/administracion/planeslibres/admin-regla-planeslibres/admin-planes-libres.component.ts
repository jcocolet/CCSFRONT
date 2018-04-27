import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ParametrosAdmPlanesLibres } from './../../../../modelo/parametros-admPlanesLibres';
import { funcionesUtil } from './../../../../utiles/funciones.util';

//DTO
import { ClaseCreditoRequestDTO } from '../../../../dto/getClaseCreditoRequestDTO';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { ComponenteDTO } from '../../../../dto/ComponenteDTO';
import { ClonarReglaRequestDTO } from '../../../../dto/clonarReglaRequestDTO';
import { MatrizAdmPlanLibres } from '../../../../modelo/MatrizAdmPlanLibres';

import { CgSiNo } from '../../../../modelo/cgSiNO.model'
import { ConstantesMsg } from './../../../../../assets/constantesMsg';
import { AdmPlanesLibresMatrizDTO } from '../../../../dto/AdmPlanesLibresMatrizDTO';
import { CategoriaPlanesLibresComponent } from '../categoria/categoria-planes-libres.component'
import { BuscarDetalle } from '../../../../modelo/buscarDetalle';

import { AlertService } from '../../../../servicios/alert.service';
import { AdminPlanesLibresService } from '../admin-planes-libres.service';
import { Constants } from '../../../../utiles/constants';
import { EliminarDepurar } from '../../../../dto/eliminarDepurar';
@Component({
  selector: 'app-admin-planes-libres',
  templateUrl: './admin-planes-libres.component.html',
  styleUrls: ['./admin-planes-libres.component.css']
})
export class AdminPlanesLibresComponent implements OnInit {

  public componente: ComponenteDTO = new ComponenteDTO();
  public idRegion: number;
  public idComponente: number;
  public cbmClaseCredito: ClaseCreditoRequestDTO[];
  public cbmEstatus: EstatusRequestDTO[];
  public cboCgSiNo: CgSiNo[];
  public parametros: ParametrosAdmPlanesLibres = new ParametrosAdmPlanesLibres();
  public response: AdmPlanesLibresMatrizDTO[] = [];
  public responseClonar: AdmPlanesLibresMatrizDTO;
  public tablaVacia: AdmPlanesLibresMatrizDTO[] = [];

  public idSeleccionado: number;
  public nombreRegla: string;
  public indexTabla: number;
  private descEstatus: string;
  public estatusClave: string;
  public descClaseCredito: string;
  public descConsDeposito: string;
  public datos: AdmPlanesLibresMatrizDTO = new AdmPlanesLibresMatrizDTO();
  public datosActualiza: AdmPlanesLibresMatrizDTO = new AdmPlanesLibresMatrizDTO();
  // ELIMINAR
  //public elementosAAlterar: MatrizRangoEquipoResponseDTO[] = new Array<MatrizRangoEquipoResponseDTO>();
  ///public checkBoxheaderSelected: boolean;
  public checkBoxheader: boolean;
  //public checkBoxElements: boolean[] = new Array<boolean>();

  // RENDERIZA LA ALERTA
  public banderaModal: boolean;
  public componentePropietarioET: boolean;
  public componentePropietarioIB: boolean;
  public lstDetalle: MatrizAdmPlanLibres[] = [];
  public parametrosDetalle: BuscarDetalle = new BuscarDetalle();


  // VAIABLES PARA EL PAGINADOR DE LA TABLA DE RESULTADOS
  public multiplosPaginador: number[] = [5, 10, 15];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any[] = [];
  public numeroPaginas: number;
  public paginaActual: any = [];
  public numeroPaginaActual: number;

  //
  public elementosAAlterar: AdmPlanesLibresMatrizDTO[] = new Array<AdmPlanesLibresMatrizDTO>();
  public totalDepurarEliminar: number;
  public totalDepurar: number;
  public totalEliminar: number;

  // constructor(){}

  constructor(public servicios: AdminPlanesLibresService,
    private alertService: AlertService) {
    //PRODUCCION
    this.parametros.idRegion = 9;
    this.parametros.claveComponente = Constants.CLAVECOMPONENTE;
    this.banderaModal = false;
    //this.isValidform = true;
    this.clearMessage();
    this.getComponente();
  }

  ngOnInit() {
    //INICIALIZA VARIABLES 
    this.idRegion = 9;
    //METODOS INICIALES
    this.getCgEstatusregistro();
    this.getCgClaseCredito();
    this.getCGSiNo();
    
  }
  
  getComponente(){
    this.servicios.getComponente(this.parametros.claveComponente , this.parametros.idRegion).subscribe((res) => {
      this.componente = res;
     this.idComponente = this.componente.idComponente;
    });

  }


  eventCrearRegla(event): void {
    console.log('INICIA EL EVENTO PARA CREAR LA REGLA');
    this.clearMessage();
    this.datos = event.datos;
    this.datos.idComponente = this.idComponente;
    this.servicios.crearRegla(this.datos).subscribe((datos) => {
        this.datos = datos;
      if (this.datos.estatus === 'NOMBRE EXISTENTE') {
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE,  '' , '');
      } else {
        if (this.datos.estatus === 'ERROR_AL_CREAR_LA_REGLA') {
          this.alertService.error(ConstantesMsg.ERROR_CREAR_REGLA,  '' , '');
        } else {
          //this.descEstatus = this.estatusConvert(this.datos.estatus);
          let newDato = new AdmPlanesLibresMatrizDTO();
          newDato.seleccionado = false;
          newDato.idMatrizDecision = this.datos.idMatrizDecision;
          newDato.nombreMatriz = this.datos.nombreMatriz;
          newDato.estatusMatriz = this.datos.estatus ; 
          newDato.descripcionEstatusMat = this.estatusConvert(newDato.estatusMatriz);
          newDato.estatus = this.datos.estatus ; 
          newDato.idComponente = this.idComponente;
          this.response.push(newDato);
        }
      }
    });
  }

  buscarPL = () => {
    console.log('INICIA LA FUNCION PARA BUSCAR POR PARAMETROS LA MATRIZ DE REGLA');
    //VALIDA PARAMETROS DE BUSQUEDA
    this.clearMessage();
    if (this.validaDatosBusqueda()) {
      // REALIZA LA PETICION AL SERVICIO PARA REALIZAR LA CONSULTA DE INFORMACION
      this.servicios.getBusqueda(this.parametros).subscribe((data) => {
        this.response = data;
        // RESETEA LOS CHECK DE LA TABLA COMO INABILITADOS
        this.pushCkeck();
        // INVOCA LA FUNCION PARA EL PAGINADO EN LA TABLA DE RESULTADO
        this.cargarDatosTabla();
        this.paginaActual = this.paginas[this.numeroPaginaActual];
        if (this.response[0].estatusMatriz === 'SIN RESULTADO') {
          this.response = this.tablaVacia;
          this.alertService.info(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO,  '' , '');
        }
      });
    } else {
      this.alertService.error(ConstantesMsg.ERROR_PARAMETROS_VACIO,  '' , '');
    }
    setTimeout(() => { this.clearMessage(); }, 1200);
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
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE,  '' , '');
      }
      if (this.datosActualiza.estatus === 'ERROR ACTUALIZA') {
        this.alertService.error(ConstantesMsg.ERROR_ACTUALIZA_REGLA,  '' , '');
      } else {
        // ELIMINA EL RESITRO SELECCIONADO DE LA LISTA DE RESULTADO
        this.borraIndexTabla(this.indexTabla);
        this.alertService.success(ConstantesMsg.SUCCESS_ACTUALIZAR,  '' , '');
        // SE OBTIENE LA DESCRIPCION DEL ESTATUS DE REGISTRO
        //this.datosActualiza.descripcionEstatusMat = this.estatusConvert(this.datosActualiza.estatus);
        console.log('estatus de la regla' + this.descEstatus);
        // AGREGA EL REGISTRO ACTUALIZADO A LA LISTA
        this.response.push(this.datosActualiza);
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
        this.alertService.error(ConstantesMsg.ERROR_CLONACION_REGLA,  '' , '');
      }
      if (this.responseClonar.estatusMatriz === 'ERROR_NOMBRE_MAYOR250') {
        this.alertService.error(ConstantesMsg.ERROR_CLONACION_REGLA_MAX_NOMBRE,  '' , '');
      } else {
        this.alertService.info(ConstantesMsg.SUCCESS_CLONACION_REGLA + ' ' + this.responseClonar.nombreMatriz +
          ' ' + ConstantesMsg.SUCCESS_CORRECTAMENTE, '', '');
      }
    });
  }


  estatusConvert(searchVal) {
    for (let i = 0; i < this.cbmEstatus.length; i++) {
      const currentEst = this.cbmEstatus[i];
      if (currentEst.clave === searchVal) {
        return currentEst.descripcion;
      }
    }
  }

  borraIndexTabla(index: number) {
    this.response.splice(index, 1);
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
      if (contador === this.numeroRegistrosPagina) {
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

  // FUNCION QUE SE ENCARGA DE DESELECCIONAR LOS CHECK DE LA TABLA DE RESULTADOS
  pushCkeck() {
    this.checkBoxheader = false;
    //this.checkBoxElements = [];
    for (let i = 0; i < this.response.length; i++) {
      this.response[i].seleccionado=false;
    }
  }

  validaDatosBusqueda(): Boolean {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE BUSQUEDA');
    if (this.parametros.nombreRegla === '' &&
      (this.parametros.nombreRegla).trim() === '' &&
      this.parametros.idRegion === -1 &&
      this.parametros.clasecredito === '-1' &&
      this.parametros.consDeposito === '-1' &&
      this.parametros.claveEstatus === '-3') {
      return false;
    } else {
      return true;
    }

  }

  // FUNCION QUE SE ENCARGA DE ENVIAR LOS VALORES INICIALES A LA PANTALLA MODIFICA REGLA
  modifica(form: AdmPlanesLibresMatrizDTO, index: number) {
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

  verDetalle(evento, result) {
    console.log('INICIA EL EVENTO PARA OBTENER EL DETALLE LA REGLA');
    this.lstDetalle = [];
    this.parametrosDetalle.idMatrizDecision = result.idMatrizDecision;
    this.nombreRegla = result.nombreMatriz;
    this.estatusClave = result.estatusMatriz;
    this.idSeleccionado = result.idMatrizDecision;
    this.clearMessage();
    this.pushCkeck();
    // REALIZA LA PETICION AL SERVICIO PARA OBTENER EL DETALLE DE LA REGLA
    this.servicios.getMatrizAdmPlanLibres(this.parametrosDetalle).subscribe(
      (data) => {
        // SE ASINA EL VALOR DEVUELTO POR EL SERVICO A LA LISTA DE DETALLE 
        this.lstDetalle = data;
        if (this.lstDetalle.length > 0) {
          if (this.lstDetalle[0].estatus === 'VACIO') {
            this.lstDetalle = [];
          }
        }
        if (this.lstDetalle.length <= 0) {
          this.lstDetalle = [];
        }
      });
  }

  borrarSeleccionados() {
    this.clearMessage();
    console.log('INICIA EL EVENTO BORRARSELECCIONADO');
    this.elementosAAlterar = [];
    for (let i = 0; i < this.response.length; i++) {
      if (this.response[i].seleccionado) {
         this.elementosAAlterar.push(this.response[i]);
      }
    }
    // ENVOSCA LA FUNCION PARA OBTENER LOS VALORES INICIALES AL DESPLEGAR EL DIALOGO DE DEPURAR Y ELIMINAR
    this.asignaValoresInicialesDepurarEliminar();
  }

  borrarSeleccionado(result: AdmPlanesLibresMatrizDTO, index: number) {
    this.elementosAAlterar.push(result);
    this.indexTabla = index;
  }

  // FUNCION QUE INICIALIZA LOS VALORES AL DIALOGO DE ELIMINAR Y DEPURAR REGLAS
  asignaValoresInicialesDepurarEliminar() {
    console.log('INICIA EL EVENTO PARA ASIGNAR LOS VALORES INICIALES A DIALOGO DE DEPURAR Y ELIMINAR');
    const contadorTotal = this.response.length;
    let contadorDepuarar = 0;
    let contadorEliminar = 0;
    for (let i = 0; i < this.response.length; i++) {
      if (this.response[i].seleccionado) {
        if (this.response[i].estatusMatriz === 'D') {
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

  eliminarRegistro(): void {
    this.servicios.depurarReglas(this.elementosAAlterar).subscribe((res) => {
        if (res && res.length > 0) {
          for (; this.elementosAAlterar.length > 0;) {
            const elemento = this.elementosAAlterar.splice(0, 1);
            elemento[0].estatusMatriz = 'D';
          }
          this.alertService.success(ConstantesMsg.SUCCESS_DEPURAR_ELIMINAR, null, '');
        } else {
          this.alertService.error('NO SE PUDO DEPURAR EL(LOS) REGISTRO(S).', null, '');
        }
    });
    this.borraIndexTabla(this.indexTabla);
    this.pushCkeck();
  }

  validarDatosSeleccionados() {
    let vacio = true;
    for (let i = 0; i < this.response.length; i++) {
      if (this.response[i]) {
        vacio = false;
      }
    }
    return !vacio;
  }
  /*FUNCION QUE OBTIENE EL CATALOGO DE ESTATUS REGISTRO */
  getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }

  /*FUNCION QUE OBTIENE EL CATALOGO DE CLASE DE CREDITO */
  getCgClaseCredito() {
    this.servicios.getClaseCredito(9).subscribe(res => this.cbmClaseCredito = res);
  }

  getCGSiNo() {
    this.servicios.getCgSiNo(this.idRegion).subscribe(res => this.cboCgSiNo = res);
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

  /*FUNCION QUE SE ENCARGA DE QUITAR EL MENSAJE DE ALERTA */
  clearMessage = () => {
    this.alertService.clearMessage();
  }

  boxCheckAll() {
    console.log('INICIA EL EVENTO BOXCHECKALL2');
    for (let i = 0; i < this.response.length; i++) {
        this.response[i].seleccionado = this.checkBoxheader;
    }
  }

  categoria(id: number, idComp: number) {
    console.log('INGRESA A LA FUNCION CATEGORIA CON ID SELECCIONADO ' + this.idSeleccionado);
    this.idSeleccionado = id;
    this.componentePropietarioET = true;
    this.componentePropietarioIB = false;
    this.banderaModal = true;
  }
}
