import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriaRequestDTO } from '../../../../dto/getCategoriaRequestDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { AdminPlanesLibresService } from '../admin-planes-libres.service';
import { ParametroCategoria } from '../../../../modelo/parametroCategoria';
import { BuscarDetalle } from '../../../../modelo/buscarDetalle';
import { Constants } from '../../../../utiles/constants';
import { ComponenteDTO } from '../../../../dto/ComponenteDTO';
import { MatrizAdmPlanLibres } from '../../../../modelo/MatrizAdmPlanLibres';

@Component({
  selector: 'app-categoria-planes-libres',
  templateUrl: './categoria-planes-libres.component.html',
  styleUrls: ['./categoria-planes-libres.component.css']
})
export class CategoriaPlanesLibresComponent implements OnInit {
  @Input() public idMatrizDecision: number;
  @Input() public componentePropietarioIB: boolean;
  @Output() public outObtenerMatriz = new EventEmitter();
  public componente: ComponenteDTO = new ComponenteDTO();
  public cbmCategoria: CategoriaRequestDTO[] = [];
  // public selectValue: number[];
  // public check: any = true;
  public habilitaBtn: any = true;
  //public idCategoriaSelect: number[] = [];
  public parmCategoria: ParametroCategoria = new ParametroCategoria();
  public tableHeaderCheckbox: boolean;
  // SELECCIONAR
  public itemsSeleccionado: CategoriaRequestDTO[] = [];
  public checkBoxheader: boolean;
  //public checkBoxElements: boolean[] = new Array<boolean>();
  public lstMatriz: MatrizAdmPlanLibres[] = [];
  public parametrosDetalle: BuscarDetalle = new BuscarDetalle();

  constructor(private servicio: AdminPlanesLibresService) {
    this.parmCategoria.idRegion = 9;
    this.componente.nombre = Constants.CLAVECOMPONENTE;
    this.getComponenteByCVE();
  }

  ngOnInit() {
    this.getCgCategoria();
    this.pushCkeck();
  }

  getCgCategoria() {
    this.parmCategoria.idComponente = this.componente.idComponente;
    this.servicio.getCategoria(this.parmCategoria).subscribe(res => this.cbmCategoria = res);
  }

  getComponenteByCVE() {
    this.servicio.getComponente(this.componente.nombre, this.parmCategoria.idRegion).subscribe(res => {
      this.componente = res;
      this.getCgCategoria();
    });
  }

  pushCkeck() {
    this.checkBoxheader = false;
    this.cbmCategoria.forEach(element => {
      element.seleccionado = false;
    });
  }

  boxCheckAll() {
    console.log('INICIA EL EVENTO BOXCHECKALL');
    for (let i = 0; i < this.cbmCategoria.length; i++) {
      this.cbmCategoria[i].seleccionado = this.checkBoxheader;
    }
  }


  limpiarForm() {
    console.log('INICIA LIMPIAR FORM');
    this.pushCkeck();

  }

  ItemSeleccionado(result: CategoriaRequestDTO, index: number) {
    if (result.seleccionado) {
      result.seleccionado = false;
    } else {
      result.seleccionado = false;
    }
  }

  validarDatosSeleccionados() {
    let vacio = true;
    this.cbmCategoria.forEach(element => {
      if (element.seleccionado) {
        vacio = false;
      }
    });
    return !vacio;
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
    this.servicio.getMatrizAdmPlanLibres(this.parametrosDetalle).subscribe(
      (data) => {
        // SE ASINA EL VALOR DEVUELTO POR EL SERVICO A LA LISTA DE DETALLE 
        this.lstMatriz = data;
        if (this.lstMatriz.length > 0) {
          if (this.lstMatriz[0].estatus === 'VACIO') {
            this.lstMatriz = [];
          }
        }
        // VALIDA SI LA RESPUESTA ES VACIA
        if (this.lstMatriz.length <= 0) {
          this.lstMatriz = [];
          // this.cargarDatosTabla();
          // this.alertService.info(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO, null);
        }
      });
  }

}
