import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdministracionComponent } from './administracion.component';
import { EvaluacionTramiteModule } from '../../vistas/administracion/evaluacion-tramite/evaluacion-tramite.module';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'evaluaciontramite', loadChildren: '../../vistas/administracion/evaluacion-tramite/evaluacion-tramite.module#EvaluacionTramiteModule' },
      { path: 'listanegraclientes', loadChildren: '../../vistas/administracion/lista-negra/lista-negra.module#ListaNegraModule' },
      { path: 'planeslibres', loadChildren: './planeslibres/planes-libres.module#PlanesLibresModule' },
      { path: 'limitedecredito', loadChildren: './limite-credito/limite-credito.module#LimiteCreditoModule' },
      { path: 'rangodeequipo', loadChildren: './rango-equipo/rango-equipo.module#RangoEquipoModule'},
      { path: 'lineasautorizadas', loadChildren: './lineas-autorizadas/lineas-autorizadas.module#LineasAutorizadasModule'},
      { path: 'depositoengarantialibre', loadChildren:'./deposito-garantia-libre/deposito-garantia-libre.module#DepositoGarantiaLibresModule'},
      { path: 'depogarantiaforzo', loadChildren: './depoito-garantia-forzoso/deposito-garantia-forzoso.module#DepoGarantiaForzosoModule' },
      { path: 'score', loadChildren: './score/score.module#AdmonScoreModule' }
    ]
  }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);