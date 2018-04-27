import { Component, OnInit, ApplicationRef } from '@angular/core';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { EvaluacionTramiteInformacionParametrosBusquedaResponseDTO } from '../../../dto/evaluacionTramiteResponseDTO';
import { EvaluacionTramiteGetReglasRequestDTO } from '../../../dto/evaluacionTramiteGetReglasRequestDTO';
import { EvaluacionTramiteGetReglasResponseDTO } from '../../../dto/evaluacionTramiteGetReglasResponseDTO';
import { BajaReglasRequestDTO } from '../../../dto/bajaReglasRequestDTO';
import { ClonarReglaRequestDTO } from '../../../dto/clonarReglaRequestDTO';

import { EvaluacionTramiteService } from './evaluacion-tramite.service';
import { AlertService } from '../../../servicios/alert.service';
import { FlujoTrabajoService } from '../../../servicios/flujo-de-trabajo';
import { OnlineService } from '../../../servicios/online.service';
import { ManejadorErroresService } from '../../../servicios/manejador-errores';

import { FlujoEvaluacionTramite } from '../../../modelo/flujo-evaluacion-tramite';
import { InicializacionComponente } from './inicializacion.componente.conf';
import { Constants } from '../../../utiles/constants';

import { EnvoltorioGenericoComponente } from '../../../utiles/envoltorioGenericoComponente';
import { DetalleReglaComponent } from './detalle-regla/detalle-regla.component';
//Fin imports

@Component({
  selector: 'app-evaluacion-tramite',
  templateUrl: './evaluacion-tramite.component.html',
  styleUrls: ['./evaluacion-tramite.component.css']
})

export class EvaluacionTramiteComponent implements OnInit {
  //Objeto formulario
  public form: FormGroup;
  //Controles de entrada del formulario
  public nombreRegla: AbstractControl;
  public tramite: AbstractControl;
  public estatus: AbstractControl;
  public fechaInicio: AbstractControl;
  public fechaFin: AbstractControl;
  public canal: AbstractControl;
  public mercado: AbstractControl;
  public tipoPersona: AbstractControl;
  public tipoPlazo: AbstractControl;
  public tipoProyecto: AbstractControl;
  //Fin controles de entrada del formulario

  public intercambiarTexto = false; //Bandera para cambiar texto opciones basica o avanzadas
  public crearModal = false; //Bandera para crear o destruir el componente modal
  public checkBoxheaderSelected: boolean = false; //Bandera para seleccionar todos los registros de la tabla dando click al check de la cabecera

  //DTO's para las peticiones al servidor y las respuestas
  public informacionParametrosBusqueda : EvaluacionTramiteInformacionParametrosBusquedaResponseDTO = new EvaluacionTramiteInformacionParametrosBusquedaResponseDTO();
  public request: EvaluacionTramiteGetReglasRequestDTO;
  public response: EvaluacionTramiteGetReglasResponseDTO[] = [];
  public registros: BajaReglasRequestDTO = new BajaReglasRequestDTO();

  //Variables del paginador
  public multiplosPaginador: number[] = [5,10,15];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any [] = [];
  public numeroPaginas: number = 0;
  public paginaActual: any = [];
  public numeroPaginaActual: number = 0;
  //Fin variables paginador

  public checksSeleccionadosTabla: any[] = [];// sin funcionalidad todavia

  public listaEstatusDisponibles: string[] = Constants.COMBO_ESTATUS;

  public componentePropietarioET: boolean = true;

  public componentePropietarioIB: boolean = false;
  
  //Constructor
  constructor(
    public restService: EvaluacionTramiteService,
    public fb: FormBuilder,
    public alertService: AlertService,
    public flujoTrabajoService: FlujoTrabajoService,
    public elementosvComponente: InicializacionComponente,
    public online: OnlineService,
    public servicioManejadorErrores: ManejadorErroresService,
    public appRef: ApplicationRef ) {

    this.restService.getParametrosBusqueda(9)
      .subscribe(
        (response) => {
          this.informacionParametrosBusqueda = response;
        },
        (err)=>{
          this.servicioManejadorErrores.resuelveErroresServidor(err.status);
        });
    
    //Se inicializa el formulario con las restricciones de cada campo
    this.form = fb.group({
      'nombreRegla': ['', Validators.compose([Validators.minLength(8)])],
      'tramite': ['', Validators.compose([])],
      'estatus': ['', Validators.compose([])],
      'fechaInicio': ['', Validators.compose([])],
      'fechaFin': ['', Validators.compose([])],
      'canal': ['', Validators.compose([])],
      'mercado': ['', Validators.compose([])],
      'tipoPersona': ['', Validators.compose([])],
      'tipoPlazo': ['', Validators.compose([])],
      'tipoProyecto': ['', Validators.compose([])]
    });

    // se inicializan las variables de los controles cons los controles del formulario ya construido
    this.nombreRegla = this.form.controls['nombreRegla'];
    this.tramite = this.form.controls['tramite'];
    this.estatus = this.form.controls['estatus'];
    this.fechaInicio = this.form.controls['fechaInicio'];
    this.fechaFin = this.form.controls['fechaFin'];
    this.canal = this.form.controls['canal'];
    this.mercado = this.form.controls['mercado'];
    this.tipoPersona = this.form.controls['tipoPersona'];
    this.tipoPlazo = this.form.controls['tipoPlazo'];
    this.tipoProyecto = this.form.controls['tipoProyecto'];
  }

  ngOnInit() {
  }

  onSubmit(formulario: any) {
    if( formulario.nombreRegla !== '' || formulario.tramite !== '' || 
        formulario.estatus !== '' || formulario.fechaInicio !== '' ||
        formulario.fechaFin !== '' || formulario.canal !== '' ||
        formulario.mercado !== '' || formulario.tipoPersona !== '' ||
        formulario.tipoPlazo !== '' || formulario.tipoProyecto !== '' ) {
        if(this.fechaInicio.value!=''&&this.fechaFin.value==''){
          this.alertService.error('fec_fin_req',null,null);
          return;
        }else if(this.fechaFin.value!=''&&this.fechaInicio.value=='') {
          this.alertService.error('fec_ini_req',null,null);
          return;
        }else if(this.fechaInicio.value!=''&&this.fechaFin.value!='') {
          if(new Date(this.fechaInicio.value) > new Date(this.fechaFin.value)) {
            this.alertService.error('rang_fec_incorr',null,null);
            return;
          }
        }
      this.request = new EvaluacionTramiteGetReglasRequestDTO(formulario);
      this.restService.getReglas(formulario.nombreRegla,formulario.tramite,formulario.estatus,
        formulario.fechaInicio,formulario.fechaFin,formulario.canal,formulario.mercado,
        formulario.tipoPersona,formulario.tipoPlazo,formulario.tipoProyecto).subscribe(
      (data) => {
        this.response = data;
        this.cargarDatosTabla();
        this.paginaActual = this.paginas[this.numeroPaginaActual];
        this.checkBoxheaderSelected = false;
        if(this.response.length == 0) {
          this.alertService.info('sr',null,null);
        }
      },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err.status);
    });
    } else {
      this.alertService.error('almenos_uno',null,null);
    }
  }

  iniciarFlujoEvaluacionTramite() {
    let flujoEvaluacionTramite = new FlujoEvaluacionTramite();
    this.crearModal = true;
    this.componentePropietarioET = false;
    setTimeout(()=>{
      this.flujoTrabajoService.iniciar(flujoEvaluacionTramite,false,null);
    },50)
  }

  evitaEspeciales(evt):void {
    let regEx = /^([a-z0-9A-Z ])$/;
    if(!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }

  borrarRegistro(registro: any) {
    this.registros.setId(registro.idRegla);
    if(registro.estatus=='D') {
      this.restService.eliminarReglas(this.registros).subscribe((data)=>{
      if(data == 'OK') {
        this.alertService.info('eliminado',null,null);
        this.registros = new BajaReglasRequestDTO();
        this.onSubmit(this.form.value);
        this.appRef.tick();
      }
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err.status);
    });
    }else {
      this.restService.bajaReglas(this.registros).subscribe((data)=>{
      if(data == 'OK') {
        this.alertService.info('baja',null,null);
        this.registros = new BajaReglasRequestDTO();
      }
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err.status);
    });
    }
  }

  borrarRegistros() {
    let depurar = 0;
    let eliminar = 0;
    let idsDepurar: BajaReglasRequestDTO = new BajaReglasRequestDTO();
    let idsEliminar: BajaReglasRequestDTO = new BajaReglasRequestDTO();
    for(let registro of this.paginaActual) {
      if((<HTMLInputElement>document.getElementById(registro.idRegla)).checked == true) {
        if(registro.estatus == 'A') {
          depurar++;
          idsDepurar.setId(registro.idRegla);
        }else if(registro.estatus == 'D') {
          eliminar++;
          idsEliminar.setId(registro.idRegla);
        }
      }
    }
    if(confirm('Numero de registros a depurar: '+depurar+
      '\nNumero de registros a eliminar permanentemente: '+eliminar)) {
          this.restService.bajaReglas(idsDepurar).subscribe((response)=>{
            if(response == 'OK') {
              this.alertService.info('baja',null,null);
            }
          },(err)=>{
            this.servicioManejadorErrores.resuelveErroresServidor(err.status);
          });
          this.restService.eliminarReglas(idsEliminar).subscribe((response)=>{
            if(response == 'OK') {
              this.alertService.info('eliminado',null,null);
            }
          },(err)=>{
            this.servicioManejadorErrores.resuelveErroresServidor(err.status);
          });
    }
  }

  clonarRegla(registro: any) {
    this.restService.clonarRegla(new ClonarReglaRequestDTO(registro.idRegla)).subscribe((response)=>{
      if(response == 'CREATED' ) {
        this.alertService.success('clonar',registro.nombreRegla,null);
      }
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err.status);
    });
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

  reiniciarProceso() {
    this.componentePropietarioET = true;
    this.crearModal = false;
  }

  verDetalleRegla(idFlujo: number) {
    this.crearModal = true;
    let params = {
      idFlujo: idFlujo
    }
    setTimeout(()=>{
      this.flujoTrabajoService.iniciar(
      {
        getPasos() {
          return [{nombre:'detalles-regla.titulo',componente: new EnvoltorioGenericoComponente(DetalleReglaComponent).componente}];
        }
      },true, params);
    },50);
  }

  editarRegla(idFlujo: number) {
    let flujoEvaluacionTramite = new FlujoEvaluacionTramite();
    this.crearModal = true;
    let params = {
      idFlujo: idFlujo
    }
    setTimeout(()=>{
      this.flujoTrabajoService.iniciar(flujoEvaluacionTramite,true, params);
    },50);
  }

  limpiarResultadoBusqueda() {
    this.form.controls['nombreRegla'].setValue('');
    this.form.controls['tramite'].setValue('');
    this.form.controls['estatus'].setValue('');
    this.form.controls['canal'].setValue('');
    this.form.controls['mercado'].setValue('');
    this.form.controls['tipoPersona'].setValue('');
    this.form.controls['tipoPlazo'].setValue('');
    this.form.controls['tipoProyecto'].setValue('');
    this.numeroPaginas = 0;
    this.numeroPaginaActual = 0;
    this.paginaActual = [];
    this.paginas = [];
    this.response = [];
    this.checkBoxheaderSelected = false;
  }

  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  myFunction2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("show2");
  }

  marcarTodosEliminar(event) {
    if(event.target.checked == true) {
      for(let x of this.paginaActual) {
      (<HTMLInputElement>document.getElementById(x.idRegla)).checked = true;
      }
    }else {
      for(let x of this.paginaActual) {
      (<HTMLInputElement>document.getElementById(x.idRegla)).checked = false;
      }
    }
    
  }

  demo() {
    this.intercambiarTexto = !this.intercambiarTexto;
    if(this.intercambiarTexto) {
      document.getElementById('opciones').innerHTML = 'evaluacion_tramite.lnk_busqueda_avanzada2';
    }else {
      document.getElementById('opciones').innerHTML = 'evaluacion_tramite.lnk_busqueda_avanzada';
    }
  }
}