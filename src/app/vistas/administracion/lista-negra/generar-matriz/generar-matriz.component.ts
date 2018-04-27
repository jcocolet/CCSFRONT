import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Paso } from '../../../../interfaces/paso';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { GenerarMatrizRequestDTO } from '../../../../dto/generarMatrizRequestDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { GenerarMatrizService } from './generar-matriz.service';
import { GuardarMatricesListaNegraRequestDTO } from '../../../../dto/guardarMatricesListaNegraRequestDTO';
import { FlujoTrabajoService } from '../../../../servicios/flujo-de-trabajo';
import { AdministracionReglasListaNegraClientesService } from '../../../../vistas/administracion/lista-negra/administracion-reglas-lista-negra-clientes/administracionReglasListaNegraClientesService';
import { ManejadorErroresService } from '../../../../servicios/manejador-errores';


@Component({
  selector: 'app-generar-matriz',
  templateUrl: './generar-matriz.component.html',
  styleUrls: ['./generar-matriz.component.css'],
  providers: [ GenerarMatrizService ]
})
export class GenerarMatrizComponent implements OnInit, Paso {
    public checkBoxheaderSelected: boolean = false;
    public cmbns: any[] = [];
    public estatus: any[] = [];
    public modinv: any[] = [];
    public acciones: any[] = [];
    public idMtzDec: number = undefined;
    public form: FormGroup;
    public nombre: AbstractControl;
    public callnum: AbstractControl;
    public rfc: AbstractControl;
    public telcas: AbstractControl;
    public telofi: AbstractControl;
    public telref: AbstractControl;
    public nomref: AbstractControl;
    public tarcre: AbstractControl;
    public robide: AbstractControl;
    public accion: AbstractControl;
    public rezaut: AbstractControl;
    public moscoi: AbstractControl;
    public modinvCtrl: AbstractControl;
    public estatusctrl: AbstractControl;
    public msgfv: AbstractControl;
    public tablaMatrices: GenerarMatrizRequestDTO[] = [];

    //Variables del paginador
    public multiplosPaginador: number[] = [5,10,15];
    public numeroRegistrosPagina: number = this.multiplosPaginador[0];
    public paginas: any [] = [];
    public numeroPaginas: number = 0;
    public paginaActual: any = [];
    public numeroPaginaActual: number = 0;
    //Fin variables paginador

    public response: any[] = [];

    public countRegAgreg: number = 0;
    public guardoAlgo: boolean = false;
    @Input()
    idReglaObservable: any;
    
    
  constructor(
    public fb: FormBuilder, 
    public alertService: AlertService,
    public genMatzService: GenerarMatrizService,
    private ftService: FlujoTrabajoService,
    private lnService: AdministracionReglasListaNegraClientesService,
    private servicioManejadorErrores: ManejadorErroresService) { 
    this.form = fb.group({
      'nombre': ['', Validators.compose([Validators.required])],
      'callnum': ['', Validators.compose([Validators.required])],
      'rfc': ['', Validators.compose([Validators.required])],
      'telcas': ['', Validators.compose([Validators.required])],
      'telofi': ['', Validators.compose([Validators.required])],
      'telref': ['', Validators.compose([Validators.required])],
      'nomref': ['', Validators.compose([Validators.required])],
      'tarcre': ['', Validators.compose([Validators.required])],
      'robide': ['', Validators.compose([Validators.required])],
      'accion': ['', Validators.compose([Validators.required])],
      'rezaut': ['', Validators.compose([Validators.required])],
      'moscoi': ['', Validators.compose([Validators.required])],
      'modinvCtrl': ['', Validators.compose([Validators.required])],
      'estatusctrl': ['', Validators.compose([Validators.required])],
      'msgfv': ['', Validators.compose([Validators.required])]
    });

    this.nombre = this.form.controls['nombre'];
    this.callnum = this.form.controls['callnum'];
    this.rfc = this.form.controls['rfc'];
    this.telcas = this.form.controls['telcas'];
    this.telofi = this.form.controls['telofi'];
    this.telref = this.form.controls['telref'];
    this.nomref = this.form.controls['nomref'];
    this.tarcre = this.form.controls['tarcre'];
    this.robide = this.form.controls['robide'];
    this.accion = this.form.controls['accion'];
    this.rezaut = this.form.controls['rezaut'];
    this.moscoi = this.form.controls['moscoi'];
    this.modinvCtrl = this.form.controls['modinvCtrl'];
    this.estatusctrl = this.form.controls['estatusctrl'];
    this.msgfv = this.form.controls['msgfv'];

    this.lnService.getParametrosBusqueda(9).subscribe((data)=>{
        this.response = data;
        this.cmbns = data.comboNoSi;
        this.estatus = data.listaEstatus
        this.modinv = data.modalidadInvestigacion;
        this.acciones = data.listaAccionRespuesta;
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err);
    });
  }

  ngOnInit() {
    this.idReglaObservable.subscribe((id)=>{
        this.idMtzDec = id;
    });
  }

  estaCompletado() {
  	return true;
  }

  mostrarMensajesError() {

  }

  setParametrosIntercomponente(params: any) {
  }

  getParametrosIntercomponente() {
  	return null;
  }

  getRetroPropagadorEvento() {
    return null;
  }

  onSubmit(form) {
    if(this.tablaMatrices.length>0) {
      this.genMatzService.guardarMatriz(new GuardarMatricesListaNegraRequestDTO(this.tablaMatrices)).subscribe((data)=>{
        if(data == 'OK') {
          this.guardoAlgo = true;
        }
      });
    }
  }

  agregarRegistro(form) {
    if(this.identidad(form)) {
      this.alertService.error('identico',null,null);
    }else if(!this.form.valid) {
      this.alertService.error('todos',null,null);
    }else {
      this.tablaMatrices.push(new GenerarMatrizRequestDTO(this.idMtzDec,form.nombre,form.callnum,
      form.rfc,form.telcas,form.telofi,form.telref,form.nomref,form.tarcre,form.robide,
      form.accion,form.rezaut,form.moscoi,form.modinvCtrl,form.estatusctrl,form.msgfv));
      this.countRegAgreg++;
    }
  }

  identidad(form): boolean {
    for(let item of this.tablaMatrices) {
      if(
        item.nombre == form.nombre &&
        item.callnum == form.callnum &&
        item.rfc == form.rfc &&
        item.telcas == form.telcas &&
        item.telofi == form.telofi &&
        item.telref == form.telref &&
        item.nomref == form.nomref &&
        item.tarcre == form.tarcre &&
        item.robide == form.robide &&
        item.accion == form.accion &&
        item.rezaut == form.rezaut &&
        item.moscoi == form.moscoi &&
        item.modinvCtrl == form.modinvCtrl &&
        item.estatusCtrl == form.estatusctrl &&
        item.msgfv == form.msgfv) {
        return true;
      }
    }
    return false;
  }

  setParametrosIniciales() {
    
  }

  siguientePagina() {
    this.numeroPaginaActual++;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
    this.checkBoxheaderSelected = false;
  }

  paginaAnterior() {
    this.numeroPaginaActual--;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
    this.checkBoxheaderSelected = false;
  }

  establecerRegistrosMostrar(evento) {
    this.numeroRegistrosPagina = evento.target.value;
    this.cargarDatosTabla();
    this.numeroPaginaActual = 0;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
    this.checkBoxheaderSelected = false;
    for(let x of this.paginaActual) {
      (<HTMLInputElement>document.getElementById(x.idRegla)).checked = false;
    }
  }

  cargarDatosTabla() {
    let pagina = [];
    let contador = 0;
    this.numeroPaginas = Math.ceil(this.response.length/this.numeroRegistrosPagina);
    if(this.paginas.length>0) {
      this.paginas = [];
    }
    for (let i = 0; i < this.response.length; i++) {
      pagina.push(this.response[i]);
      contador++;
      if(contador==this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
        contador = 0;
        pagina = [];
        continue;
      }
    }
    if(pagina.length<this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
    }
  }

  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  myFunction2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("show2");
  }

  getObservable() {
    return null;
  }
}