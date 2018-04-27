//1. conoce el numero de pasos de un flujo de trabajo
//2. conoce cuales son esos pasos
//3. llama a los metodos necesarios (interfaz comun de cada "paso") como validacion, siguiente, anterior, etc
//4. utiliza el servicio de loggeo
//5. conoce el principio y el final de un flujo de trabajo
//6. conecta flujos de trabajo
//7. guarda y restaura flujos de trabajo (en memoria)
import { Injectable, ComponentFactoryResolver, Type } from '@angular/core';
import { FlujoComponenteDirectiva } from '../directivas/flujoComponenteDirectiva';
import { Paso } from '../interfaces/paso';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";

@Injectable()
export class FlujoTrabajoService {
	private puntoAnclaje: FlujoComponenteDirectiva;
	private objRetropropagador: Observable<any>;
	private componenteActualGenerico: Type<any>;
	private componenteActualRef: Paso;
	public indiceComponenteActual: number = 0;
	private nombreComponenteActual: string;
	private numeroPasosDelProceso: number;
	private pasosDelProceso: any[];
	private flujo: any;
	private observableSource = new Subject<boolean>();
    public observableObj = this.observableSource.asObservable();
    public procCiclico: boolean = false;
    public parametros: any = {};

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

	iniciar(flujo: any,subFlujo: boolean, parametrosIniciales: any): any {
		this.flujo = flujo;
		if(subFlujo) {
			this.indiceComponenteActual = 0;
		}
		this.pasosDelProceso = flujo.getPasos();
		this.numeroPasosDelProceso = this.pasosDelProceso.length;
		this.componenteActualGenerico = this.pasosDelProceso[this.indiceComponenteActual].componente;
		this.nombreComponenteActual = this.pasosDelProceso[this.indiceComponenteActual].nombre;
		this.componenteActualRef = this.loadComponent(this.componenteActualGenerico);
		this.componenteActualRef.setParametrosIniciales(parametrosIniciales);
		let temp =this.componenteActualRef.getRetroPropagadorEvento();
			if(temp!=null) {
				this.observableSource.next(true);
				this.objRetropropagador = temp;
			}else {
				this.observableSource.next(false);
			}
	}

	getPasos(): any {
		return this.pasosDelProceso;
	}

	getNombrePaso(): string {
		return this.nombreComponenteActual;
	}

	esInicial() {
		return (this.indiceComponenteActual===0)?true:false;
	}

	esFinal() {
		return (this.indiceComponenteActual===this.numeroPasosDelProceso-1)?true:false;

	}

	anterior() {
		this.indiceComponenteActual--;
		this.componenteActualGenerico = this.pasosDelProceso[this.indiceComponenteActual].componente;
		this.nombreComponenteActual = this.pasosDelProceso[this.indiceComponenteActual].nombre;
		this.componenteActualRef = this.loadComponent(this.componenteActualGenerico);
	}

	siguiente() {

		if(this.procCiclico) {
			let params = this.componenteActualRef.getParametrosIntercomponente();
				this.indiceComponenteActual++;
				this.componenteActualGenerico = this.pasosDelProceso[this.indiceComponenteActual].componente;
				this.nombreComponenteActual = this.pasosDelProceso[this.indiceComponenteActual].nombre;
				this.componenteActualRef = this.loadComponent(this.componenteActualGenerico);
				this.componenteActualRef.setParametrosIntercomponente(params);
				let temp =this.componenteActualRef.getRetroPropagadorEvento();
				if(temp!=null) {
					this.observableSource.next(true);
					this.objRetropropagador = temp;
				}else {
					this.observableSource.next(false);
				}
			}else {
				if( this.componenteActualRef.estaCompletado() ) {
				let params = this.componenteActualRef.getParametrosIntercomponente();
				this.indiceComponenteActual++;
				this.componenteActualGenerico = this.pasosDelProceso[this.indiceComponenteActual].componente;
				this.nombreComponenteActual = this.pasosDelProceso[this.indiceComponenteActual].nombre;
				this.componenteActualRef = this.loadComponent(this.componenteActualGenerico);
				this.componenteActualRef.setParametrosIntercomponente(params);
				let temp =this.componenteActualRef.getRetroPropagadorEvento();
				if(temp!=null) {
					this.observableSource.next(true);
					this.objRetropropagador = temp;
				}else {
					this.observableSource.next(false);
				}
			}
			}
	}

	cancelar() {
		this. indiceComponenteActual = 0;
	}

	finalizar() {
	}

	loadComponent(componente: any): any {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componente);
    let viewContainerRef = this.puntoAnclaje.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    return (<Paso>componentRef.instance);
  }

  	setPuntoAnclaje(ref: FlujoComponenteDirectiva) {
  		this.puntoAnclaje = ref;
  	}

  	getObjetoRetropropagado() {
  		return this.objRetropropagador;
  	}

  	getObjetoServicio(): Observable<any> {
  		return this.observableObj;
  	}
  	
  	estaCompletado() {
  		return this.componenteActualRef.estaCompletado();
  	}
}