import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'administracion', loadChildren: '../../vistas/administracion/administracion.module#AdministracionModule' },
      //{ path: 'reportes', loadChildren: '../../vistas/administracion/administracion.module#AdministracionModule' },
      //{ path: 'catalogos', loadChildren: '../../vistas/administracion/administracion.module#AdministracionModule' },
      //{ path: 'seguridad', loadChildren: '../../vistas/administracion/administracion.module#AdministracionModule' }
    ]
  }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);