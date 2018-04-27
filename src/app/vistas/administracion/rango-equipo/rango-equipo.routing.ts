import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminRangoEquipoComponent} from '../rango-equipo/admin-rango-equipo/admin-rango-equipo.component';

export const routes: Routes = [
  { path: '', component: AdminRangoEquipoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
