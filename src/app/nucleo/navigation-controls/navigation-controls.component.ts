import { Component, OnInit } from '@angular/core';
import { FlujoTrabajoService } from '../../servicios/flujo-de-trabajo';

@Component({
  selector: 'app-navigation-controls',
  templateUrl: './navigation-controls.component.html'
})
export class NavigationControlsComponent implements OnInit {

  constructor(private flujoService: FlujoTrabajoService) { }

  ngOnInit() {
  }

  esInicial() {
  	return this.flujoService.esInicial();
  }

  esFinal() {
  	return this.flujoService.esFinal();
  }

  anterior() {
  	this.flujoService.anterior();
  }

  cancelar() {
  	this.flujoService.cancelar();
  }

  siguiente() {
  	this.flujoService.siguiente();
  }

}
