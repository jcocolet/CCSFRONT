import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Paso } from '../../../../interfaces/paso';
import { GetInfoParamsBuscRegLNResponseDTO } from '../../../../dto/getInfoParamsBuscRegLNResponseDTO';
import { AdministracionReglasListaNegraClientesService } from './administracionReglasListaNegraClientesService';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { ManejadorErroresService } from '../../../../servicios/manejador-errores';
import { Constants } from '../../../../utiles/constants';
import { GetReglasAdmonListaNegraRequestDTO } from '../../../../dto/getReglasAdmonListaNegraRequestDTO';
import { GetReglasAdmonListaNegraResponseDTO } from '../../../../dto/GetReglasAdmonListaNegraResponseDTO';
import { CrearReglalnRequestDTO } from '../../../../dto/crearReglalnRequestDTO';
import { FlujoTrabajoService } from '../../../../servicios/flujo-de-trabajo';
import { FlujoListaNegraCargaPerezosa } from '../../../../modelo/flujo-listan-lazyload';
import { CrearReglaListaNegraComponent } from '../crear-regla-lista-negra/crear-regla-lista-negra.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { GenerarMatrizComponent } from '../generar-matriz/generar-matriz.component';
import { DetalleMatrizComponent } from '../detalle-matriz/detalle-matriz.component';
import { ClonarReglaRequestDTO } from '../../../../dto/clonarReglaRequestDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { BajaReglasRequestDTO } from '../../../../dto/bajaReglasRequestDTO';
import { GuardarCategoriasListaNegraRequestDTO } from '../../../../dto/guardarCategoriasListaNegraRequestDTO';
import { FlujoEvaluacionTramite } from '../../../../modelo/flujo-evaluacion-tramite';

@Component({
  selector: 'app-administracion-reglas-lista-negra-clientes',
  templateUrl: './administracion-reglas-lista-negra-clientes.component.html',
  styleUrls: ['./administracion-reglas-lista-negra-clientes.component.css'],
  entryComponents: [CrearReglaListaNegraComponent,CategoriaComponent,GenerarMatrizComponent,DetalleMatrizComponent],
  providers: [ AdministracionReglasListaNegraClientesService ]
})
export class AdministracionReglasListaNegraClientesComponent implements OnInit, Paso {
  public form: FormGroup;
  public nombreRegla: AbstractControl;
  public estatus: AbstractControl;
  public accion: AbstractControl;
  public rechazaut: AbstractControl;
  public mostrcoin: AbstractControl;
  public modinvest: AbstractControl;
  public response: GetInfoParamsBuscRegLNResponseDTO;
  public crearReglaLn: boolean = false;
  public categoriaLn: boolean = false;
  public detalleLn: boolean = false;
  public observableSource = new Subject<any>();
  public observableObj = this.observableSource.asObservable();
  public observableSource1 = new Subject<any>();
  public observableObj1 = this.observableSource1.asObservable();
  public observableSource2 = new Subject<any>();
  public observableObj2 = this.observableSource2.asObservable();
  public observableSource3 = new Subject<any>();
  public observableObj3 = this.observableSource3.asObservable();
  public observableSource4 = new Subject<any>();
  public observableObj4 = this.observableSource4.asObservable();
  public reglasLn: any[] = [];
  public headercolChekbox: boolean = false;
  public regionUsuario: number = 9;
  public buscarReglasRequest:  GetReglasAdmonListaNegraRequestDTO = undefined;
  public buscarReglasResponse: GetReglasAdmonListaNegraResponseDTO[] = [];
  public cargadoDinamicamente: boolean = false;

    //Variables del paginador
  public multiplosPaginador: number[] = [5,10,15];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any [] = [];
  public numeroPaginas: number = 0;
  public paginaActual: any = [];
  public numeroPaginaActual: number = 0;
  //Fin variables paginador

  public crearModal: boolean = false;
  public registros: BajaReglasRequestDTO = new BajaReglasRequestDTO();
  public reglaModif: any = {
    nombreRegla: '',
    estatus: ''
  };
  public parametrosDetalleln: any = undefined;
  public parametros: any;

  constructor(
    private fb: FormBuilder, 
    private service: AdministracionReglasListaNegraClientesService,
    private servicioManejadorErrores: ManejadorErroresService, 
    private ftService: FlujoTrabajoService,
    public alertService: AlertService) {
  	this.form = fb.group({
      'nombreRegla': ['', Validators.compose([Validators.minLength(8)])],
      'accion': ['', Validators.compose([])],
      'estatus': ['', Validators.compose([])],
      'rechazaut': ['', Validators.compose([])],
      'mostrcoin': ['', Validators.compose([])],
      'modinvest': ['', Validators.compose([])]
    });
    this.nombreRegla = this.form.controls['nombreRegla']; 
    this.accion = this.form.controls['accion'];
    this.estatus = this.form.controls['estatus'];
    this.rechazaut = this.form.controls['rechazaut'];
    this.mostrcoin = this.form.controls['mostrcoin'];
    this.modinvest = this.form.controls['modinvest'];
    this.response = new GetInfoParamsBuscRegLNResponseDTO();
    this.service.getParametrosBusqueda(this.regionUsuario).subscribe((data)=>{
        this.response = data;
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err);
    });
  }

  ngOnInit() {
  }

  estaCompletado() {
  	return true;
  }

  mostrarMensajesError() {

  }

  setParametrosIntercomponente(params:any) {
    this.parametros = params;
  }

  getParametrosIntercomponente(): any {
  }

  onSubmit(frm) {
    if(frm.nombreRegla != '' || frm.accion != '' || frm.estatus != ''
      || frm.modinvest != '' || frm.mostrcoin != '' || frm.rechazaut != '') {
      this.service.getReglas(frm.nombreRegla,frm.accion,frm.estatus,frm.rechazaut,frm.mostrcoin,frm.modinvest).subscribe((data)=>{
        this.buscarReglasResponse = data;
        this.cargarDatosTabla();
        this.paginaActual = this.paginas[this.numeroPaginaActual];
        this.headercolChekbox = false;
      },(err)=>{
        this.servicioManejadorErrores.resuelveErroresServidor(err);
      });
    }else {
  }
  }

  mostrarOcultarCrearRegla(evnt, registro: any) {
    this.observableSource1.next(true);
    this.observableSource.next(registro);
    this.reglaModif = registro;
    this.ftService.parametros['reglaModif'] = registro;
  }

  mostrarOcultarCategoria(evnt, registro: any) {
    this.reglaModif = registro;
  }

  mostrarOcultarDetalles(evnt, registro: any) {
    this.service.detallesRegla(registro.idRegla).subscribe((response)=>{
        this.observableSource2.next(registro);
        this.observableSource3.next(response);
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err.code);
    });
  }

  guardarCategoria(parametros: any) {
    let idMD = this.reglaModif.idRegla;
    let idsCat = [];
    for(let reg of parametros) {
      idsCat.push(reg.idCategoria);
    }
    this.service.guardarCategorias(new GuardarCategoriasListaNegraRequestDTO(idMD,idsCat))
    .subscribe((response)=>{
      if(response == 'OK') {
        this.observableSource4.next(idMD);
      }
    });
  }

  getRetroPropagadorEvento(): Observable<boolean> {
    return this.observableObj;
  }

  anadirReglaCapturada(evnt2) {
    if(evnt2!=undefined) {
      let request = new CrearReglalnRequestDTO(evnt2.nombreRegla,evnt2.estatus,this.regionUsuario,1);
      this.service.crearReglaListaNegra(request).subscribe((data)=>{
        this.buscarReglasResponse.push(data);
        console.log(this.ftService.parametros.flujoDecision.idFlujoDecision);
        this.ftService.parametros['MatrizDec'] = data;
        this.cargarDatosTabla();
        this.paginaActual = this.paginas[this.numeroPaginaActual];
        if(this.buscarReglasResponse.length == 0) {
          this.alertService.info('sr',null,null);
        }
      },(err)=>{
        this.servicioManejadorErrores.resuelveErroresServidor(err.status);
      });
    }
  }

  getCargadoDinamicamente(): boolean {
    return this.cargadoDinamicamente;
  }

  setCargadoDinamicamente(valor: boolean) {
    this.cargadoDinamicamente = valor;
  }

  evitaEspeciales(evt):void {
    let regEx = /^([a-z0-9A-Z ])$/;
    if(!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }

  setParametrosIniciales() {
    
  }

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
    this.numeroPaginaActual = 0;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }

  cargarDatosTabla() {
    let pagina = [];
    let contador = 0;
    this.numeroPaginas = Math.ceil(this.buscarReglasResponse.length/this.numeroRegistrosPagina);
    if(this.paginas.length>0) {
      this.paginas = [];
    }
    for (let i = 0; i < this.buscarReglasResponse.length; i++) {
      pagina.push(this.buscarReglasResponse[i]);
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

  clonarRegla(registro: any) {
    this.service.clonarRegla(registro.idRegla).subscribe((response)=>{
      if(response == 'CREATED' ) {
        this.alertService.success('clonar',registro.nombreRegla,null);
      }
      console.log(response);
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err.status);
    });
  }

  limpiarResultadoBusqueda() {
    this.form.controls['nombreRegla'].setValue('');
    this.form.controls['accion'].setValue('');
    this.form.controls['estatus'].setValue('');
    this.form.controls['rechazaut'].setValue('');
    this.form.controls['mostrcoin'].setValue('');
    this.form.controls['modinvest'].setValue('');
    this.numeroPaginas = 0;
    this.numeroPaginaActual = 0;
    this.paginaActual = [];
    this.paginas = [];
    this.buscarReglasResponse = [];
  }

  borrarRegistro(registro: any) {
    console.log(registro.idRegla);
    this.registros.setId(registro.idRegla);
    if(registro.estatus=='D') {
      this.service.eliminarReglas(this.registros).subscribe((data)=>{
      if(data == 'OK') {
        this.alertService.info('eliminado',null,null);
        this.registros = new BajaReglasRequestDTO();
        this.onSubmit(this.form.value);
      }
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err.status);
    });
    }else {
      this.service.bajaReglas(this.registros).subscribe((data)=>{
      if(data == 'OK') {
        this.alertService.info('baja',null,null);
        this.registros = new BajaReglasRequestDTO();
      }
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err.status);
    });
    }
  }

  editarRegla(evnt2) {
    if(evnt2!=undefined) {
      let request = new CrearReglalnRequestDTO(evnt2.nombreRegla,evnt2.estatus);
      this.service.editarRegla(this.reglaModif.idRegla,request).subscribe((data)=>{
        if(data == 'OK') {
          this.alertService.info('actualizar',null,null);
          for(let registro of this.paginaActual) {
            if(registro.idRegla == this.reglaModif.idRegla) {
              registro.nombreRegla = evnt2.nombreRegla;
              registro.estatus = evnt2.estatus;
            }
          }
        }
      },(err)=>{
        this.servicioManejadorErrores.resuelveErroresServidor(err.status);
      });
    }
  }

  getObservable() {
    return null;
  }

  regresarAgruComp() {
    this.ftService.iniciar(new FlujoEvaluacionTramite(),false,null);
    this.ftService.procCiclico = true;
    this.ftService.parametros.push(this.parametros);
    this.ftService.siguiente();
    setTimeout(()=>{
      this.ftService.procCiclico = false;
    },2500);
    
  }

}