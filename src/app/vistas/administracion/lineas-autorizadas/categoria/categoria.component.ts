import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CategoriaRequestDTO } from '../../../../dto/getCategoriaRequestDTO';
import { LineasAutorizadasRegla } from '../../../../dto/lineasAutorizadasRegla';
import { ParametroCategoria } from '../../../../modelo/parametroCategoria';
import { BuscarDetalle } from '../../../../modelo/buscarDetalle';
import { LineasAutorizadasService } from '../lineas-autorizadas.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  public cbmCategoria: CategoriaRequestDTO[];
  public selectValue: number[];
  public check: any = true;
  public habilitaBtn: any = true;
  public idCategoriaSelect: number[] = [];
  @Input() public idMatrizDecision: number;
  @Input() public alertHijos: boolean;
  public parmCategoria: ParametroCategoria = new ParametroCategoria();

  // SELECCIONAR
  public itemsSeleccionado: CategoriaRequestDTO[] = [];
  public checkBoxheader: boolean;
  public checkBoxElements: boolean[] = new Array<boolean>();

  @Output() public outObtenerMatriz = new EventEmitter();
  public lstMatriz: LineasAutorizadasRegla[] = [];
  public parametrosDetalle: BuscarDetalle = new BuscarDetalle();

  constructor(private servicio: LineasAutorizadasService) {}

  ngOnInit() {
    this.parmCategoria.idRegion = 9;
    this.parmCategoria.idComponente = 172;
    this.getCgCategoria();
    this.pushCkeck();
  }
  siguiente() {
    console.log('INICIA SELECCION DE CATEGORIA');
    this.eventObtenerMatriz();
    // this.pushCkeck();
  }
  eventObtenerMatriz() {
    console.log('INICIA EL EVENTO PARA OBTENER LA MATRIZ DE REGLAS');
    this.parametrosDetalle.idMatrizDecision = this.idMatrizDecision;
    // REALIZA LA PETICION AL SERVICIO PARA OBTENER EL DETALLE DE LA REGLA
    this.servicio
      // .getMatrizLineasAutorizadas(this.parametrosDetalle)
      .getMatrizLineasAutorizadas()
      .subscribe(data => {
        // SE ASINA EL VALOR DEVUELTO POR EL SERVICO A LA LISTA DE DETALLE
        this.lstMatriz = data;
        // VALIDA SI LA RESPUESTA ES VACIA
        if (this.lstMatriz.length <= 0) {
          this.lstMatriz = [];
          // this.cargarDatosTabla();
          // this.alertService.info(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO, null);
        }
      });
  }
  // FUNCION QUE SE ENCARGA DE DESELECCIONAR LOS CHECK DE LA TABLA DE RESULTADOS
  pushCkeck() {
    this.checkBoxheader = false;
    this.checkBoxElements = [];
    for (let i = 0; i < this.itemsSeleccionado.length; i++) {
      this.checkBoxElements.push(false);
    }
  }
  boxCheckAll() {
    console.log('INICIA EL EVENTO BOXCHECKALL');
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      this.checkBoxElements[i] = this.checkBoxheader;
    }
  }
  Allseleccionados() {
    console.log('INICIA EL EVENTO BORRARSELECCIONADO');
    this.itemsSeleccionado = [];
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      if (this.checkBoxElements[i]) {
        this.itemsSeleccionado.push(this.cbmCategoria[i]);
      }
    }
  }
  // AGREGA A LA LISTA LOS REGISTROS
  ItemSeleccionado(result: CategoriaRequestDTO, index: number) {
    this.itemsSeleccionado.push(result);
    console.log('CATEGORIA UNICA' + this.itemsSeleccionado.push(result));
  }
  // FUNCION QUE SE ENCARGA DE VALIDAR LOS DATOS SELECCIONADOS DE LA TABLA DE RESULTADOS
  validarDatosSeleccionados() {
    let vacio = true;
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      if (this.checkBoxElements[i]) {
        vacio = false;
      }
    }
    return !vacio;
  }
  limpiarForm() {
    console.log('INICIA LIMPIAR FORM');
    this.pushCkeck();
  }

  getCgCategoria() {
    this.servicio
      .getCategoria(this.parmCategoria)
      .subscribe(res => (this.cbmCategoria = res));
  }
}
