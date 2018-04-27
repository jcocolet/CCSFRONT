import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminLimiteCreditoComponent} from '../limite-credito/admin-limite-credito/limite-credito.component';

export const routes: Routes = [
  { path: '', component: AdminLimiteCreditoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
