import { CommonModule }  from '@angular/common';
import { NgModule } from '@angular/core';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgruparComponentesComponent } from './agrupar-componentes.component';
import { ComponentesComunesModulo } from '../../../../modulos/common.module';
import { routing } from './agrupar-componentes.routing';
import { AgruparComponentesService } from './agrupar-componentes.service';
@NgModule({
  declarations: [
      AgruparComponentesComponent
  ],
  imports: [
    CommonModule, 
    AppTranslationModule, 
    FormsModule, 
    ReactiveFormsModule,
    ComponentesComunesModulo,
    routing
  ],
  exports: [
  ],
  providers: [ AgruparComponentesService ]
})
export class AgruparComponentesModule { }