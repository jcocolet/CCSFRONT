import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule }  from '@angular/common';

import { RoutingModule } from './app.routing';
import { HomeModule } from './nucleo/home/home.module';

import { Api } from './servicios/api';
import { Constants } from './utiles/constants';
import { AppConfiguration } from './utiles/app.initialization.conf';
import { AlertService } from './servicios/alert.service';
import { FlujoTrabajoService } from './servicios/flujo-de-trabajo';
import { OnlineService } from './servicios/online.service';
import { ManejadorErroresService } from './servicios/manejador-errores';

import { AppComponent } from './app.component';
import { NotfoundcomponentComponent } from './nucleo/notfoundcomponent/notfoundcomponent.component';



@NgModule({
  declarations: [
    AppComponent,
    NotfoundcomponentComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RoutingModule,
    HomeModule,
    CommonModule
  ],
  providers: [ 
    Api , 
    Constants , 
    AppConfiguration, 
    AlertService, 
    FlujoTrabajoService, 
    OnlineService,
    ManejadorErroresService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
