import { Component, OnInit } from '@angular/core';
import { Paso } from '../../../../interfaces/paso';

@Component({
  selector: 'app-detalle-matriz',
  templateUrl: './detalle-matriz.component.html',
  styleUrls: ['./detalle-matriz.component.css']
})
export class DetalleMatrizComponent implements OnInit, Paso {

  constructor() { }

  ngOnInit() {
  }

  estaCompletado() {
  	return true;
  }

  mostrarMensajesError() {

  }

  setParametrosIntercomponente() {

  }

  getParametrosIntercomponente() {
  	
  }

  getRetroPropagadorEvento() {
    return null;
  }

  setParametrosIniciales() {
    
  }

  getObservable() {
    return null;
  }

}
