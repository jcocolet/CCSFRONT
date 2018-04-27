import { Component, OnInit } from '@angular/core';
import { DetalleReglaService } from './detalle-regla.service';
import { EvaluacionTramiteGetDetallesRegla } from '../../../../dto/evaluacionTramiteGetDetallesRegla';

@Component({
  selector: 'app-detalle-regla',
  templateUrl: './detalle-regla.component.html',
  styleUrls: ['./detalle-regla.component.css'],
  providers: [ DetalleReglaService ]
})
export class DetalleReglaComponent implements OnInit {

  private idFlujo: number;
  public informacionRegla: EvaluacionTramiteGetDetallesRegla = undefined;
  constructor(private restService: DetalleReglaService) {
  	this.informacionRegla = new EvaluacionTramiteGetDetallesRegla();
  	
  }

  ngOnInit() {
  	
  }

  getRetroPropagadorEvento() {
  	return null;
  }

  setParametrosIniciales(params: any) {
    this.idFlujo = params.idFlujo;
    console.log(this.idFlujo);
    this.restService.getDetallesRegla(this.idFlujo).subscribe((response)=>{
      this.informacionRegla = response;
    });
    this.ngOnInit();
  }

}