import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdmonScoreComponent } from './admon-score/admon-score.component';


export const routes: Routes = [
  { path: '', component: AdmonScoreComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);