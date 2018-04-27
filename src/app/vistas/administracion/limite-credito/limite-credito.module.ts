import { CommonModule, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './limite-credito.routing';
import { AdminLimiteCreditoComponent} from './admin-limite-credito/limite-credito.component';
import { CategoriaLimiteCreditoComponent} from './categoria/categoria-limite-credito.component';
import { CrearReglaLimiteCreditoComponent} from './crear-regla/crear-regla-limite-credito.component';
import { CrearMatrizLimiteCreditoComponent} from './crear-matriz/crear-matriz-limite-credito.component';
import { DetalleMatrizLimiteCreditoComponent} from './detalle_matriz/detalle-matriz-limite-credito.component';
import { AlertComponent } from '../../../utiles/alert/alert.component';

import { HttpModule} from '@angular/http';

import { ComponentesComunesModulo } from '../../../modulos/common.module';
import { InformacionBasicaModule } from '../../administracion/evaluacion-tramite/informacion-basica/informacion-basica.module';

@NgModule({
  declarations: [
    AdminLimiteCreditoComponent,
    CategoriaLimiteCreditoComponent,
    CrearReglaLimiteCreditoComponent,
    CrearMatrizLimiteCreditoComponent,
    DetalleMatrizLimiteCreditoComponent,
  ],
  imports: [
    CommonModule, 
    routing, 
    AppTranslationModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpModule,
    ComponentesComunesModulo
  ],
  providers: []
})

export class LimiteCreditoModule { }