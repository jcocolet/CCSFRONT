import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EvaluacionTramiteComponent } from './evaluacion-tramite.component'

export const routes: Routes = [
  { path: '', component: EvaluacionTramiteComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);