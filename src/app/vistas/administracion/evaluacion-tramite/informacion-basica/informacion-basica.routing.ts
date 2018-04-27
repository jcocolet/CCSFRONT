import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InformacionBasicaComponent } from './informacion-basica.component'

export const routes: Routes = [
  { path: '', component: InformacionBasicaComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);