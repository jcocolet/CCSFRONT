import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminLineasAutorizadasComponent} from './admin-lineas-autorizadas/admin-lineas-autorizadas.component';

export const routes: Routes = [
  { path: '', component: AdminLineasAutorizadasComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);