import { Observable } from 'rxjs/Observable';
export interface Paso {
	estaCompletado(): boolean;
	mostrarMensajesError();
	setParametrosIntercomponente(params: any);
	getParametrosIntercomponente(): any;
	getRetroPropagadorEvento(): Observable<any>;
	setParametrosIniciales(params: any);
	getObservable(): Observable<any>;
}