import { CommonModule, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './score.routing';
import { CrearReglaComponent } from './crear-regla/crear-regla.component';
import { ScoreService } from './score.service';
import { AlertaScoreComponent } from './alerta-score/alerta-score.component';
import { AdmonScoreComponent } from './admon-score/admon-score.component';
import { ActualizarReglaComponent } from './actualizar-regla/actualizar-regla.component';


@NgModule({
  declarations: [
    AdmonScoreComponent,
    CrearReglaComponent,
    AlertaScoreComponent,
    ActualizarReglaComponent
    // CategoriaPlanesLibresComponent,
    // CrearReglaPlanesLibresComponent,
    // CrearMatrizPlanesLibresComponent,
    // DetalleMatrizPlanesLibresComponent
  ],
  imports: [
    CommonModule, routing, AppTranslationModule, FormsModule, ReactiveFormsModule
  ],
  providers: [ScoreService]
})
export class AdmonScoreModule { }
