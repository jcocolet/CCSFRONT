import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppConfiguration } from '../../../utiles/app.initialization.conf';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent implements OnInit {

  constructor(public appConf : AppConfiguration) { 

  }

  ngOnInit() {

  }
}