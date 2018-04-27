import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdministracionReglasListaNegraClientesComponent } from '../lista-negra/administracion-reglas-lista-negra-clientes/administracion-reglas-lista-negra-clientes.component';

export const routes: Routes = [
  { path: '', component: AdministracionReglasListaNegraClientesComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);