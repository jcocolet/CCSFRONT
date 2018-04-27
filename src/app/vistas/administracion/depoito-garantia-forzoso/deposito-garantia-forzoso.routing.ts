import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminDepositoGarantiaForzosoComponent} from './admin-depo-garantia-forzoso/admin-depo-garantia-forzoso.component';

export const routes: Routes = [
  { path: '', component: AdminDepositoGarantiaForzosoComponent}
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
