import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatosCreacionRegla } from '../../../../dto/getDatosCreacionRegla';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { DepositoGarantiaPLibresService } from '../../deposito-garantia-libre/deposito-garantia-libre.service';
import { AlertService } from '../../../../servicios/alert.service';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { LineasAutorizadasService } from '../lineas-autorizadas.service';

@Component({
  selector: 'app-actualizar-regla',
  templateUrl: './actualizar-regla.component.html',
  styleUrls: ['./actualizar-regla.component.css']
})
export class ActualizarReglaComponent implements OnInit {
  public cbmEstatus: EstatusRequestDTO[];
  private isValidform: boolean;
  @Input() public idRegion: number;
  @Output() public outActualizarRegla = new EventEmitter();
  @Input() public nombreRegla: any;
  @Input() public estatusClave: string;
  @Input() public idSeleccionado: number;

  public datosActualiza: DatosCreacionRegla = new DatosCreacionRegla();

  constructor(private servicios: LineasAutorizadasService,
    private alertService: AlertService) {
    this.isValidform = true;
    this.clearMessage();
  }

  ngOnInit() {
    this.getCgEstatusregistro();
    console.log('estatus clave: ' + this.estatusClave);
  }
  actualizar() {
    this.clearMessage();
    this.validaDatos();
    console.log('INICIA LA FUNCION PARA ACTUALIZAR LA REGLA');
    console.log(this.isValidform);
    if (this.isValidform === true) {
      this.datosActualiza.nombreMatriz = this.nombreRegla;
      this.datosActualiza.idRegion = this.idRegion;
      this.datosActualiza.estatus = this.estatusClave;
      this.datosActualiza.idMatrizDecision = this.idSeleccionado;

      this.outActualizarRegla.emit({ datos: this.datosActualiza });
    }
  }
  /*FUNCION QUE SE ENCARGA DE VALIDAR LOS PARAMETROS DE CAPTURA DE LA REGLA */
  validaDatos() {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE CAPTURA DE LA REGLA');
    console.log('nombre regla' + this.nombreRegla);
    console.log('estatus' + this.estatusClave);

    if (this.nombreRegla === null && this.estatusClave === '-3') {
      this.isValidform = false;
      this.alertService.error(ConstantesMsg.ERROR_NOMBRE_ESTATUS_VACIA, null,null);
    } else {
      if (this.nombreRegla === null || this.nombreRegla === undefined || this.nombreRegla === '') {
        this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_REGLA_VACIA, null,null);
      } else {
        if (this.nombreRegla.length <= 4) {
          this.isValidform = false;
          this.alertService.error(ConstantesMsg.ERROR_NOMBRE_TAMANIO, null,null);
        }
      }
      if (this.estatusClave === '-3') {
        this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_ESTATUS_VACIO, null,null);
      }
    }
  }
  // EVENTO QUE SE ENCARGA DE VALIDAR DATOS ESPECIALES
  evitaEspeciales(evt): void {
    const regEx = /^([a-z0-9A-Z ])$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }
  limpiarForm() {
    this.nombreRegla = undefined;
    this.estatusClave = '-3';
    this.clearMessage();
  }
  /*FUNCION QUE SE ENCARGA DE QUITAR EL MENSAJE DE ALERTA
*/
  clearMessage = () => {
    this.alertService.clearMessage();
  }
  getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }

}
