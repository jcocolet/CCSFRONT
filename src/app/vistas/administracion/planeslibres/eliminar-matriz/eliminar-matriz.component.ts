import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-eliminar-matriz',
  templateUrl: './eliminar-matriz.component.html',
  styleUrls: ['./eliminar-matriz.component.css']
})
export class EliminarMatrizComponent implements OnInit {
  @Output() public eventOut = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  regresar() {
    this.eventOut.emit();
  }

}
