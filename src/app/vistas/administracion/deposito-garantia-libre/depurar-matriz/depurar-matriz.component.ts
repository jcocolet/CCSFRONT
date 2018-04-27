import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-depurar-matriz',
  templateUrl: './depurar-matriz.component.html',
  styleUrls: ['./depurar-matriz.component.css']
})
export class DepurarMatrizComponent implements OnInit {
  @Output() public eventOut = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  regresar() {
    this.eventOut.emit();
  }

}
