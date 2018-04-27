import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { AdmPlanesLibresMatrizDTO } from '../../../../dto/AdmPlanesLibresMatrizDTO';
import { AlertService } from '../../../../servicios/alert.service';
import { AdminPlanesLibresService } from '../admin-planes-libres.service';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';

@Component({
  selector: 'app-actualiza-regla',
  templateUrl: './actualiza-regla.component.html',
  styleUrls: ['./actualiza-regla.component.css']
})
export class ActualizaReglaComponent implements OnInit {

  @Input() public idRegion: number;
  @Input() public nombreRegla: any;
  @Input() public estatusClave: string;
  @Input() public idSeleccionado: number;
  @Output() public outActualizarRegla = new EventEmitter();

  public cbmEstatus: EstatusRequestDTO[];
  private isValidform: boolean;
  public datosActualiza: AdmPlanesLibresMatrizDTO = new AdmPlanesLibresMatrizDTO();

  constructor(public servicios: AdminPlanesLibresService,
    private alertService: AlertService) { 
    this.isValidform = true;
    this.clearMessage();
  }

  ngOnInit() {
    this.getCgEstatusregistro();
  }

  actualizar() {
    this.clearMessage();
    this.validaDatos();
    console.log('INICIA LA FUNCION PARA ACTUALIZAR LA REGLA');
    console.log(this.isValidform);
    if (this.isValidform === true) {
      this.datosActualiza.nombreMatriz = this.nombreRegla;
      this.datosActualiza.idRegion = this.idRegion;
      this.datosActualiza.usuarioModificacion = 'EVERIS';
      this.datosActualiza.estatusMatriz = this.estatusClave;
      this.datosActualiza.estatus = this.estatusClave;
      for (let i = 0; i < this.cbmEstatus.length; i++) {
        if (this.estatusClave == this.cbmEstatus[i].clave) {
          this.datosActualiza.descripcionEstatusMat = this.cbmEstatus[i].descripcion;
          break;
          }
      }
      this.datosActualiza.idMatrizDecision = this.idSeleccionado;
      this.outActualizarRegla.emit({datos: this.datosActualiza});
       }
  }


  /*FUNCION QUE SE ENCARGA DE VALIDAR LOS PARAMETROS DE CAPTURA DE LA REGLA */
  validaDatos() {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE CAPTURA DE LA REGLA');
    if (this.nombreRegla === null && this.estatusClave === '-1') {
      this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_ESTATUS_VACIA, '' , '');
    } else {
      if (this.nombreRegla === null || this.nombreRegla === undefined || this.nombreRegla === '') {
        this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_REGLA_VACIA_ACTUALIZAR,  '' , '');
      } else {
        if (this.nombreRegla.length <= 4) {
          this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_TAMANIO,  '' , '');
        }
      }
      if (this.estatusClave === '-1') {
        this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_ESTATUS_VACIO_ACTUALIZAR,  '' , '');
      }
    }
  }

evitaEspeciales(evt): void {
  const regEx = /^([a-z0-9A-Z ])$/;
  if (!regEx.test(evt.key)) {
    evt.preventDefault();
  }
}

limpiarForm() {
  this.nombreRegla = undefined;
  this.estatusClave = '-1';
  this.clearMessage();
}

getCgEstatusregistro() {
  this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
}

clearMessage = () => {
  this.alertService.clearMessage();
}
}
