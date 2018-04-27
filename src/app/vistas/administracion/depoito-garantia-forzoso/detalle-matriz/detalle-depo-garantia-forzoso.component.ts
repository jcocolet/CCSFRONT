import { Component, OnInit, Input } from '@angular/core';
import { AdmonPForzosoVo } from '../../../../modelo/admonPForzosoVO.model';
import { PForzosoVo } from '../../../../modelo/PlanForzosoVO.model';

@Component({
  selector: 'app-detalle-depo-garantia-forzoso',
  templateUrl: './detalle-depo-garantia-forzoso.component.html',
  styleUrls: ['./detalle-depo-garantia-forzoso.component.css']
})
export class DetalleDepositoGarantiaForzosoComponent implements OnInit {
  @Input() public planForzosoVo: AdmonPForzosoVo;
  @Input() public lstReqAdmonPF: PForzosoVo [];


  constructor() {
  }

  ngOnInit() {
  }


}
