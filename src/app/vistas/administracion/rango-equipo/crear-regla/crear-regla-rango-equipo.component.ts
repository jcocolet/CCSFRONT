import { ConstantesMsg } from './../../../../../assets/constantesMsg';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { RangoEquipoService } from '../rango-equipo.service';
import { DatosCreacionRegla } from '../../../../dto/getDatosCreacionRegla';
import { AlertService } from '../../../../servicios/alert.service';
import { RangoEqInsertaResponseDTO } from '../../../../dto/rangoEqInsertaResponseDTO';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-crear-regla-rango-equipo',
  templateUrl: './crear-regla-rango-equipo.component.html',
  styleUrls: ['./crear-regla-rango-equipo.component.css'],
  providers: [RangoEquipoService]
})
export class CrearReglaRangoEquipoComponent implements OnInit {
  @Input() public idRegion: number;
  @Output() public eventOut = new EventEmitter();
  public datos: DatosCreacionRegla = new DatosCreacionRegla();
  public cbmEstatus: EstatusRequestDTO[];
  private isValidform: boolean;

  constructor(private servicios: RangoEquipoService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.getCgEstatusregistro();
    this.isValidform = true;
  }
  guardar() {
    this.clearMessage();
    this.validaDatos();
    if (this.isValidform === true) {
      this.datos.nombreMatriz = this.datos.nombreMatriz.toUpperCase();
      this.datos.idRegion = this.idRegion;
      /*this.datos.fechaCreacion = ('0' + new Date().getDate()).slice(-2) + '-';
      this.datos.fechaCreacion += ('0' + (new Date().getMonth() + 1)).slice(-2) + '-';
      this.datos.fechaCreacion += new Date().getFullYear();*/
      this.datos.usuarioCreacion = 'USER';
      this.datos.tipoAccion = 'CREAR';
      this.datos.idComponente = '170';
      console.log('Inicial el metodo de guardar por el ' +
        '\nNombre: ' + this.datos.nombreMatriz +
        '\nRegion: ' + this.datos.idRegion +
        '\nEstatus: ' + this.datos.estatus +
        '\nFechaCreacion: ' + this.datos.fechaCreacion +
        '\nUsuarioCreacion: ' + this.datos.usuarioCreacion
      );
      this.eventOut.emit({datos: this.datos});
      // if (this.datos.idMatrizDecision > 0) {
      //    console.log(this.datos);
      // }
      // } else {
      //   console.log(this.responseCrear.responseEstatus + ' ' + this.responseCrear.responseMensaje);
      //   this.alertService.error(this.responseCrear.responseEstatus + ' ' + this.responseCrear.responseMensaje);
      // }
    }
  }
  /*FUNCION QUE SE ENCARGA DE VALIDAR LOS PARAMETROS DE CAPTURA DE LA REGLA */
  validaDatos() {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE CAPTURA DE LA REGLA');
    if (this.datos.nombreMatriz === undefined && this.datos.estatus === '-1') {
      this.isValidform = false;
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_ESTATUS_VACIA, null , '');
    } else {
      if (this.datos.nombreMatriz === undefined) {
        this.isValidform = false;
        this.alertService.info(ConstantesMsg.ERROR_NOMBRE_REGLA_VACIA, null, '');
      }
      if (this.datos.estatus === '-1') {
        this.isValidform = false;
        this.alertService.info(ConstantesMsg.ERROR_ESTATUS_VACIO, null, '');
      }
    }
  }
  limpiarForm() {
    this.datos.nombreMatriz = undefined;
    this.datos.estatus = '-1';
    this.clearMessage();
  }
    /*FUNCION QUE SE ENCARGA DE QUITAR EL MENSAJE DE ALERTA
  */
  clearMessage = () => {
    this.alertService.clearMessage();
  }
  limpiarCampos = () => {
    this.datos.nombreMatriz = '';
    this.datos.estatus = '';
  }

  getCgEstatusregistro() {
    this.servicios.getEstatusRegistro().subscribe(res => this.cbmEstatus = res);
  }
  closeModal() {
    console.log('EVENTO CERRAR MODAL');
  }

}
