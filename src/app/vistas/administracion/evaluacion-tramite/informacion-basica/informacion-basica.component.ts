import { Component, OnInit,  AfterViewInit, OnDestroy } from '@angular/core';
import { InformacionBasicaService } from './informacion-basica.service';
import { GetOpcionesInfoBasicUsuResponseDTO } from '../../../../dto/getOpcionesInformacionBasicaPorUsuarioResponseDTO';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../servicios/alert.service';
import { Paso } from '../../../../interfaces/paso';
import { ManejadorErroresService } from '../../../../servicios/manejador-errores';
import { EvaluacionTramiteGetDetallesRegla } from '../../../../dto/evaluacionTramiteGetDetallesRegla';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { FlujoTrabajoService } from '../../../../servicios/flujo-de-trabajo';

@Component({
  selector: 'app-informacion-basica',
  templateUrl: './informacion-basica.component.html',
  styleUrls: ['./informacion-basica.component.css']
})

export class InformacionBasicaComponent implements OnInit, Paso {

  //DECLARACIONES
  public tablas: any[] = [
    {nombre:'canalesVenta', datos: []},
    {nombre:'fuerzasVenta', datos: []},
    {nombre:'tramites', datos: []},
    {nombre:'modulosEvaluacion', datos: []},
    {nombre:'tiposProyecto', datos: []},
    {nombre:'marcas', datos: []},
    {nombre:'modelos', datos: []}
  ];
  public regiones: any[] = [1,2,3,4,5,6,7,8,9]; //Dummy
  public regionUsuario: number = 9; //Dummy
  public tiempoIndefinido: boolean = false;
  public response1: GetOpcionesInfoBasicUsuResponseDTO ;
  public form: FormGroup;
  public nombreFlujo: AbstractControl;
  public tiempoIndefinidoCtrl: AbstractControl;
  public fechaInicio: AbstractControl;
  public fechaFin: AbstractControl;
  public ventaPlazos: AbstractControl;
  public mhCheckbox : boolean = false;
  public thCheckbox : boolean = false;
  public formParametros: any = {
    'nombreFlujo': ['', Validators.compose([Validators.required])],
    'tiempoIndefinidoCtrl': ['', Validators.compose([])],
    'fechaInicio': ['', Validators.compose([Validators.required])],
    'fechaFin': ['', Validators.compose([Validators.required])],
    'ventaPlazos': ['', Validators.compose([])]
  };
  public obj:any = {};
  public informacionRegla: EvaluacionTramiteGetDetallesRegla = undefined;
  public componentePropietarioIB: boolean = true;
  public idsCanalVentaSel: number[] = [];
  public idsMarcasSel: number[] = [];
  public observableSource = new Subject<boolean>();
  public observableObj = this.observableSource.asObservable();
  public modulosEvaluacion: any[] = [];
  btnSiguienteDesactivado: boolean = true;
  btnGuardarDesactivado: boolean = false;

  //INICIALIZACION
  constructor(
    public service: InformacionBasicaService, 
    public fb: FormBuilder, 
    public alertService: AlertService,
    public servicioManejadorErrores: ManejadorErroresService,
    public ftService: FlujoTrabajoService) {
        this.form = fb.group(this.formParametros);
        this.nombreFlujo = this.form.controls['nombreFlujo'];
        this.tiempoIndefinidoCtrl = this.form.controls['tiempoIndefinidoCtrl'];
        this.fechaInicio = this.form.controls['fechaInicio'];
        this.fechaFin = this.form.controls['fechaFin'];
        this.ventaPlazos = this.form.controls['ventaPlazos'];
        this.response1 = new GetOpcionesInfoBasicUsuResponseDTO();
        this.service.getOpcionesInfoBasicUsuResponseDTO(this.regionUsuario).subscribe((data)=>{
        this.response1 = data;
        this.tablas[0].datos = this.response1.canalesVenta;
        this.tablas[1].datos = [];
        this.tablas[2].datos = this.response1.tramites;
        this.tablas[3].datos = this.response1.modulosEvaluacion;
        this.tablas[4].datos = this.response1.tiposProyecto;
        this.tablas[5].datos = this.response1.marcas;
        this.tablas[6].datos = [];
        for(let propertyKey in this.response1) {
          let propertyValue1 = this.response1[propertyKey];
          if(Object.keys(propertyValue1).length>0) {
            this.obj[propertyKey] = {};
          }
        }
    },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err);
    });

      this.informacionRegla = new EvaluacionTramiteGetDetallesRegla();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentePropietarioIB = false;
  }

  //VALIDACIONES

  validarGruposChecks():boolean {
    let valid = true;
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
    for(let propertyKey in this.obj) {
          let seleccionados = 0;
          let propertyValue = this.obj[propertyKey];
          if(Object.keys(propertyValue).length>0) {
            for(let propertyKey2 in propertyValue) {
              if(propertyValue[propertyKey2] == true) {
                seleccionados++;
              }
            }
          }
          if(seleccionados==0){
            valid = false;
            this.alertService.error('almns_unchck',propertyKey,null);
          }
        }
        return valid;
  }

  estaCompletado(): boolean {
      this.prueba();
      
      if(this.validarGruposChecks()===false) {
        return false;
      }
      if(this.form.valid) {
        let requestOptions = {
          gruposChecks: this.obj,
          form: this.form.value,
          region: this.regionUsuario
        }
        this.service.crearFlujo(requestOptions).subscribe((response)=>{
          if(response == 'OK') {
            this.alertService.success('fdecExito',null,null);
          }else {
            this.alertService.success('fdecError',null,null);
            return false;
          }
        },(error)=>{
          this.servicioManejadorErrores.resuelveErroresServidor(error.code);
          return false;
        });
      }
      return this.form.valid;
  }

  setParametrosIntercomponente(params) {

  }

  getParametrosIntercomponente() {
    let params = {
      checks: this.obj,
      form: this.form.value,
      modeva: this.modulosEvaluacion
    }

    this.ftService.parametros.push(params);
    return params;
  }

  mostrarMensajesError() {
    this.alertService.error('infbasc_compltds',null,null);
  }

  getRetroPropagadorEvento() {
    return null;
  }

  evitaEspeciales(evt):void {
    let regEx = /^([a-z0-9A-Z ])$/;
    if(!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }

  getInfoRelacionada(evento,nombreTabla,registro) {
    if(nombreTabla=='canalesVenta') {
      if(evento !== undefined) {
        if(evento.target.checked === true) {
            this.service.getFuerzaVenta(registro.id).subscribe((data)=>{
              if(data.length>0) {
                this.idsCanalVentaSel.push(registro.id);
                this.tablas[1].datos = this.tablas[1].datos.concat(data);
              }
              this.obj['fuerzasVenta'] = {};
            },(err)=>{
                this.servicioManejadorErrores.resuelveErroresServidor(err);
            });
        }else {
          this.actualizaIdsCanalVentaSel(registro.id);
          this.tablas[1].datos = [];
          for(let id of this.idsCanalVentaSel) {
            this.service.getFuerzaVenta(id).subscribe((data)=>{
              if(data.length>0) {
                this.tablas[1].datos = this.tablas[1].datos.concat(data);
              }
              this.obj['fuerzasVenta'] = {};
            },(err)=>{
                this.servicioManejadorErrores.resuelveErroresServidor(err);
            });
          }
        }
      }
    }else if(nombreTabla=='marcas') {
      if(evento !== undefined) {
      if(evento.target.checked === true) {
          this.service.getModelos(registro.id).subscribe((data)=>{
            if(data.length>0) {
                this.idsMarcasSel.push(registro.id);
                this.tablas[6].datos = this.tablas[6].datos.concat(data);
            }
            this.obj['modelos'] = {};
          },(err)=>{
      this.servicioManejadorErrores.resuelveErroresServidor(err);
    });
        }else {
          this.actualizaIdsMarcasSel(registro.id);
          this.tablas[6].datos = [];
          for(let id of this.idsMarcasSel) {
            this.service.getModelos(id).subscribe((data)=>{
              if(data.length>0) {
                this.tablas[6].datos = this.tablas[6].datos.concat(data);
              }
              this.obj['fuerzasVenta'] = {};
            },(err)=>{
                this.servicioManejadorErrores.resuelveErroresServidor(err);
            });
          }
        }
      }
    }
  }

  onSubmit(form) {
      this.prueba();
      if(this.validarGruposChecks()===false) {
        return false;
      }
      if(this.form.valid) {
        let requestOptions = {
          gruposChecks: this.obj,
          form: this.form.value,
          region: this.regionUsuario
        }
        this.service.crearFlujo(requestOptions).subscribe((response)=>{
          console.log(response.estatus);
          this.ftService.parametros['flujoDecision'] = response;
          if(response =! undefined ) {
            this.alertService.success('fdecExito',null,null);
            this.btnSiguienteDesactivado = false;
          }else {
            this.alertService.success('fdecError',null,null);
            return false;
          }
        },(error)=>{
          this.servicioManejadorErrores.resuelveErroresServidor(error.code);
          return false;
        });
      }
  }

  intercambiaOpciones() {
    this.tiempoIndefinido = !this.tiempoIndefinido;
    this.tiempoIndefinido?this.fechaInicio.disable({onlySelf:false, emitEvent: false}):this.fechaInicio.enable({onlySelf:false, emitEvent: false});
    this.tiempoIndefinido?this.fechaFin.disable({onlySelf:false, emitEvent: false}):this.fechaFin.enable({onlySelf:false, emitEvent: false});
  }

  seldesChkbx(evento,nomtabla) {
      if(evento.target.checked == true) {
        if (nomtabla == 'fuerzasVenta' && this.tablas[1].datos.length>0) {
            for(let item of this.tablas[1].datos) {
              this.obj['fuerzasVenta'][item.id] = true;
            }
        }else if (nomtabla == 'modelos' && this.tablas[6].datos.length>0) {
            for(let item of this.tablas[6].datos) {
              this.obj['modelos'][item.id] = true;
            }
        }else {
          for(let item of this.response1[nomtabla]) {
            this.obj[nomtabla][item.id] = true;
          }
          if(nomtabla == 'canalesVenta') {
              console.log('SE SELECCIONO TODO DE CANALES DE VENTA');
              if(this.idsCanalVentaSel.length == 0) {
                for(let registro of this.response1.canalesVenta) {
                    this.idsCanalVentaSel.push(registro.id);
                }
                for(let id of this.idsCanalVentaSel) {
                  this.service.getFuerzaVenta(id).subscribe((data)=>{
                    if(data.length>0) {
                      this.tablas[1].datos = this.tablas[1].datos.concat(data);
                    }
                    this.obj['fuerzasVenta'] = {};
                  },(err)=>{
                    this.servicioManejadorErrores.resuelveErroresServidor(err);
                  });
                }
              }
          }
          if(nomtabla == 'marcas') {
            console.log('SE SELECCIONO TODO DE MARCAS');
            if(this.idsMarcasSel.length == 0) {
                for(let registro of this.response1.marcas) {
                    this.idsMarcasSel.push(registro.id);
                }
                for(let id of this.idsMarcasSel) {
                  this.service.getModelos(id).subscribe((data)=>{
                    if(data.length>0) {
                      this.tablas[6].datos = this.tablas[6].datos.concat(data);
                    }
                    this.obj['modelos'] = {};
                  },(err)=>{
                    this.servicioManejadorErrores.resuelveErroresServidor(err);
                  });
                }
              }
          }
        }
      }else {
        if (nomtabla == 'fuerzasVenta' && this.tablas[1].datos.length>0) {
            for(let item of this.tablas[1].datos) {
              this.obj['fuerzasVenta'][item.id] = false;
            }
        }else if (nomtabla == 'modelos' && this.tablas[6].datos.length>0) {
            for(let item of this.tablas[6].datos) {
              this.obj['modelos'][item.id] = false;
            }
        }else {
          for(let item of this.response1[nomtabla]) {
            this.obj[nomtabla][item.id] = false;
          }
          if(nomtabla == 'canalesVenta') {
              console.log('SE DES-SELECCIONO TODO DE CANALES DE VENTA');
              this.tablas[1].datos = [];
              this.idsCanalVentaSel = [];
          }
          if(nomtabla == 'marcas') {
              console.log('SE DES-SELECCIONO TODO DE MARCAS');
              this.tablas[6].datos = [];
              this.idsMarcasSel = [];
          }
        }
      }
  }

  setParametrosIniciales(params: any) {
    if(params != undefined) {
      if(params.idFlujo!=undefined) {
        this.service.recuperarInformacionFlujo(params.idFlujo).subscribe((response)=>{
          this.informacionRegla = response;
          this.form.controls['nombreFlujo'].setValue(this.informacionRegla.nombreRegla);
        });
      }
    }
  }

  actualizaIdsCanalVentaSel(idRegla: number) {
    let tempArrayIds = [];
    for(let id of this.idsCanalVentaSel) {
      if(id==idRegla) {
        continue
      }else {
        tempArrayIds.push(id);
      }
    }
    this.idsCanalVentaSel = tempArrayIds;
  }

  actualizaIdsMarcasSel(idRegla: number) {
    let tempArrayIds = [];
    for(let id of this.idsMarcasSel) {
      if(id==idRegla) {
        continue
      }else {
        tempArrayIds.push(id);
      }
    }
    this.idsMarcasSel = tempArrayIds;
  }

  getObservable() : Observable<boolean> {
    return this.observableObj;
  }

  prueba() {
    console.log(this.obj.modulosEvaluacion);
    console.log(this.response1.modulosEvaluacion);
    if(this.modulosEvaluacion.length>0) {
      this.modulosEvaluacion = [];
    }
    for(let popKey in this.obj.modulosEvaluacion) {
      let valor = this.obj.modulosEvaluacion[popKey];
      for(let item of this.response1.modulosEvaluacion) {
        if(popKey == item.id && valor == true) {

            this.modulosEvaluacion.push(item);
        }
      }
    }
  }

}