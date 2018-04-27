import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TgMatriz } from '../../../../modelo/TgMatriz.model';
import { CgEstatusRegistro } from '../../../../modelo/cgEstatusRegistro.model';

@Component({
  selector: 'app-editar-matriz',
  templateUrl: './editar-matriz.component.html',
  styleUrls: ['./editar-matriz.component.css']
})
export class EditarMatrizComponent implements OnInit {
  @Input() public matrizVo: TgMatriz;
  @Input() public estatus: CgEstatusRegistro;
  @Input() public lstEstatus: CgEstatusRegistro [];
  @Output() public eventOut = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  modificar() {
    this.eventOut.emit();
  }
    // EVENTO QUE SE ENCARGA DE VALIDAR DATOS ESPECIALES
    evitaEspeciales(evt): void {
      const regEx = /^([a-z0-9A-Z ])$/;
      if (!regEx.test(evt.key)) {
        evt.preventDefault();
      }
    }
    limpiarForm() {
     // this.matrizVo.estatusMatriz = '';
      this.matrizVo.nombreMatriz = '';
    }

}
