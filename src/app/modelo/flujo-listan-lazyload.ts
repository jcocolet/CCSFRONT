import { Type } from '@angular/core';
import { CrearReglaListaNegraComponent } from '../vistas/administracion/lista-negra/crear-regla-lista-negra/crear-regla-lista-negra.component';
import { GenerarMatrizComponent } from '../vistas/administracion/lista-negra/generar-matriz/generar-matriz.component';
import { CategoriaComponent } from '../vistas/administracion/lista-negra/categoria/categoria.component';
import { EnvoltorioGenericoComponente } from '../utiles/envoltorioGenericoComponente';

export class FlujoListaNegraCargaPerezosa {
	private pasos: any[] = [
		{ nombre:'lista_negra.crear_regla.titulo',componente:new EnvoltorioGenericoComponente(CrearReglaListaNegraComponent).componente },
		{ nombre:'lista_negra.categoria.titulo',componente:new EnvoltorioGenericoComponente(CategoriaComponent).componente },
		{ nombre:'lista_negra.generar_matriz.titulo',componente:new EnvoltorioGenericoComponente(GenerarMatrizComponent).componente },
	];
	
	constructor() {}

	getPasos() {
		return this.pasos;
	}
}