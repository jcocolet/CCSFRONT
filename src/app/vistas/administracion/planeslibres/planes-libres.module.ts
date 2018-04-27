import { CommonModule, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './planes-libres.routing';
import { AdminPlanesLibresComponent} from './admin-regla-planeslibres/admin-planes-libres.component';
import { CategoriaPlanesLibresComponent} from './categoria/categoria-planes-libres.component';
import { CrearReglaPlanesLibresComponent} from './crear-regla/crear-regla-planes-libres.component';
import { CrearMatrizPlanesLibresComponent} from './crear-matriz/crear-matriz-planes-libres.component';
import { DetalleMatrizPlanesLibresComponent} from './detalle_matriz/detalle-matriz-planes-libresz.component';
import { AppAlertPlanesLibresComponent } from './app-alert-planes-libres/app-alert-planes-libres.component';
import { AdminPlanesLibresService } from './admin-planes-libres.service';
import { ActualizaReglaComponent } from './actualiza-regla/actualiza-regla.component';
import { EliminarMatrizComponent } from './eliminar-matriz/eliminar-matriz.component';
import { DepurarMatrizComponent } from './depurar-matriz/depurar-matriz.component';
import { DepuraElimiarMatrizComponent } from './depura-elimiar-matriz/depura-elimiar-matriz.component';

@NgModule({
  declarations: [
    AdminPlanesLibresComponent,
    CategoriaPlanesLibresComponent,
    CrearReglaPlanesLibresComponent,
    CrearMatrizPlanesLibresComponent,
    DetalleMatrizPlanesLibresComponent,
    AppAlertPlanesLibresComponent,
    ActualizaReglaComponent,
    EliminarMatrizComponent,
    DepurarMatrizComponent,
    DepuraElimiarMatrizComponent
  ],
  imports: [
    CommonModule, routing, AppTranslationModule, FormsModule, ReactiveFormsModule
  ],
  providers: [AdminPlanesLibresService]
})
export class PlanesLibresModule { }
