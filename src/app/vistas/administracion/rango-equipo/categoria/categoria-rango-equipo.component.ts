import { Component, OnInit, Input, Output } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CategoriaRequestDTO} from '../../../../dto/getCategoriaRequestDTO';
import { RangoEquipoService} from '../rango-equipo.service';
import { MatrizRangoEquipoResponseDTO } from '../../../../dto/matrizRangoEquipoResponseDTO';
import { DetalleRango} from '../../../../dto/getMatrizRangoEquipo';
import { ClaseCreditoRequestDTO} from '../../../../dto/getClaseCreditoRequestDTO';
import { EstatusRequestDTO} from '../../../../dto/getEstatusRequestDTO';

@Component({
  selector: 'app-categoria-rango-equipo',
  templateUrl: './categoria-rango-equipo.component.html',
  styleUrls: ['./categoria-rango-equipo.component.css'],
  providers: [RangoEquipoService]
})
export class CategoriaRangoEquipoComponent implements OnInit {
  public cbmCategoria: CategoriaRequestDTO [];
  private form: FormGroup;
  @Input() response: MatrizRangoEquipoResponseDTO;
  @Input() idRegion: number;
  idSeleccionado: number;
  idCategoriaSelect: number;
  public checkBoxheader: boolean;
  public checkBoxElements: boolean [] = new Array<boolean>();
  public isOneChecked: boolean;
  public lstDetalle: DetalleRango [];
  @Input() cbmClasecredito: ClaseCreditoRequestDTO [];
  @Input() cbmEstatus: EstatusRequestDTO[];
  constructor(private fb: FormBuilder,
              private servicio: RangoEquipoService) {
    this.form = fb.group({
      'nombreRegla': ['', Validators.compose([])]
    });
    this.idCategoriaSelect = 170;
  }

  ngOnInit() {
    this.getCgCategoria();
    this.isOneChecked = false;
    this.response = new MatrizRangoEquipoResponseDTO();
  }

  boxCheckAll() {
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      this.checkBoxElements[i] = this.checkBoxheader;
    }
  }

  updateChecked() {
    this.isOneChecked = false;
    revision:
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      if (this.checkBoxElements[i]) {
        this.isOneChecked = true;
        break revision;
      }
    }
  }

  guardar() {
    console.log('INICIA SELECCION DE CATEGORIA');
    // console.log(this.selectValue);
    // this.idCategoriaSelect = this.selectValue;
    // this.idMatrizSeleccionado = this.idMatrizDecision;
  }

  limpiarForm = () => {
    this.checkBoxheader = false;
    this.isOneChecked = false;
    this.boxCheckAll();
  }

  getCgCategoria() {
    this.servicio.getCategoria(this.idCategoriaSelect + 'x' + this.idRegion).subscribe(res => {
      this.cbmCategoria = res;
      for (let i = 0; i < this.cbmCategoria.length; i++) {
        // const stat = this.response[i].estatusMatriz;
        // this.response[i].estatusMatriz = this.estatusConvert(stat);
        this.checkBoxElements.push(false);
      }
    });
  }

  verDetalle() {
    this.idSeleccionado = this.response.idMatrizDecision;
    console.log(this.idSeleccionado);
    this.servicio.getRangoDetalle({id: this.idSeleccionado}).subscribe(res => this.lstDetalle = res);
  }
}
