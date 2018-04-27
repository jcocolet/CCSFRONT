import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalle-regla-lista-negra',
  templateUrl: './detalle-regla-lista-negra.html',
  styleUrls: ['./detalle-regla-lista-negra.css'],
  providers: []
})
export class DetalleReglaListaNegraComponent implements OnInit {

  private idFlujo: number;
  //Variables del paginador
  public multiplosPaginador: number[] = [5,10,15];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any [] = [];
  public numeroPaginas: number = 0;
  public paginaActual: any = [];
  public numeroPaginaActual: number = 0;
  //Fin variables paginador
  public response: any[] = [];

  public elementosvComponente: any = {
    columnas: [
        'th_col_name_accion','th_col_name_rech_aut',
        'th_col_name_most_coin','th_col_name_mod_invest']
  }

  @Input()
  public regla: any;
  @Input()
  public matrices: any;
  regla2: any = {
    nombreRegla: '',
    estatus: ''
  };
  constructor() {
  }

  ngOnInit() {
    this.regla.subscribe((regla)=>{
      console.log(regla);
      this.regla2 = regla;
    });
    this.matrices.subscribe((matrices)=>{
      console.log(matrices);
      this.response = matrices;
      this.cargarDatosTabla();
      this.paginaActual = this.paginas[this.numeroPaginaActual];
    });
  }

  getRetroPropagadorEvento() {
  	return null;
  }

  setParametrosIniciales(params: any) {

  }

  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  myFunction2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("show2");
  }

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
    this.numeroPaginaActual = 0;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
    for(let x of this.paginaActual) {
      (<HTMLInputElement>document.getElementById(x.idRegla)).checked = false;
    }
  }

  cargarDatosTabla() {
    let pagina = [];
    let contador = 0;
    this.numeroPaginas = Math.ceil(this.response.length/this.numeroRegistrosPagina);
    if(this.paginas.length>0) {
      this.paginas = [];
    }
    for (let i = 0; i < this.response.length; i++) {
      pagina.push(this.response[i]);
      contador++;
      if(contador==this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
        contador = 0;
        pagina = [];
        continue;
      }
    }
    if(pagina.length<this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
    }
  }
  
}