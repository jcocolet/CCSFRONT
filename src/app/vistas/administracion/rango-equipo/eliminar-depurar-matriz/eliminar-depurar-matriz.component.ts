import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-eliminar-depurar-matriz',
  templateUrl: './eliminar-depurar-matriz.component.html',
  styleUrls: ['./eliminar-depurar-matriz.component.css']
})
export class EliminarDepurarMatrizComponent implements OnInit {
  @Output() public eventOut = new EventEmitter();
  @Input() public msjEliminar: string;
  @Input() public msjEliminarTitulo: string;
  // DEPURAR ELIMINAR
  @Input()  public totalDepurarEliminar: number;
  @Input()  public totalDepurar: number;
  @Input()  public totalEliminar: number;

  constructor() { }

  ngOnInit() {
  }

  regresar() {
    this.eventOut.emit();
  }
}
