import { CommonModule }  from '@angular/common';
import { NgModule } from '@angular/core';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformacionBasicaService } from './informacion-basica.service';
import { InformacionBasicaComponent } from './informacion-basica.component';
import { ComponentesComunesModulo } from '../../../../modulos/common.module';
import { AdministracionReglasListaNegraClientesComponent } from '../../lista-negra/administracion-reglas-lista-negra-clientes/administracion-reglas-lista-negra-clientes.component';
import { CrearReglaListaNegraComponent } from '../../lista-negra/crear-regla-lista-negra/crear-regla-lista-negra.component';
import { CategoriaComponent } from '../../lista-negra/categoria/categoria.component';
import { GenerarMatrizComponent } from '../../lista-negra/generar-matriz/generar-matriz.component';
import { DetalleMatrizComponent } from '../../lista-negra/detalle-matriz/detalle-matriz.component';
import { AdminLimiteCreditoComponent } from '../../limite-credito/admin-limite-credito/limite-credito.component';
import { CategoriaLimiteCreditoComponent } from '../../limite-credito/categoria/categoria-limite-credito.component';
import { CrearReglaLimiteCreditoComponent } from '../../limite-credito/crear-regla/crear-regla-limite-credito.component';
import { CrearMatrizLimiteCreditoComponent } from '../../limite-credito/crear-matriz/crear-matriz-limite-credito.component';
import { DetalleMatrizLimiteCreditoComponent } from '../../limite-credito/detalle_matriz/detalle-matriz-limite-credito.component';
import { DetalleReglaListaNegraComponent } from '../../lista-negra/detalle-regla-lista-negra/detalle-regla-lista-negra';
import { routing } from './informacion-basica.routing';
@NgModule({
  declarations: [
  		InformacionBasicaComponent
  ],
  imports: [
    CommonModule, 
    AppTranslationModule, 
    FormsModule, 
    ComponentesComunesModulo,
    ReactiveFormsModule,
    routing
  ],
  exports: [
  	InformacionBasicaComponent
  ],
  providers: [ InformacionBasicaService ]
})
export class InformacionBasicaModule { }