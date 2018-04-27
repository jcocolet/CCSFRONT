import { Type } from '@angular/core';
import { AdministracionReglasListaNegraClientesComponent } from '../vistas/administracion/lista-negra/administracion-reglas-lista-negra-clientes/administracion-reglas-lista-negra-clientes.component';
import { GenerarMatrizComponent } from '../vistas/administracion/lista-negra/generar-matriz/generar-matriz.component';
import { DetalleMatrizComponent } from '../vistas/administracion/lista-negra/detalle-matriz/detalle-matriz.component';
import { EnvoltorioGenericoComponente } from '../utiles/envoltorioGenericoComponente';

export class FlujoListaNegra {
	private pasos: any[] = [
		{ nombre:'lista_negra.administracion.titulo',componente:new EnvoltorioGenericoComponente(AdministracionReglasListaNegraClientesComponent).componente },
		{ nombre:'lista_negra.generar_matriz.titulo',componente:new EnvoltorioGenericoComponente(GenerarMatrizComponent).componente },
	];
	
	constructor() {}

	getPasos() {
		return this.pasos;
	}
}