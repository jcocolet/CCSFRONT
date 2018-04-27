import { CommonModule, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './deposito-garantia-libre.routing';
import { AdminDepositoGarantiaLibreComponent} from './admin-depo-garantia/admin-depo-garantia-libre.component';
import { CrearReglaDepositoGarantiaLibresComponent} from './crear-regla/crear-regla-depo-garantia-libre.component';
import { CategoriaDepositoGarantiaLibresComponent} from './categoria/categoria-depo-garantia-libre.component';
import { DetalleDepositoGarantiaLibresComponent} from './detalle-matriz/detalle-depo-garantia-libre.component';
import { DepositoGarantiaPLibresService} from './deposito-garantia-libre.service';
import { CrearMatrizDepoGarantiaLibresComponent} from './crear-matriz/crear-matriz-depo-garantia-libres.component';
import { AlertaDepositoPlibresComponent } from './alerta-deposito-plibres/alerta-deposito-plibres.component';
import { CrearMatrizService } from './crear-matriz/crear-matriz.service';
import { EliminarMatrizComponent } from './eliminar-matriz/eliminar-matriz.component';
import { DepurarMatrizComponent } from './depurar-matriz/depurar-matriz.component';
import { DepuraElimiarMatrizComponent } from './depura-elimiar-matriz/depura-elimiar-matriz.component';
import { ActualizarReglaComponent } from './actualizar-regla/actualizar-regla.component';

@NgModule({
  declarations: [
    AdminDepositoGarantiaLibreComponent,
    CategoriaDepositoGarantiaLibresComponent,
    CrearReglaDepositoGarantiaLibresComponent,
    DetalleDepositoGarantiaLibresComponent,
    CrearMatrizDepoGarantiaLibresComponent,
    AlertaDepositoPlibresComponent,
    EliminarMatrizComponent,
    DepurarMatrizComponent,
    DepuraElimiarMatrizComponent,
    ActualizarReglaComponent
  ],
  imports: [
    CommonModule, routing, AppTranslationModule, FormsModule, ReactiveFormsModule
  ],
  providers: [DepositoGarantiaPLibresService, CrearMatrizService]
})
export class DepositoGarantiaLibresModule { }
