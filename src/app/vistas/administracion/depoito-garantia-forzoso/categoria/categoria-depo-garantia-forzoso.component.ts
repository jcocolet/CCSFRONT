import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasVO } from '../../../../modelo/CsCategoria.model';
import { AlertService } from '../../../../servicios/alert.service';
import { DepoGarantiaService } from '../depo-garantia-forzoso.service';
import { DetallePForzosoVO } from '../../../../modelo/DetallesPForzosoVO.model';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';

@Component({
  selector: 'app-categoria-planes-forzoso',
  templateUrl: './categoria-depo-garantia-forzoso.component.html',
  styleUrls: ['./categoria-depo-garantia-forzoso.component.css'],
  providers: [DepoGarantiaService]
})
export class CategoriaDepositoGarantiaForzosoComponent implements OnInit {

  public lstCategoria: Array<CategoriasVO>;
  public categoria: CategoriasVO;
  public checkBoxheader: boolean;
  @Input() public activaBtn: boolean;
  @Input() public detallePforzosoVo: DetallePForzosoVO;
  @Input() public idRegion: number;


  constructor(private servicio: DepoGarantiaService, private alertService: AlertService) {
    this.detallePforzosoVo = new DetallePForzosoVO;
    this.detallePforzosoVo.lstCategoriaVo = new Array;
    this.categoria = new CategoriasVO();
    this.checkBoxheader = false;
    this.activaBtn = true;
    this.lstCategoria = new Array<CategoriasVO>();
    this.lstCategoria = this.detallePforzosoVo.lstCategoriaVo;
  }

  ngOnInit() {
    this.fn_checkbox();
    this.checkBoxheader = false;
  }

  fn_checkbox() {
    for (let i = 0; i < this.detallePforzosoVo.lstCategoriaVo.length; i++) {
       if (this.detallePforzosoVo.lstCategoriaVo[i].seleccion) {
          this.activaBtn = false;
          break;
       } else {
          this.activaBtn = true;
       }
  }
}

 /*SELECCIONA O DESMARCA LOS REGISTROS A MODIFICAR*/
 fn_selectAll(evento) {
  if (this.checkBoxheader) {
    for (let i = 0; i < this.detallePforzosoVo.lstCategoriaVo.length; i++) {
      this.detallePforzosoVo.lstCategoriaVo[i].seleccion = false;
    }
  } else {
    for (let i = 0; i < this.detallePforzosoVo.lstCategoriaVo.length; i++) {
      this.detallePforzosoVo.lstCategoriaVo[i].seleccion = true;
    }
  }
}
}
