import { Response } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EstatusRequestDTO} from '../../../../dto/getEstatusRequestDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { DatosCreacionRegla } from '../../../../dto/getDatosCreacionRegla';
import { CrearReglaDTO } from '../../../../dto/crearReglaDTO';
import { CrearReglaResponseDTO } from '../../../../dto/CrearReglaResponseDTO';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';
import { AdminPlanesLibresService } from '../admin-planes-libres.service';

@Component({
  selector: 'app-crear-regla-planes-libres',
  templateUrl: './crear-regla-planes-libres.component.html',
  styleUrls: ['./crear-regla-planes-libres.component.css']
})
export class CrearReglaPlanesLibresComponent implements OnInit {
  public cbmEstatus: EstatusRequestDTO[];
  private isValidform: boolean;
  public datos: DatosCreacionRegla = new DatosCreacionRegla();
  @Output() public outCrearRegla = new EventEmitter();
  public nombreRegla: any;
  public estatusClave: string;

  constructor(public servicios: AdminPlanesLibresService,
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
    if (this.isValidform === true) {
      this.datos.nombreMatriz = this.nombreRegla.toUpperCase();
      this.datos.estatus = this.estatusClave;
      this.datos.usuarioCreacion = 'EVERIS';
      this.outCrearRegla.emit({datos: this.datos});
       }
  }


  validaDatos() {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE CAPTURA DE LA REGLA');
    console.log('nombre regla' + this.nombreRegla);
    console.log('estatus' + this.estatusClave);

    if (this.nombreRegla === null && this.estatusClave === '-3') {
      this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_ESTATUS_VACIA,  '' , '');
    } else {
      if (this.nombreRegla === null || this.nombreRegla === undefined || this.nombreRegla === '') {
        this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_REGLA_VACIA,  '' , '');
      } else {
        if (this.nombreRegla.length <= 4) {
          this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_TAMANIO,  '' , '');
        }
      }
      if (this.estatusClave === '-3') {
        this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_ESTATUS_VACIO,  '' , '');
      }
    }
  }
  getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }

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

}
