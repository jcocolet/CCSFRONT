import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AlertService } from '../../../../servicios/alert.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers:[ AlertService ]
})
export class CategoriaComponent implements OnInit {

  @Input()
  public categorias: any[] = [];

  @Output()
  public guardarCat: EventEmitter<boolean> = new EventEmitter<any>();

  public tableHeaderCheckbox: boolean = false;

  public checksSeleccionados: any = {};

  public btnDesactivado: boolean = true;

  constructor(private alertService: AlertService) { 
  }

  ngOnInit() {

  }

  avanzarGenerarMatriz() {
    if(!this.btnDesactivado) {
      this.guardarCat.emit(this.getParametrosSalida());
    }
  }

  habdesbtn() {
    let count = 0;
    for(let prop in this.checksSeleccionados) {
      if(this.checksSeleccionados[prop] == true) {
        count++;
      }
    }
    if(count>0) {
      this.btnDesactivado = false;
    }else {
      this.btnDesactivado = true;
    }
  }

  getParametrosSalida(): any {
    let parametros = [];
    for(let prop in this.checksSeleccionados) {
      if(this.checksSeleccionados[prop] == true) {
        for(let reg of this.categorias) {
          if(reg.idCategoria == prop) {
            parametros.push(reg);
          }
        }
      }
    }
    return parametros;
  }

}