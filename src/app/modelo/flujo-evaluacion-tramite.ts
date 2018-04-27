import { Type } from '@angular/core';
import { InformacionBasicaComponent } from '../vistas/administracion/evaluacion-tramite/informacion-basica/informacion-basica.component';
import { AgruparComponentesComponent } from '../vistas/administracion/evaluacion-tramite/agrupar-componentes/agrupar-componentes.component';
import { EnvoltorioGenericoComponente } from '../utiles/envoltorioGenericoComponente';

export class FlujoEvaluacionTramite {
	private pasos: any[] = [
		{ nombre: 'informacion_basica.titulo', componente: new EnvoltorioGenericoComponente(InformacionBasicaComponent).componente },
		{ nombre: 'agrupar_componentes.titulo', componente: new EnvoltorioGenericoComponente(AgruparComponentesComponent).componente }
	];

	constructor() { }

	getPasos() {
		return this.pasos;
	}
}
