import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdmonPForzosoVo } from '../../../../modelo/admonPForzosoVO.model';
import { DepoGarantiaService } from '../depo-garantia-forzoso.service';
import { TgMatriz } from '../../../../modelo/TgMatriz.model';

@Component({
  selector: 'app-crear-matriz-depo-garantia-forzoso',
  templateUrl: './crear-matriz-depo-garantia-forzoso.component.html',
  styleUrls: ['./crear-matriz-depo-garantia-forzoso.component.css']
})

export class CrearMatrizDepositoGarantiaForzosoComponent implements OnInit {
    public planForzosoVo: AdmonPForzosoVo;
    public lstTgMatriz: TgMatriz [];
    public matrizVO: TgMatriz;
    @Input() public idRegion: number;
    @Output() public eventLstMatriz = new EventEmitter<TgMatriz[]>();

    constructor(private servicio: DepoGarantiaService) {
      this.planForzosoVo = new AdmonPForzosoVo();
      this.matrizVO = new TgMatriz;
      this.lstTgMatriz = new Array;
    }

    ngOnInit() {
      this.fn_Limpiar();
    }

  fn_agregarMatriz() {

      this.planForzosoVo.idRegion = this.idRegion + '';
      this.planForzosoVo.matrizVo = new TgMatriz();
      this.planForzosoVo.matrizVo.usuarioCreacion = 'SYSTEM';

/* this.holaa.emit(this.planForzosoVo); */
    if (this.planForzosoVo.nomRegla === null || this.planForzosoVo.nomRegla.trim() === '') {
        this.matrizVO.idMatrizDecision = -1;
        this.lstTgMatriz.push(this.matrizVO);
        this.eventLstMatriz.emit(this.lstTgMatriz);
    } else {
        this.servicio.agregaMatrizPF(this.planForzosoVo).subscribe(res => {this.lstTgMatriz = res;
        this.eventLstMatriz.emit(this.lstTgMatriz);
        } );
     }
      this.planForzosoVo = new TgMatriz;
   }
  fn_Limpiar() {
      this.planForzosoVo.nomRegla = '';
  }
}
