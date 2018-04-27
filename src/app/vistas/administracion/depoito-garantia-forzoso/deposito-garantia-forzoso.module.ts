import { CommonModule, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './deposito-garantia-forzoso.routing';
import { AdminDepositoGarantiaForzosoComponent} from './admin-depo-garantia-forzoso/admin-depo-garantia-forzoso.component';
import { CategoriaDepositoGarantiaForzosoComponent} from './categoria/categoria-depo-garantia-forzoso.component';
import { CrearReglaDepositoGarantiaForzosoComponent} from './crear-regla/crear-regla-depo-garantia-forzoso.component';
import { CrearMatrizDepositoGarantiaForzosoComponent} from './crear-matriz/crear-matriz-depo-garantia-forzoso.component';
import { DetalleDepositoGarantiaForzosoComponent} from './detalle-matriz/detalle-depo-garantia-forzoso.component';
import { EliminarMatrizComponent } from './eliminar-matriz/eliminar-matriz.component';
import { EditarMatrizComponent } from './editar-matriz/editar-matriz.component';
import { ClonarMatrizComponent } from './clonar-matriz/clonar-matriz.component';
import { AlertaDepGarantiaForzosoComponent } from './alerta-dep-garantia-forzoso/alerta-dep-garantia-forzoso.component';

@NgModule({
  declarations: [
    AdminDepositoGarantiaForzosoComponent,
    CategoriaDepositoGarantiaForzosoComponent,
    CrearReglaDepositoGarantiaForzosoComponent,
    CrearMatrizDepositoGarantiaForzosoComponent,
    DetalleDepositoGarantiaForzosoComponent,
    EliminarMatrizComponent,
    EditarMatrizComponent,
    ClonarMatrizComponent,
    AlertaDepGarantiaForzosoComponent
  ],
  imports: [
    CommonModule, routing, AppTranslationModule, FormsModule, ReactiveFormsModule
  ],
  providers: []
})
export class DepoGarantiaForzosoModule { }
