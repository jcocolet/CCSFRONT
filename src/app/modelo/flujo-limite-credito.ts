import { Type } from '@angular/core';
import { AdminLimiteCreditoComponent } from '../vistas/administracion/limite-credito/admin-limite-credito/limite-credito.component';
import { GenerarMatrizComponent } from '../vistas/administracion/lista-negra/generar-matriz/generar-matriz.component';
import { DetalleMatrizComponent } from '../vistas/administracion/lista-negra/detalle-matriz/detalle-matriz.component';
import { EnvoltorioGenericoComponente } from '../utiles/envoltorioGenericoComponente';

export class FlujoLimiteCredito {
	private pasos: any[] = [
		{ nombre:'limite_credito.administracion.titulo',componente:new EnvoltorioGenericoComponente(AdminLimiteCreditoComponent).componente }
	];
	
	constructor() {}

	getPasos() {
		return this.pasos;
	}
}