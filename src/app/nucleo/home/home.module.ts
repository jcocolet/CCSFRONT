import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RoutingModule } from './home.routing';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../nucleo/header/header.component';
import { MenuBarComponent } from '../home/menu-bar/menu-bar.component';
import { MainComponent } from '../home/main/main.component';
import { FooterComponent } from '../../nucleo/footer/footer.component';
import { AppTranslationModule } from '../../app.translation.module';

@NgModule({
  declarations: [
  	HomeComponent,
  	HeaderComponent,
  	MenuBarComponent,
  	MainComponent,
  	FooterComponent,
  ],
  imports: [
    CommonModule, RoutingModule , AppTranslationModule
  ],
  providers: []
})
export class HomeModule { }