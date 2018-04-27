import { Component, OnInit, Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { CategoriaRequestDTO } from '../../../../dto/getCategoriaRequestDTO';
import { MatrizAdmPlanLibres } from '../../../../modelo/MatrizAdmPlanLibres';
import { ClaseCreditoRequestDTO } from '../../../../dto/getClaseCreditoRequestDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { AccionRespuestaRequestDTO } from '../../../../dto/getAccionRespuestaRequestDTO';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { AdminPlanesLibresService } from '../admin-planes-libres.service';
import { CgSiNo } from '../../../../modelo/cgSiNO.model'
import { BuscarDetalle } from '../../../../modelo/buscarDetalle';
import { CsMensajeSistema } from '../../../../modelo/csMensajeSistema.model';



@Component({
  selector: 'app-crear-matriz-planes-libres',
  templateUrl: './crear-matriz-planes-libres.component.html',
  styleUrls: ['./crear-matriz-planes-libres.component.css']
})
export class CrearMatrizPlanesLibresComponent implements OnInit {
  @Input() public componentePropietarioIB;
  @Input() public lstMatriz: MatrizAdmPlanLibres[];
  @Input() public cbmCategoria: CategoriaRequestDTO[];
  @Input() public idMatrizDecision: number;

  public btnActualiza: boolean;
  public btnAgrega: boolean;
  public btnGuarda: boolean;
  //VARIABLES GLOBALES
  public idRegion: number;
  public form: MatrizAdmPlanLibres = new MatrizAdmPlanLibres();
  //COMBOS INCIALES
  public iniClaseCred: ClaseCreditoRequestDTO = new ClaseCreditoRequestDTO();
  public inicbmEstatus: EstatusRequestDTO = new EstatusRequestDTO();
  public iniCgSiNo: CgSiNo = new CgSiNo();
  public iniAccionRespuesta: AccionRespuestaRequestDTO = new AccionRespuestaRequestDTO();
  public iniTextArea: CsMensajeSistema = new CsMensajeSistema();

  public cbmClasecredito: ClaseCreditoRequestDTO[];
  public cbmEstatus: EstatusRequestDTO[];
  public cboCgSiNo: CgSiNo[];
  public cmbAccionRespuesta: AccionRespuestaRequestDTO[];
  public parametrosDetalle: BuscarDetalle = new BuscarDetalle();
  public parametrosEliminar: BuscarDetalle = new BuscarDetalle();
  private resultEliminar: string;

  constructor(private servicios: AdminPlanesLibresService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    //INICIALIZA VARIABLES 
    this.idRegion = 9;
    //METODOS INICIALES
    this.getCgEstatusregistro();
    this.getCgClaseCredito();
    this.getCGSiNo();
    this.getCgAccionRespuesta();
    this.habilitaBtnGuardar();
    this.clearMessage();
    this.cargaInicialLstMatriz();
    //this.isValidform = true;
    this.limpiar();
    //    this.form.cbmClasecredito = this.iniClaseCred;
    //this.form.estatusDTO = this.inicbmEstatus;
    //this.form.accionConsDep = this.iniCgSiNo;
    //this.form.accionSiCumpleDepDto = this.iniAccionRespuesta;
    //this.form.accionNoCumpleDepDto = this.iniAccionRespuesta;
    //this.form.accionAdm=this.iniAccionRespuesta;
  }


  asignaDescripcionCR() {
    if (this.form.idClaseCredito == -1) {
      this.form.descClaseCredito = "";
    } else {
      for (let i = 0; i < this.cbmClasecredito.length; i++) {
        if (this.form.idClaseCredito == this.cbmClasecredito[i].idClaseCredito) {
          this.form.descClaseCredito = this.cbmClasecredito[i].descripcion;
          break;
        }
      }
    }
  }

  asignaDescEstatus() {
    if (this.form.estatus === "-1") {
      this.form.estatus = "";
    } else {
      for (let i = 0; i < this.cbmEstatus.length; i++) {
        if (this.form.estatus == this.cbmEstatus[i].clave) {
          this.form.estatus = this.cbmEstatus[i].clave;
          break;
        }
      }
    }
  }

  asignaDescSiNo() {
    if (this.form.idAccionConsDep == -1) {
      this.form.descAccionConsDep = "";
    } else {
      for (let i = 0; i < this.cboCgSiNo.length; i++) {
        if (this.form.idAccionConsDep == this.cboCgSiNo[i].idSiNo) {
          this.form.descAccionConsDep = this.cboCgSiNo[i].descripcion;
          break;
        }
      }
    }
  }

  asignaDescEstausRespAccionSi() {
    if (this.form.idAccionSiCumpleDep == -1) {
      this.form.descASiCumpleDep = "";
    } else {
      for (let i = 0; i < this.cmbAccionRespuesta.length; i++) {
        if (this.form.idAccionSiCumpleDep == this.cmbAccionRespuesta[i].idAccion) {
          this.form.descASiCumpleDep = this.cmbAccionRespuesta[i].descripcion;
        }

      }
    }
  }

  asignaDescEstausRespAccionNo() {
    if (this.form.idAccionNoCumpleDep == -1) {
      this.form.descAccionNoCumpleDep = "";
    } else {
    for (let i = 0; i < this.cmbAccionRespuesta.length; i++) {
      if (this.form.idAccionNoCumpleDep == this.cmbAccionRespuesta[i].idAccion) {
        this.form.descAccionNoCumpleDep = this.cmbAccionRespuesta[i].descripcion;
      }
    }
  }
  }

  asignaDescEstausRespAccionAdm() {
    if (this.form.idAccionAdm == -1) {
      this.form.descIdAccionAdm = "";
    } else {
    for (let i = 0; i < this.cmbAccionRespuesta.length; i++) {
      if (this.form.idAccionAdm == this.cmbAccionRespuesta[i].idAccion) {
        this.form.descIdAccionAdm = this.cmbAccionRespuesta[i].descripcion;
      }
    }
    }
  }


  agregarTabla(forms: MatrizAdmPlanLibres) {
    console.log('AGREGAR');
    this.clearMessage();
    forms.idMatrizDecision = this.idMatrizDecision;
    alert(forms.descMsjNoCumpleDep);
    this.lstMatriz.push(forms);
    //this.form = new MatrizAdmPlanLibres();
    this.limpiarCaptura();
    this.habilitaBtnGuardar();
  }

  modificarRegistro(forms: MatrizAdmPlanLibres) {
    console.log('MODIFICA');
    this.form = new MatrizAdmPlanLibres();
    this.form = forms;
    this.btnAgrega = false;
    this.btnActualiza = true;
    this.btnGuarda = false;

  }

  clonarRegistro(forms: MatrizAdmPlanLibres) {
    console.log('CLONAR');
    this.lstMatriz.push(forms);
    this.resetBtn();
    this.form = new MatrizAdmPlanLibres();

  }

  actualiza(forms: MatrizAdmPlanLibres) {
    console.log('AGREGAR');
    this.form = forms;
    this.limpiarCaptura();
    this.habilitaBtnGuardar();
  }

  borrarRegistro(obj:MatrizAdmPlanLibres , index: number) {
   console.log('BORRAR' + index);
   this.clearMessage();
   this.lstMatriz.splice(index, 1);
   if (obj.idAdmonPlanLibre !== undefined) {
       this.eliminarRegistro(obj.idAdmonPlanLibre);
   }
  }

  eliminarRegistro(idAdmonPLibres: any) {
    console.log('ELIMINA EL ID DE LA REGLA ' + idAdmonPLibres);
    this.parametrosEliminar.idMatrizDecision = idAdmonPLibres; 
      this.servicios.elimaReglaMatrizAdmPlanLibres(this.parametrosEliminar).subscribe((res) => {
        this.resultEliminar = res;
        console.log('ELIMINA EL ID DE LA REGLA ' + res);
          if (this.resultEliminar === 'EXITO') {
            this.alertService.success('SE ELIMINÓ CORRECTAMENTE EL REGISTRO SELECCIONADO.',  '' , '');
          } else {
            if (this.resultEliminar === 'ERROR') {
              this.alertService.error('NO SE PUDO ELIMINAR EL REGISTRO SELECCIONADO.',  '' , '');
            } else {
              console.log(res);
            }
          }
      });

  }


  guardar() {
    console.log('GUARDAR');
    this.clearMessage();
    if (this.lstMatriz.length > 0) {
      this.servicios.crearMatrizDepoGarantiaPLibres(this.lstMatriz).subscribe((datos) => {
        this.lstMatriz = datos;
          if (this.lstMatriz[0].idAdmonPlanLibre == -1 ) {
            this.alertService.error(ConstantesMsg.ERROR_CREAR_REGLA,  '' , '');
          }
          if (this.lstMatriz.length > 0) {
            this.alertService.success(ConstantesMsg.SUCCESS_CREACION_MATRIZ,  '' , '');
          //  this.lstMatriz.push(forms);
        // for (let i = 0; i < this.lstMatriz.length; i++) {
        //     this.response[i].descClaseCredito = this.claseCredtioConvert(this.lstMatriz[i].idClaseCredito);
        //     }
            this.habilitaBtnGuardar();
          }
      });
    }
  }


  cargaInicialLstMatriz() {
    console.log('INICIA EL EVENTO PARA OBTENER LA MATRIZ DE REGLAS');
    this.parametrosDetalle.idMatrizDecision = this.idMatrizDecision;
    this.parametrosDetalle.idMatrizDecision = this.idMatrizDecision;
    this.clearMessage();
    // REALIZA LA PETICION AL SERVICIO PARA OBTENER EL DETALLE DE LA REGLA
    this.servicios.getMatrizAdmPlanLibres(this.parametrosDetalle).subscribe(
      (data) => {
        // SE ASINA EL VALOR DEVUELTO POR EL SERVICO A LA LISTA DE DETALLE
        this.lstMatriz = data;
        if (this.lstMatriz.length > 0) {
          if (this.lstMatriz[0].estatus === 'VACIO') {
            this.lstMatriz = [];
          }
        }
        this.habilitaBtnGuardar();
        // VALIDA SI LA RESPUESTA ES VACIA
        if (this.lstMatriz.length <= 0) {
          this.lstMatriz = [];
          //this.alertService.info(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO, null);
        } else {

        }
      });
  }

  habilitaBtnGuardar() {
    if (this.lstMatriz.length > 0) {
      this.btnGuarda = false;
    } else {
      this.btnGuarda = true;
    }
    console.log('habilita boton guardar' + this.btnGuarda);
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
  limpiar() {
    console.log('LIMPIAR');
    // this.lstMatriz = [];
    this.habilitaBtnGuardar();
    this.limpiarCaptura();
    this.clearMessage();
  }
  limpiarCaptura() {
    console.log('LIMPIAR');
    this.form = new MatrizAdmPlanLibres();
    this.resetBtn();
    this.clearMessage();
  }
  resetBtn() {
    this.btnAgrega = true;
    this.btnActualiza = false;
  }

  /*FUNCION QUE SE ENCARGA DE QUITAR EL MENSAJE DE ALERTA */
  clearMessage = () => {
    this.alertService.clearMessage();
  }

  /*FUNCION QUE OBTIENE EL CATALOGO DE ESTATUS REGISTRO */
  getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }

  /*FUNCION QUE OBTIENE EL CATALOGO DE CLASE DE CREDITO */
  getCgClaseCredito() {
    this.servicios.getClaseCredito(this.idRegion).subscribe(res => this.cbmClasecredito = res);
  }

  getCGSiNo() {
    this.servicios.getCgSiNo(this.idRegion).subscribe(res => this.cboCgSiNo = res);
  }

  getCgAccionRespuesta() {
    this.servicios.getAccionRespuesta(this.idRegion).subscribe(res => this.cmbAccionRespuesta = res);
  }


}
