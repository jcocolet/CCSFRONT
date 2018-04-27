import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**' , redirectTo: 'home' }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot( routes, { useHash: true } );