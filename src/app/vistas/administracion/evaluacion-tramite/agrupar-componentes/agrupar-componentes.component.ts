import { Component, OnInit } from '@angular/core';
import { Paso } from '../../../../interfaces/paso';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { FlujoTrabajoService } from '../../../../servicios/flujo-de-trabajo';
import { FlujoListaNegra } from '../../../../modelo/flujo-lista-negra';
import { ManejadorErroresService } from '../../../../servicios/manejador-errores';
import { FlujoLimiteCredito } from '../../../../modelo/flujo-limite-credito';
import { AgruparComponentesService } from './agrupar-componentes.service';
import { Router } from "@angular/router"



@Component({
  selector: 'app-agrupar-componentes',
  templateUrl: './agrupar-componentes.component.html',
  styleUrls: ['./agrupar-componentes.component.css']
})
export class AgruparComponentesComponent implements OnInit, Paso {
	public parametros: any;
  public listaComponentes: any[] = [];
  public form: FormGroup;
  public crearModal: boolean = false;
  secuencia: number = 0;
  nombreFlujo: string = '';
  idFlujoDecision: number = 0;
  idMatrizDecision: number = 0;
  constructor(public fb: FormBuilder,
    public service: FlujoTrabajoService, 
    public servicioManejadorErrores: ManejadorErroresService,
    private acService: AgruparComponentesService,
    private router: Router) {
    this.form = fb.group({
    });

    setTimeout(()=>{
      if(this.service.procCiclico) {
      this.parametros = this.service.parametros.pop();
      let modseva = this.parametros.modeva;
      for(let reg of modseva) {
        this.listaComponentes.push(reg.descripcion);
      }
    }
    },3000);
  }

  ngOnInit() {
    if(this.service.parametros.flujoDecision != undefined ) {
      this.nombreFlujo = this.service.parametros.flujoDecision.nombreFlujo;
        this.acService.getComponentes(this.service.parametros.flujoDecision.idFlujoDecision).subscribe((response)=>{
            this.listaComponentes = response;
        });
    }

    if(this.service.parametros.flujoDecision != undefined) {
        this.idFlujoDecision = this.service.parametros.flujoDecision.idFlujoDecision;
    }
    if(this.service.parametros.MatrizDec!= undefined) {
        this.idMatrizDecision = this.service.parametros.MatrizDec.idRegla;
    }
  }

  estaCompletado() {
  	return true;
  }

  getParametrosIntercomponente() {
  	return this.parametros;
  }

  setParametrosIntercomponente(params) {
  	if(params!=null || params != undefined) {
  		this.parametros = params;
      let modseva = params.modeva;
      for(let reg of modseva) {
        this.listaComponentes.push(reg.descripcion);
      }
  	}
  }

  mostrarMensajesError() {
  }

  getRetroPropagadorEvento() {
    return null;
  }

  iniciarSubflujo(componente) {
    
    if(componente=='LISTA NEGRA') {
      /*
      let fln = new FlujoListaNegra();
      this.crearModal = true;
      this.service.iniciar(fln,true,null);*/
      this.router.navigateByUrl('/home/administracion/listanegraclientes');
    }else if(componente=='LIMITE DE CREDITO') {
      let flc = new FlujoLimiteCredito();
      this.crearModal = true;
      this.service.iniciar(flc,true,null);
    }
  }

  onSubmit(form) {

  }

  setParametrosIniciales() {

  }

  getObservable() {
    return null;
  }

  obtenerInfoRelaiconada() {
    
  }
}