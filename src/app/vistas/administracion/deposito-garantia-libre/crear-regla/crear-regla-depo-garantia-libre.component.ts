import { Response } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EstatusRequestDTO} from '../../../../dto/getEstatusRequestDTO';
import { DepositoGarantiaPLibresService } from '../deposito-garantia-libre.service';
import { CrearReglaDTO } from '../../../../dto/crearReglaDTO';
import { CrearReglaResponseDTO } from '../../../../dto/CrearReglaResponseDTO';
import { RangoEqInsertaResponseDTO } from '../../../../dto/rangoEqInsertaResponseDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { DatosCreacionRegla } from '../../../../dto/getDatosCreacionRegla';
import { DepGarantiaPLibresDTO } from '../../../../dto/depGarantiaPLibresDTO';
import { GetMatrizDecisionDepoGarantiaPLibresDTO } from '../../../../dto/getMatrizDecisionDepoGarantiaPLibreDTO';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';


@Component({
  selector: 'app-crear-regla-depo-garantia-libre',
  templateUrl: './crear-regla-depo-garantia-libre.component.html',
  styleUrls: ['./crear-regla-depo-garantia-libre.component.css']
})
export class CrearReglaDepositoGarantiaLibresComponent implements OnInit {
  public cbmEstatus: EstatusRequestDTO[];
  private isValidform: boolean;
  public datos: DatosCreacionRegla = new DatosCreacionRegla();
  @Input() public idRegion: number;
  @Output() public outCrearRegla = new EventEmitter();
  public nombreRegla: any;
  public estatusClave: string;

  constructor(private servicios: DepositoGarantiaPLibresService,
  private alertService: AlertService) {
    this.isValidform = true;
    this.clearMessage();
  }

  ngOnInit() {
    this.getCgEstatusregistro();
    this.clearMessage();
    this.estatusClave = 'I';
  }
  guardar() {
    this.clearMessage();
    this.validaDatos();
    console.log('INICIA LA FUNCION PARA LA CAPTURA DE LA REGLA');
    console.log(this.isValidform);
    if (this.isValidform === true) {
      this.datos.nombreMatriz = this.nombreRegla.toUpperCase();
      this.datos.idRegion = this.idRegion;
      this.datos.estatus = this.estatusClave;
      this.datos.usuarioCreacion = 'EVERIS';
      console.log('Inicial el metodo de guardar por el ' +
        '\nNombre: ' + this.datos.nombreMatriz +
        '\nRegion: ' + this.datos.idRegion +
        '\nEstatus: ' + this.datos.estatus
      );
      this.outCrearRegla.emit({datos: this.datos});
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
