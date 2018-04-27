import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { TgMatriz } from '../../../../modelo/TgMatriz.model';
import { AdmonPForzosoVo } from '../../../../modelo/admonPForzosoVO.model';
import { DepoGarantiaService } from '../depo-garantia-forzoso.service';

@Component({
  selector: 'app-eliminar-matriz',
  templateUrl: './eliminar-matriz.component.html',
  styleUrls: ['./eliminar-matriz.component.css']
})
export class EliminarMatrizComponent implements OnInit {
  @Output() public eventOut = new EventEmitter();
  @Output() public eventLstMatriz = new EventEmitter<TgMatriz[]>();
  @Input() public msnDelete: String;
  @Input() public lstTgMatriz: TgMatriz [];
  @Input() public planForzosoVo: AdmonPForzosoVo;


  constructor(private servicio: DepoGarantiaService) {
        this.lstTgMatriz = new Array();
        this.planForzosoVo = new AdmonPForzosoVo;
  }


  ngOnInit() {
  }

  eliminar() {
    this.eventOut.emit();
    if (ConstantesMsg.INFO_ELIMINAR_ALL === this.msnDelete) {
      this.planForzosoVo.lstmatrizVo = this.lstTgMatriz;
      console.log(this.planForzosoVo);
      this.servicio.bajaMatrizAll(this.planForzosoVo).subscribe(res => {this.lstTgMatriz = res;
        this.eventLstMatriz.emit(this.lstTgMatriz);
        } );
     }
  }

}
