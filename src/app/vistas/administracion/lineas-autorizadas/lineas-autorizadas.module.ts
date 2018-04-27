import { LineasAutorizadasService } from './lineas-autorizadas.service';
import { CommonModule, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './lineas-autorizadas.routing';
import { AdminLineasAutorizadasComponent} from './admin-lineas-autorizadas/admin-lineas-autorizadas.component';
import { AlertaLineasAutorizadasComponent } from './alerta-lineas-autorizadas/alerta-lineas-autorizadas.component';
import { CrearReglaComponent } from './crear-regla/crear-regla.component';
import { ActualizarReglaComponent } from './actualizar-regla/actualizar-regla.component';
import { CrearMatrizComponent } from './crear-matriz/crear-matriz.component';
import { CategoriaComponent } from './categoria/categoria.component';

@NgModule({
  declarations: [
    AdminLineasAutorizadasComponent,
    AlertaLineasAutorizadasComponent,
    CrearReglaComponent,
    ActualizarReglaComponent,
    CrearMatrizComponent,
    CategoriaComponent
  ],
  imports: [
    CommonModule, routing, AppTranslationModule, FormsModule, ReactiveFormsModule
  ],
  providers: [LineasAutorizadasService]
})

export class LineasAutorizadasModule { }