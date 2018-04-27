import { Component, OnInit, Input } from '@angular/core';
import { DetalleRango} from '../../../../dto/getMatrizRangoEquipo';

@Component({
  selector: 'app-detalle-rango-equipo',
  templateUrl: './detalle-rango-equipo.component.html',
  styleUrls: ['./detalle-rango-equipo.component.css']
})
export class DetalleRangoEquipoComponent implements OnInit {
  @Input() public nombreRegla;
  @Input() public estatusSelect;
  @Input() public idRegion;
  @Input() public lstDetalle: DetalleRango [];

  constructor() { }

  ngOnInit() {
  }

}
