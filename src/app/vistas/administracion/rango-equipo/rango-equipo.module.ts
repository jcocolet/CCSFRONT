import { CommonModule, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './rango-equipo.routing';
import { AdminRangoEquipoComponent} from './admin-rango-equipo/admin-rango-equipo.component';
import { CategoriaRangoEquipoComponent } from './categoria/categoria-rango-equipo.component';
import { CrearReglaRangoEquipoComponent} from './crear-regla/crear-regla-rango-equipo.component';
import { CrearMatrizRangoEquipoComponent} from './crear-matriz/crear-matriz-rango-equipo.component';
import { DetalleRangoEquipoComponent} from './detalle-matriz/detalle-rango-equipo.component';
import { RangoEquipoService} from './rango-equipo.service';
import { AlertaRangoEquipoComponent } from './alerta-rango-equipo/alerta-rango-equipo.component';
import { EliminarMatrizComponent } from './eliminar-matriz/eliminar-matriz.component';
import { EditarReglaComponent } from './editar-regla/editar-regla.component';
import { EliminarDepurarMatrizComponent } from './eliminar-depurar-matriz/eliminar-depurar-matriz.component';

@NgModule({
  declarations: [
    AdminRangoEquipoComponent,
    CategoriaRangoEquipoComponent,
    CrearReglaRangoEquipoComponent,
    CrearMatrizRangoEquipoComponent,
    DetalleRangoEquipoComponent,
    AlertaRangoEquipoComponent,
    EliminarMatrizComponent,
    EditarReglaComponent,
    EliminarDepurarMatrizComponent
  ],
  imports: [
    CommonModule, routing, AppTranslationModule, FormsModule, ReactiveFormsModule
  ],
  providers: [RangoEquipoService]
})

export class RangoEquipoModule { }
