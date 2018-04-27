import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminDepositoGarantiaLibreComponent} from './admin-depo-garantia/admin-depo-garantia-libre.component';

export const routes: Routes = [
  { path: '', component: AdminDepositoGarantiaLibreComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);