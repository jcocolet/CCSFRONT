import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-eliminar-matriz',
  templateUrl: './eliminar-matriz.component.html',
  styleUrls: ['./eliminar-matriz.component.css']
})
export class EliminarMatrizComponent implements OnInit {
  @Output() public eventOut = new EventEmitter();
  @Input() public msjEliminar: string;
  @Input() public msjEliminarTitulo: string;
  constructor() { }

  ngOnInit() {
  }

  regresar() {
    this.eventOut.emit();
  }
}
