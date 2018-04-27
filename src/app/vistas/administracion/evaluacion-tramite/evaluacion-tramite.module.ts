import { CommonModule }  from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { routing } from './evaluacion-tramite.routing';
import { EvaluacionTramiteComponent } from './evaluacion-tramite.component';
import { ModalComponent } from '../../../nucleo/modal/modal.component';
import { NavigationControlsComponent } from '../../../nucleo/navigation-controls/navigation-controls.component';
import { AgruparComponentesComponent } from './agrupar-componentes/agrupar-componentes.component';
import { AdministracionReglasListaNegraClientesComponent } from '../lista-negra/administracion-reglas-lista-negra-clientes/administracion-reglas-lista-negra-clientes.component';
import { CrearReglaListaNegraComponent } from '../lista-negra/crear-regla-lista-negra/crear-regla-lista-negra.component';
import { CategoriaComponent } from '../lista-negra/categoria/categoria.component';
import { GenerarMatrizComponent } from '../lista-negra/generar-matriz/generar-matriz.component';
import { DetalleMatrizComponent } from '../lista-negra/detalle-matriz/detalle-matriz.component';
import { AppTranslationModule } from '../../../app.translation.module';
import { EvaluacionTramiteService } from './evaluacion-tramite.service';
import { InformacionBasicaComponent } from '../../../vistas/administracion/evaluacion-tramite/informacion-basica/informacion-basica.component';
import { AlertComponent } from '../../../utiles/alert/alert.component';
import { FlujoComponenteDirectiva} from '../../../directivas/flujoComponenteDirectiva';
import { FlujoTrabajoService } from '../../../servicios/flujo-de-trabajo';
import { InformacionBasicaModule } from './informacion-basica/informacion-basica.module';
import { InicializacionComponente } from './inicializacion.componente.conf';
import { StepperComponent } from '../../../nucleo/stepper/stepper.component';
import { ComponentesComunesModulo } from '../../../modulos/common.module';
import { EstatusPipe } from '../../../pipes/estatus.pipe';
import { SiNoPipe } from '../../../pipes/sino.pipe';
import { DetalleReglaComponent } from './detalle-regla/detalle-regla.component';
import { ListaNegraModule } from '.././lista-negra/lista-negra.module';
import { AdminLimiteCreditoComponent } from '../limite-credito/admin-limite-credito/limite-credito.component';
import { CategoriaLimiteCreditoComponent } from '../limite-credito/categoria/categoria-limite-credito.component';
import { CrearReglaLimiteCreditoComponent } from '../limite-credito/crear-regla/crear-regla-limite-credito.component';
import { CrearMatrizLimiteCreditoComponent } from '../limite-credito/crear-matriz/crear-matriz-limite-credito.component';
import { DetalleMatrizLimiteCreditoComponent } from '../limite-credito/detalle_matriz/detalle-matriz-limite-credito.component';

@NgModule({
  declarations: [
    EvaluacionTramiteComponent,
    //AgruparComponentesComponent,
    //InformacionBasicaComponent,
    DetalleReglaComponent
  ],
  imports: [
    CommonModule, 
    routing,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    ComponentesComunesModulo,
    //ListaNegraModule
  ],
  entryComponents: [
  ],
  providers: [ EvaluacionTramiteService, FlujoTrabajoService, InicializacionComponente ]
})
export class EvaluacionTramiteModule { }