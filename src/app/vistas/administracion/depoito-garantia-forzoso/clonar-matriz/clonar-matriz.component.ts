import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AdmonPForzosoVo } from '../../../../modelo/admonPForzosoVO.model';
import { CgEstatusRegistro } from '../../../../modelo/cgEstatusRegistro.model';
import { TgMatriz } from '../../../../modelo/TgMatriz.model';
import { DepoGarantiaService } from '../depo-garantia-forzoso.service';

@Component({
  selector: 'app-clonar-matriz',
  templateUrl: './clonar-matriz.component.html',
  styleUrls: ['./clonar-matriz.component.css']
})
export class ClonarMatrizComponent implements OnInit {
  @Output() public eventLstMatriz = new EventEmitter<TgMatriz[]>();
  @Input()  public planForzosoVo: AdmonPForzosoVo;
  @Input() public estatus: CgEstatusRegistro;
  @Input() public lstEstatus: CgEstatusRegistro [];
  @Input() public matrizVo: TgMatriz;
  public lstTgMatriz: TgMatriz [];

  constructor(private servicio: DepoGarantiaService) {

   }

  ngOnInit() {
  }

  fn_clonarMatriz() {

    this.planForzosoVo.matrizVo = this.matrizVo;
    this.planForzosoVo.matrizVo.usuarioCreacion = 'SYSTEM';
    /* this.holaa.emit(this.planForzosoVo); */

    this.servicio.clonarMatrizPF(this.planForzosoVo).subscribe(res => {this.lstTgMatriz = res;
     this.eventLstMatriz.emit(this.lstTgMatriz);
     } );
    }
}
