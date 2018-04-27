import { CommonModule }  from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from '../utiles/alert/alert.component';
import { ModalComponent } from '../nucleo/modal/modal.component';
import { StepperComponent } from '../nucleo/stepper/stepper.component';
import { NavigationControlsComponent } from '../nucleo/navigation-controls/navigation-controls.component';
import { EstatusPipe } from '../pipes/estatus.pipe';
import { SiNoPipe } from '../pipes/sino.pipe';
import { AppTranslationModule } from '../app.translation.module';
import { FlujoComponenteDirectiva } from '../directivas/flujoComponenteDirectiva';

@NgModule({
  declarations: [
    StepperComponent,
    NavigationControlsComponent,
    AlertComponent,
    EstatusPipe,
    SiNoPipe,
    FlujoComponenteDirectiva,
    ModalComponent,
  ],
  imports: [
    CommonModule, AppTranslationModule
  ],
  exports: [
    StepperComponent,
    NavigationControlsComponent,
    AlertComponent,
    EstatusPipe,
    SiNoPipe,
    FlujoComponenteDirectiva,
    ModalComponent,
  ],
  providers: [ ]
})
export class ComponentesComunesModulo { }