import { Component, OnInit, Input} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ClaseCreditoRequestDTO } from '../../../../dto/getClaseCreditoRequestDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { DepositoGarantiaPLibresService } from '../deposito-garantia-libre.service';
import { MatrizDepoGarantiaPLibres } from '../../../../modelo/matrizDepoGarantiaPLibres';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { CrearMatrizService } from './crear-matriz.service';
import { AccionRespuestaRequestDTO } from '../../../../dto/getAccionRespuestaRequestDTO';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { BuscarDetalle } from '../../../../modelo/buscarDetalle';
import { MatrizRangoEquipoResponseDTO } from '../../../../dto/matrizRangoEquipoResponseDTO';
import { CategoriaRequestDTO } from '../../../../dto/getCategoriaRequestDTO';
import { TipoReglaDTO } from '../../../../dto/tipoReglaDTO';



@Component({
  selector: 'app-crear-matriz-depo-garantia-libres',
  templateUrl: './crear-matriz-depo-garantia-libres.component.html',
  styleUrls: ['./crear-matriz-depo-garantia-libres.component.css'],
})
export class CrearMatrizDepoGarantiaLibresComponent implements OnInit {
  public cbmClasecredito: ClaseCreditoRequestDTO[];
  public cmbAccionRespuesta: AccionRespuestaRequestDTO[];
  public cmbTipoRegla: TipoReglaDTO[];
  public selectClasecredito: ClaseCreditoRequestDTO;
  public cbmEstatus: EstatusRequestDTO[];

  public checksSeleccionadosTabla: any[] = [];
  public multiplosPaginador: number[] = [5, 10, 15];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any [] = [];
  public numeroPaginas: number;
  public paginaActual: any = [];
  public numeroPaginaActual: number;
  public cachePaginas: any[] = [];

  public isValidform: boolean;
  public response: MatrizDepoGarantiaPLibres;
  public tooltipDescClaseCredito: string;
  @Input() public componentePropietarioIB: boolean;

  public form: MatrizDepoGarantiaPLibres = new MatrizDepoGarantiaPLibres();
  @Input() public lstMatriz: MatrizDepoGarantiaPLibres [] = [];
 // @Input() public idCategoriaSelect: number [] = [];
  @Input() public lstCategoriaSelect: CategoriaRequestDTO[] = [];
  @Input() public idMatrizDecision: number;
  public btnActualiza: boolean;
  public btnAgrega: boolean;
  public btnGuarda: boolean;
  public txtAreaSi: boolean;
  public txtAreaNo: boolean;
  public parametrosDetalle: BuscarDetalle = new BuscarDetalle();
  public parametrosEliminar: BuscarDetalle = new BuscarDetalle();
  private descClaseCredito: string;
  public idClasecredito: number;
  public elementosAAlterar: MatrizRangoEquipoResponseDTO[] = new Array<MatrizRangoEquipoResponseDTO>();
  private resultEliminar: string;

   constructor(private servicios: DepositoGarantiaPLibresService,
   private alertService: AlertService, public _crearMatriz: CrearMatrizService) {this.clearMessage(); }

  ngOnInit() {
    this.getCgClaseCredito();
    this.getCgEstatusregistro();
    this.getCgAccionRespuesta();
    this.getCstipoRegla();
    this.resetBtn();
    this.form = new MatrizDepoGarantiaPLibres();
    this.form.estatus = '-3';
    this.form.idClaseCredito = '-1';
    this.form.idAccionSiDep = '-1';
    this.form.idAccionNoDep = '-1';
    this.form.idTipoRegla = '-1';
    this.habilitaBtnGuardar();
    this.clearMessage();
    this.isValidform = true;
    this.limpiar();
    this.txtAreaSi = false;
    this.txtAreaNo = false;
  }
  activatextAreaSi(select: string) {
    console.log('SELECT ID COMBO' + select);
    if (this.txtAreaConvert(select) === 'AUTO') {
      this.txtAreaSi = true;
      this.form.descMsjSiCumpleDep = undefined;
    } else {
      this.txtAreaSi = false;
    }
    console.log('HABILTA TXT AREA ' + this.txtAreaSi);
  }
  activatextAreaNo(select: string) {
    console.log('SELECT ID COMBO' + select);
    if (this.txtAreaConvert(select) === 'AUTO') {
      this.txtAreaNo = true;
      this.form.descMsjNoCumpleDep = undefined;
    } else {
      this.txtAreaNo = false;
    }
    console.log('HABILTA TXT AREA ' + this.txtAreaNo);
  }
  txtAreaConvert(searchVal) {
    for (let i = 0; i < this.cmbAccionRespuesta.length; i++) {
      const currentEst = this.cmbAccionRespuesta[i];
      console.log('accion ' + currentEst.accion);
        console.log('accion id ' + currentEst.idAccion);
        console.log('accion obj' + currentEst);
      if (currentEst.idAccion === parseInt(searchVal, 10)) {
        return currentEst.accion;
      }
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
  guardar() {
    console.log('GUARDAR');
    this.clearMessage();
    if (this.lstMatriz.length > 0) {
      this.servicios.crearMatrizDepoGarantiaPLibres(this.lstMatriz).subscribe((datos) => {
        this.lstMatriz = [];
        this.lstMatriz = datos;
          if (this.lstMatriz[0].estatus === 'ERROR_CREAR_MATRZI') {
            this.alertService.error(ConstantesMsg.ERROR_CREAR_REGLA, null,null);
          }
          if (this.lstMatriz.length > 0) {
            this.alertService.success(ConstantesMsg.SUCCESS_CREACION_MATRIZ, null,null);
          //  this.lstMatriz.push(forms);
        // for (let i = 0; i < this.lstMatriz.length; i++) {
        //     this.response[i].descClaseCredito = this.claseCredtioConvert(this.lstMatriz[i].idClaseCredito);
        //     }
            this.habilitaBtnGuardar();
          }
      });
    }
  }
  /*FUNCION QUE SE ENCARGA DE VALIDAR LOS PARAMETROS DE BUSQUEDA */
  validaDatos(form: MatrizDepoGarantiaPLibres): boolean {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS');
    if (this.form.idAccionNoDep === '-1' &&
      this.form.idAccionSiDep === '-1' &&
      this.form.descMsjNoCumpleDep === undefined &&
      this.form.descMsjSiCumpleDep === undefined &&
      this.form.minImporte === undefined &&
      this.form.maxImporte === undefined &&
      this.form.deposito === undefined &&
      this.form.estatus === '-3' &&
      this.form.idClaseCredito === '-1' &&
      this.form.idTipoRegla === '-1') {
      this.alertService.error(ConstantesMsg.ERROR_CAMPOS_VACIOS_MATRIZ, null, null);
      return false;
    } else {
      if (this.form.idAccionSiDep === '-1') {
        this.alertService.error('EL COMBO ACCIoN SI DEPÓSITO ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.descMsjSiCumpleDep === undefined  && this.txtAreaSi === false) {
        this.alertService.error('EL CAMPO MENSAJE SI CUMPLE DEPoSITO ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.idAccionNoDep === '-1') {
        this.alertService.error('EL COMBO ACCIoN NO DEPÓSITO ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.descMsjNoCumpleDep === undefined  && this.txtAreaNo === false) {
        this.alertService.error('EL CAMPO MENSAJE NO CUMPLE DEPoSITO ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.minImporte === undefined) {
        this.alertService.error('EL CAMPO MINIMO IMPORTE ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.maxImporte === undefined) {
        this.alertService.error('EL CAMPO MaXIMO IMPORTE ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.deposito === undefined) {
        this.alertService.error('EL CAMPO DEPoSITO ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.idClaseCredito === '-1') {
        this.alertService.error('EL COMBO CLASE DE CReDITO ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.estatus === '-3') {
        this.alertService.error('EL COMBO ESTATUS ES REQUERIDO', null, null);
        return false;
      }
      if (this.form.estatus === '-1') {
        this.alertService.error('EL COMBO TIPO DE REGLA ES REQUERIDO', null, null);
        return false;
      }
    }
    return true;
  }

  agregarTabla(forms: MatrizDepoGarantiaPLibres) {
    console.log('AGREGAR');
    this.clearMessage();
    if (this.validaDatos(forms)) {
      forms.idMatrizDecision = this.idMatrizDecision;
      this.claseCredtioConvert(parseInt(forms.idClaseCredito, 10));
      forms.descClaseCredito = this.descClaseCredito;
      console.log('desc clase credito a ' + this.descClaseCredito);
      this.lstMatriz.push(forms);
      this.limpiarCaptura();
      this.habilitaBtnGuardar();
    }
  }

  claseCredtioConvert(searchVal) {
    this.idClasecredito = searchVal;
    for (let i = 0; i < this.cbmClasecredito.length; i++) {
      const currentDesc = this.cbmClasecredito[i];
      console.log('currentDesc ' + currentDesc);
      if (currentDesc.idClaseCredito === this.idClasecredito) {
        console.log('currentDesc.idClaseCredito ' + currentDesc.idClaseCredito);
        console.log('searchVal ' + searchVal);
        console.log('desc clase credito b' + currentDesc.descripcion);
        this.descClaseCredito = currentDesc.descripcion;

      }
    }
  }
  habilitaBtnGuardar() {
    if ( this.lstMatriz.length > 0) {
      this.btnGuarda = false;
    } else {
      this.btnGuarda = true;
  }
  console.log('habilita boton guardar' + this.btnGuarda);
  }

  actualiza(forms: MatrizDepoGarantiaPLibres) {
    console.log('AGREGAR');
    this.clearMessage();
    this.form = forms;
    if (this.validaDatos(forms)) {
    this.limpiarCaptura();
    this.habilitaBtnGuardar();
    }
  }
  // SI TIENE UN ID LO ELIMINA DE LA BASE
  // SI EL ID NULL LO QUITA DE LA LISTA CON EL INDEX
  borrarRegistro(obj:MatrizDepoGarantiaPLibres , index: number) {
    console.log('BORRAR' + index);
    this.clearMessage();
   this.lstMatriz.splice(index, 1);
   if (obj.idAdmonDepPLibre !== undefined) {
      this.eliminarRegistro(obj.idAdmonDepPLibre);
   }
  }

  eliminarRegistro(idAdmonPLibres: any) {
    this.clearMessage();
    console.log('ELIMINA EL ID DE LA REGLA ' + idAdmonPLibres);
    this.parametrosEliminar.idMatrizDecision = idAdmonPLibres;
      this.servicios.eliminarTablaMatrizPLibres(this.parametrosEliminar).subscribe((res) => {
        this.resultEliminar = res;
        console.log('ELIMINA EL ID DE LA REGLA ' + res);
          if (this.resultEliminar === 'EXITO') {
            this.alertService.success(ConstantesMsg.SUCCESS_DELETE, null,null);
          } else {
            if (this.resultEliminar === 'ERROR') {
              this.alertService.error(ConstantesMsg.ERROR_DELETE, null,null);
            } else {
              console.log(res);
            }
          }
      });

  }

  modificarRegistro(forms: MatrizDepoGarantiaPLibres) {
    console.log('MODIFICA');
    this.clearMessage();
    this.form = new MatrizDepoGarantiaPLibres();
    this.form = forms;
    this.form.descMsjNoCumpleDep = forms.descMsjNoCumpleDep === ' ' ? undefined : forms.descMsjNoCumpleDep;
    this.form.descMsjSiCumpleDep = forms.descMsjSiCumpleDep === ' ' ? undefined : forms.descMsjSiCumpleDep;
   this.activatextAreaNo(this.form.idAccionNoDep);
   this.activatextAreaSi(this.form.idAccionSiDep);
    this.btnAgrega = false;
    this.btnActualiza = true;
    this.btnGuarda = false;

  }
  tooltipSelect(claseCredito: string) {
    console.log('tootip select' + claseCredito);
    this.tooltipDescClaseCredito = claseCredito;
    console.log('tootip' + this.tooltipDescClaseCredito);
  }
  clonarRegistro(forms: MatrizDepoGarantiaPLibres) {
    console.log('CLONAR');
    this.clearMessage();
    forms.idAdmonDepPLibre = undefined;
    this.lstMatriz.push(Object.assign({}, forms));
    this.resetBtn();
    this.form = new MatrizDepoGarantiaPLibres();

  }
  limpiar() {
    console.log('LIMPIAR');
   // this.lstMatriz = [];
    this.habilitaBtnGuardar();
    this.limpiarCaptura();
  }
  limpiarCaptura() {
    console.log('LIMPIAR');
    this.form = new MatrizDepoGarantiaPLibres();
    this.resetBtn();
    this.form.idClaseCredito = '-1';
    this.form.estatus = '-3';
    this.form.idAccionSiDep = '-1';
    this.form.idAccionNoDep = '-1';
    this.form.idTipoRegla = '-1';
    this.clearMessage();
    this.txtAreaSi = false;
    this.txtAreaNo = false;
  }
  resetBtn () {
    this.btnAgrega = true;
    this.btnActualiza = false;
  }

  getCgClaseCredito() {
    this.servicios.getClaseCredito(9).subscribe(res => this.cbmClasecredito = res);
  }
   /*FUNCION QUE OBTIENE EL CATALOGO DE ESTATUS REGISTRO */
   getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }
  getCgAccionRespuesta() {
    this.servicios.getAccionRespuesta(9).subscribe(res => this.cmbAccionRespuesta = res);
  }
  getCstipoRegla() {
    this.servicios.getTipoRegla(9).subscribe(res => this.cmbTipoRegla = res);
  }

  /*FUNCION QUE SE ENCARGA DE LA ACCION DE SIGUIENTE PAGUINA DEL PAGINADO */
  siguientePagina() {
    this.numeroPaginaActual++;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }

  paginaAnterior() {
    this.numeroPaginaActual--;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }

  establecerRegistrosMostrar(evento) {
    this.numeroRegistrosPagina = evento.target.value;
    this.cargarDatosTabla();
    this.ngOnInit();
  }
  cargarDatosTabla() {
    let pagina = [];
    let contador = 0;
    this.numeroPaginas = Math.ceil(this.lstMatriz.length / this.numeroRegistrosPagina);
    if (this.paginas.length > 0) {
      this.paginas = [];
    }
    for (let i = 0; i < this.lstMatriz.length; i++) {
      pagina.push(this.lstMatriz[i]);
      contador++;
      if (contador === this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
        contador = 0;
        pagina = [];
        continue;
      }
    }

    console.log(this.paginas);
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
}
