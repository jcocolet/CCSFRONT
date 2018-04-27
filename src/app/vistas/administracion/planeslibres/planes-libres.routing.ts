import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminPlanesLibresComponent} from './admin-regla-planeslibres/admin-planes-libres.component';

export const routes: Routes = [
  { path: '', component: AdminPlanesLibresComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
