import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../servicios/alert.service';
import { LineasAutorizadasService } from '../lineas-autorizadas.service';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { ParametrosLineasAutorizadas } from '../../../../modelo/parametrosLineasAutorizadas';
import { MatrizDecisionLimiteCredito } from '../../../../dto/matrizDecisionLimiteCredito';
import { AdminLineasAutorizadasRequestDTO } from '../../../../dto/adminLineasAutorizadasRequestDTO';
import { MatrizLineasAutorizadasResponse } from '../../../../dto/matrizLineasAutorizadasResponse';
import { CgClasificacionDTO } from '../../../../dto/cgClasificacionDTO';
import { CgMatrizDecisionDTO } from '../../../../dto/CgMatrizDecisionDTO';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { DatosCreacionRegla } from '../../../../dto/getDatosCreacionRegla';

@Component({
  selector: 'app-admin-lineas-autorizadas',
  templateUrl: './admin-lineas-autorizadas.component.html',
  styleUrls: ['./admin-lineas-autorizadas.component.css']
})
export class AdminLineasAutorizadasComponent implements OnInit {
  public idRegion: number;
  public idComponente: number;
  public isValidform: boolean;
  public cbmClasificacion: CgClasificacionDTO[];
  public cbmEstatus: EstatusRequestDTO[];
  public parametros: ParametrosLineasAutorizadas = new ParametrosLineasAutorizadas();

  public response: MatrizLineasAutorizadasResponse [] = [];

    // VAIABLES PARA EL PAGINADOR DE LA TABLA DE RESULTADOS
    public multiplosPaginador: number[] = [5, 10, 15];
    public numeroRegistrosPagina: number = this.multiplosPaginador[0];
    public paginas: any [] = [];
    public numeroPaginas: number;
    public paginaActual: any = [];
    public numeroPaginaActual: number;

    public elementosAAlterar: MatrizDecisionLimiteCredito[] = new Array<MatrizDecisionLimiteCredito>();
    public checkBoxheader: boolean;
    public checkBoxElements: boolean [] = new Array<boolean>();

      // DEPURAR ELIMINAR
  public totalDepurarEliminar: number;
  public totalDepurar: number;
  public totalEliminar: number;

    // RENDERIZA LA ALERTA
    public alertaAdmin: boolean;
    public alertHijos: boolean;

    // CREAR RECLA
    public datos: CgMatrizDecisionDTO = new CgMatrizDecisionDTO();

    // ACTUALIZAR REGLA
    public datosActualiza: CgMatrizDecisionDTO = new CgMatrizDecisionDTO();
    public idSeleccionado: number;
    public nombreRegla: string;
    public estatusClave: string;
    public idClasificacion: number;
    public indexTabla: number;
    private descEstatus: string;

  constructor(public servicios: LineasAutorizadasService,
    private alertService: AlertService) {
    }

  ngOnInit() {
    this.getCgClasificacion();
    this.getCgEstatusregistro();
    this.parametros.idRegion = '9';
    this.parametros.idClasificacion = '-1';
    this.parametros.claveEstatus = '-3';
    this.parametros.nombreRegla = undefined;
    this.idRegion = 9;
    this.idComponente = 172;
    this.clearMessage();
    this.alertaAdmin = false;
    this.isValidform = true;
    this.indexTabla = null;
  }
  // FUNCION QUE SE ENCARGA DE OBTENER EL ID DE LA CATEGORIA
  categoria(id: number) {
    this.clearMessage();
    this.idSeleccionado = id;
    this.alertaAdmin = false;
    this.alertHijos = true;
    console.log('INGRESA A LA FUNCION CATEGORIA CON ID SELECCIONADO ' + this.idSeleccionado);
  }
   // FUNCION QUE SE ENCARGA DE ENVIAR LOS VALORES INICIALES A LA PANTALLA ACTUALIZAR REGLA
   modifica(form: MatrizLineasAutorizadasResponse, index: number) {
    this.clearMessage();
    console.log('INICIA LA FUNCION QUE PASA LOS VALORES INICIALES PARA MODIFICAR LA REGLA');
    this.nombreRegla = form.nombreMatriz;
    this.estatusClave = form.estatusMatriz;
    this.idSeleccionado = form.idMatrizDecision;
    this.indexTabla = index;
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
      this.borraIndexTabla(this.indexTabla);
      // this.cargarDatosTabla();
      // this.paginaActual = this.paginas[this.numeroPaginaActual];
      if (this.datosActualiza.estatus === 'NOMBRE EXISTENTE') {
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null, null);
      }
      if (this.datosActualiza.estatus === 'ERROR ACTUALIZA') {
        this.alertService.error(ConstantesMsg.ERROR_ACTUALIZA_REGLA, null, null);
      } else {
        this.alertService.success(ConstantesMsg.SUCCESS_ACTUALIZAR, null, null);
          this.descEstatus = this.estatusConvert(this.datosActualiza.estatus);
        // tslint:disable-next-line:max-line-length
        this.response.push(new MatrizLineasAutorizadasResponse(this.datosActualiza.idMatrizDecision, this.datosActualiza.nombreMatriz,
          this.datosActualiza.estatus, 0 , this.descEstatus));
      }
  });
}
 // ELIMINA EL REGISTRO POR EL INDEX DE LA TABLA
 borraIndexTabla (index: number) {
  this.response.splice(index, 1);
  }
  buscar() {
    console.log('INICIA LA FUNCION PARA BUSCAR POR PARAMETROS LA MATRIZ DE REGLA');
    // VALIDA LOS PARAMETROS DE ENTRADA DE BUSQUEDA
    this.alertaAdmin = false;
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
         //  this.pushCkeck();
          // INVOCA LA FUNCION PARA EL PAGINADO EN LA TABLA DE RESULTADO
          this.cargarDatosTabla();
          this.paginaActual = this.paginas[this.numeroPaginaActual];
        if (this.response[0].estatusMatriz === 'SIN RESULTADO') {
          this.response = [];
          this.alertService.info(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO, null, null);
        }
      });
    } else {
      this.alertService.error(ConstantesMsg.ERROR_PARAMETROS_VACIO, null, null);
    }
  }
  /*FUNCION QUE SE ENCARGA DE VALIDAR LOS PARAMETROS DE BUSQUEDA */
  validaDatos(): boolean {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE BUSQUEDA');
    if (this.parametros.nombreRegla === undefined &&
      this.parametros.idClasificacion === '-1' &&
      this.parametros.claveEstatus === '-3') {
      return false;
    } else {
      return true;
    }
  }
  /*FUNCION QUE REALIZA EL EVENTO DE CREAR LA REGLA*/
  eventCrearRegla(event): void {
    console.log('INICIA EL EVENTO PARA CREAR LA REGLA');
    this.clearMessage();
    this.datos = event.datos;
    this.datos.usuarioCreacion = 'SYSTEM';
    console.log('NOMBRE REGLA ' + this.datos.nombreMatriz);
    console.log('NOMBRE REGLA ' + this.datos.estatus);
    this.datos.idComponente = this.idComponente;
    this.servicios.crearRegla(this.datos).subscribe((datos) => {
        this.datos = datos;
      if (this.datos.estatus === 'NOMBRE EXISTENTE') {
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null, null);
      } else {
        if (this.datos.estatus === 'ERROR_AL_CREAR_LA_REGLA') {
          this.alertService.error(ConstantesMsg.ERROR_CREAR_REGLA, null, null);
        } else {
          this.alertService.success(ConstantesMsg.SUCCESS_ACTUALIZAR, null, null);
          this.descEstatus = this.estatusConvert(this.datosActualiza.estatus);
        // tslint:disable-next-line:max-line-length
          this.response.push(new MatrizLineasAutorizadasResponse(this.datosActualiza.idMatrizDecision, this.datosActualiza.nombreMatriz,
          this.datosActualiza.estatus, 0 , this.descEstatus));
        }
      }
    });
  }

  boxCheckAll() {
    console.log('INICIA EL EVENTO BOXCHECKALL');
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      this.checkBoxElements[i] = this.checkBoxheader;
    }
  }

  /*FUNCION QUE SE ENCARGA DE QUITAR EL MENSAJE DE ALERTA */
  clearMessage = () => {
    this.alertService.clearMessage();
  }
  /*FUNCION QUE OBTIENE EL CATALOGO DE CLASE DE CREDITO */
  getCgClasificacion() {
    this.servicios.getCgClasificacion(9).subscribe(res => this.cbmClasificacion = res);
  }
  /*FUNCION QUE OBTIENE EL CATALOGO DE ESTATUS REGISTRO */
  getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }
  // // FUNCION QUE SE ENCARGA DE OBTENER EL ID DE LA CATEGORIA
  // categoria(id: number) {
  //   this.idSeleccionado = id;
  //   this.componentePropietarioET = true;
  //   this.componentePropietarioIB = false;
  //   console.log('INGRESA A LA FUNCION CATEGORIA CON ID SELECCIONADO ' + this.idSeleccionado);
  // }
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
  /*FUNCION QUE SE ENCARGA DE DE LIMPIAR LOS PARAMETROS DE BUSQUEDA  */
  limpiarCampos = () => {
    this.parametros.nombreRegla = undefined,
      this.parametros.idClasificacion = '-1',
      this.parametros.claveEstatus = '-3',
    this.clearMessage();
  //  this.checkBoxheaderSelected = false;
    this.response = [];
    this.checkBoxheader = false;
    this.checkBoxElements = [];
    // this.numeroPaginas = 0;
    // this.numeroPaginaActual = 0;
    // this.paginaActual = [];
    // this.paginas = [];
 //   this.pushCkeck();
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
      estatusConvert(searchVal) {
        for (let i = 0; i < this.cbmEstatus.length; i++) {
          const currentEst = this.cbmEstatus[i];
          if (currentEst.clave === searchVal) {
            return currentEst.descripcion;
          }
        }
      }

}
