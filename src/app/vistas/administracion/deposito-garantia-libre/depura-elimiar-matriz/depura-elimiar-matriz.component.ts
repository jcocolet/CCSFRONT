import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-depura-elimiar-matriz',
  templateUrl: './depura-elimiar-matriz.component.html',
  styleUrls: ['./depura-elimiar-matriz.component.css']
})
export class DepuraElimiarMatrizComponent implements OnInit {
  @Output() public eventOut = new EventEmitter();
  @Input() public totalDepurarEliminar: number;
  @Input() public totalDepurar: number;
  @Input() public totalEliminar: number;
  constructor() { }

  ngOnInit() {
    this.totalDepurarEliminar = 0;
    this.totalDepurar = 0;
    this.totalEliminar = 0;
  }
  regresar() {
    this.eventOut.emit();
  }

}
