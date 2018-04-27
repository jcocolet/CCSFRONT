import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AgruparComponentesComponent } from './agrupar-componentes.component'

export const routes: Routes = [
  { path: '', component: AgruparComponentesComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);