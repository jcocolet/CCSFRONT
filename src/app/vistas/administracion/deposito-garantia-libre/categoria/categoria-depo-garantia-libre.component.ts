import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriaRequestDTO } from '../../../../dto/getCategoriaRequestDTO';
import { DepositoGarantiaPLibresService } from '../deposito-garantia-libre.service';
import { ParametroCategoria } from '../../../../modelo/parametroCategoria';
import { MatrizDepoGarantiaPLibres } from '../../../../modelo/matrizDepoGarantiaPLibres';
import { BuscarDetalle } from '../../../../modelo/buscarDetalle';


@Component({
  selector: 'app-categoria-depo-garantia-libre',
  templateUrl: './categoria-depo-garantia-libre.component.html',
  styleUrls: ['./categoria-depo-garantia-libre.component.css']
})
export class CategoriaDepositoGarantiaLibresComponent implements OnInit {
  public cbmCategoria: CategoriaRequestDTO[];
  @Input() public idMatrizDecision: number;
  @Input() public componentePropietarioIB: boolean;
  public parmCategoria: ParametroCategoria = new ParametroCategoria();

  // SELECCIONAR
  public lstCategoriaSelect: CategoriaRequestDTO[] = [];
  public checkBoxheader: boolean;
  public checkBoxElements: boolean[] = new Array<boolean>();

  @Output() public outObtenerMatriz = new EventEmitter();
  public lstMatriz: MatrizDepoGarantiaPLibres[] = [];
  public parametrosDetalle: BuscarDetalle = new BuscarDetalle();

  constructor(private servicio: DepositoGarantiaPLibresService) {
  }
  ngOnInit() {
    this.parmCategoria.idRegion = 9;
    this.parmCategoria.idComponente = 2;
    this.getCgCategoria();
    this.pushCkeck();
  }
  siguiente() {
    console.log('INICIA SELECCION DE CATEGORIA');
    console.log('INICIA EL EVENTO PARA OBTENER LA MATRIZ DE REGLAS');
    this.parametrosDetalle.idMatrizDecision = this.idMatrizDecision;
    // REALIZA LA PETICION AL SERVICIO PARA OBTENER EL DETALLE DE LA REGLA
    this.servicio.getMatrizDepoGarantiaPLibres(this.parametrosDetalle).subscribe(
      (data) => {
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
    this.lstCategoriaSelect = [];
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      this.checkBoxElements[i] = false;
    }
  }
  boxCheckAll() {
    console.log('INICIA EL EVENTO BOXCHECKALL');
    if (this.checkBoxheader) {
      for (let i = 0; i < this.cbmCategoria.length; i++) {
        this.checkBoxElements[i] = this.checkBoxheader;
        this.lstCategoriaSelect.push(this.cbmCategoria[i]);
        console.log('id categoria ' + this.lstCategoriaSelect.length);
      }
    } else {
      this.pushCkeck();
      console.log('id categoria ' + this.lstCategoriaSelect.length);
    }
  }
  // AGREGA A LA LISTA LOS REGISTROS EL REGISTRO SELECCIONADO
  ItemSeleccionado(result: CategoriaRequestDTO, index: number) {
    console.log(result.idCategoria);
    console.log(index);
    if (this.lstCategoriaSelect.length > 0) {
      for (let i = 0; i < this.lstCategoriaSelect.length; i++) {
        if (this.lstCategoriaSelect[i].idCategoria === result.idCategoria ) {
          this.borraIndexTabla(i);
          console.log('BORRAR DE LA LISTA' + result.idCategoria);
        } else {
          this.lstCategoriaSelect.push(result);
          console.log('CATEGORIA UNICA' + this.lstCategoriaSelect.length);
        }
      }
    } else {
      this.lstCategoriaSelect.push(result);
      console.log('CATEGORIA UNICA' + this.lstCategoriaSelect.length);
    }
  }
    // ELIMINA EL REGISTRO POR EL INDEX DE LA TABLA
    borraIndexTabla (index: number) {
      this.lstCategoriaSelect.splice(index, 1);
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
  getCgCategoria() {
    this.servicio.getCategoria(this.parmCategoria).subscribe(res => this.cbmCategoria = res);
  }
}
