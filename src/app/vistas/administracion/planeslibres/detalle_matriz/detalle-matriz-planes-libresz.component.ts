import { Component, OnInit, Input } from '@angular/core';
import { MatrizAdmPlanLibres } from '../../../../modelo/MatrizAdmPlanLibres';


@Component({
  selector: 'app-detalle-matriz-planes-libres',
  templateUrl: './detalle-matriz-planes-libres.component.html',
  styleUrls: ['./detalle-matriz-planes-libres.component.css']
})
export class DetalleMatrizPlanesLibresComponent implements OnInit {

  @Input() public idRegion: number;
  @Input() public estatusClave: string;
  @Input() public idSeleccionado: number;
  @Input() public nombreRegla: string;
  @Input() public lstDetalle: MatrizAdmPlanLibres[] = [];
  @Input() public idCategoriaSelect: number[] = [];

  public checksSeleccionadosTabla: any[] = [];
  public multiplosPaginador: number[] = [5, 10, 15];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any[] = [];
  public numeroPaginas: number;
  public paginaActual: any = [];
  public numeroPaginaActual: number;
  public cachePaginas: any[] = [];

  constructor() { }

  ngOnInit() {
    this.lstDetalle = [];
  }
  /*FUNCION QUE SE ENCARGA DE LA ACCION DE SIGUIENTE PAGUINA DEL PAGINADO */
  siguientePagina() {
    this.numeroPaginaActual++;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }

  paginaAnterior() {
    this.numeroPaginaActual--;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }

  establecerRegistrosMostrar(evento) {
    this.numeroRegistrosPagina = evento.target.value;
    this.cargarDatosTabla();
    this.ngOnInit();
  }
  cargarDatosTabla() {
    let pagina = [];
    let contador = 0;
    this.numeroPaginas = Math.ceil(this.lstDetalle.length / this.numeroRegistrosPagina);
    if (this.paginas.length > 0) {
      this.paginas = [];
    }
    for (let i = 0; i < this.lstDetalle.length; i++) {
      pagina.push(this.lstDetalle[i]);
      contador++;
      if (contador === this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
        contador = 0;
        pagina = [];
        continue;
      }
    }

    console.log(this.paginas);
  }
}
