import { ConstantesMsg } from './../../../../../assets/constantesMsg';
import { Component, OnInit, Input } from '@angular/core';
import { RangoEquipoService} from '../rango-equipo.service';
import { AlertService } from '../../../../servicios/alert.service';
import { MatrizRangoEquipoResponseDTO } from '../../../../dto/matrizRangoEquipoResponseDTO';
import { DetalleRango} from '../../../../dto/getMatrizRangoEquipo';
import { ClaseCreditoRequestDTO} from '../../../../dto/getClaseCreditoRequestDTO';
import { EstatusRequestDTO} from '../../../../dto/getEstatusRequestDTO';
import { AccionClave} from '../../../../dto/accionClave';
import { RangoEquipoModule } from '../rango-equipo.module';
import { AccionRespuestaRequestDTO } from '../../../../dto/getAccionRespuestaRequestDTO';

@Component({
  selector: 'app-crear-matriz-rango-equipo',
  templateUrl: './crear-matriz-rango-equipo.component.html',
  styleUrls: ['./crear-matriz-rango-equipo.component.css'],
  providers: [RangoEquipoService]
})
export class CrearMatrizRangoEquipoComponent implements OnInit {
  public cmbAccionRespuesta: AccionRespuestaRequestDTO[];
  @Input() response: MatrizRangoEquipoResponseDTO;
  @Input() idCategoria: number;
  @Input() lstDetalle: DetalleRango [];
  @Input() cbmClasecredito: ClaseCreditoRequestDTO [];
  @Input() cbmEstatus: EstatusRequestDTO[];
  isEditing: boolean;
  cbmAccion: AccionClave[];
  form: DetalleRango = new DetalleRango;

  constructor(private servicio: RangoEquipoService,
              private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.cbmAccion = new Array<AccionClave>();
    this.response = new MatrizRangoEquipoResponseDTO();
    this.limpiar();
    this.getAcciones();
    this.getCgAccionRespuesta();
  }

  agregarTabla() {
    if (this.validar()) {
      for (let i = 0; i < this.cbmClasecredito.length; i++) {
        if (this.form.idClaseCredito == this.cbmClasecredito[i].idClaseCredito) {
          this.form.nombreClaseCredito = this.cbmClasecredito[i].descripcion;
          this.form.idMatriz = this.response.idMatrizDecision;
          break;
        }
      }
      this.lstDetalle.push(Object.assign({}, this.form));
      this.limpiar();
    //  this.alertService.success('SE HA AGREGADO CORRECTAMENTE EL REGISTRO.', null);
    }
  }

  clearMessage() {
    this.alertService.clearMessage();
  }

  validar() {
    if (
     this.form.idAccSiCumpleRango !== 0 &&
     this.form.msjSiCumpleRango !== '' &&
     this.form.idAccNoCumpleRango !== 0 &&
     this.form.msjNoCumpleRango !== '' &&
     this.form.preciominimo !== '' &&
     this.form.precioKitMinimo !== '' &&
     this.form.precioTotalMinimo !== '' &&
     this.form.preciomaximo !== '' &&
     this.form.precioKitMaximo !== '' &&
     this.form.precioTotalMaximo !== '' &&
     this.form.idClaseCredito !== 0 &&
     this.form.idAccion !== 0 &&
     this.form.claveEstatus !== ''
    ) {
      this.alertService.clearMessage();
      return true;
    } else {
      this.alertService.error(ConstantesMsg.ERROR_CAMPOS_VACIOS_MATRIZ, null, '');
      return false;
    }
  }

  eliminar(index) {
    const elementosAEliminar: Array<DetalleRango> = [];
    elementosAEliminar.push(this.lstDetalle[index]);
    this.servicio.eliminarRangoEquipo(elementosAEliminar).subscribe(res => {
      this.lstDetalle.splice(index, 1);
      this.alertService.success(ConstantesMsg.SUCCESS_ELIMINA_REGLA, null, '');
    });
  }

  clonar(selected: DetalleRango) {
    const last = this.lstDetalle.length;
    this.lstDetalle.push(Object.assign({}, selected));
    this.lstDetalle[last].idAdmonRango = 0;
    this.form = this.lstDetalle[last];
  }

  editar(selected: DetalleRango) {
    this.isEditing = true;
    console.log('ID CLASE CREDITO' + selected.idClaseCredito);

    this.form = selected;
  }

  terminarEdicion() {
    if (this.validar()) {
      this.isEditing = false;
      this.form = new DetalleRango;
      this.limpiar();
     // this.alertService.success('SE HA EDITADO CORRECTAMENTE EL REGISTRO.', null);
    }
  }


  guardar() {
    console.log(this.lstDetalle);
    for (let i = 0; i < this.lstDetalle.length; i++) {
      this.form.idMatriz = this.response.idMatrizDecision;
    }
    this.servicio.crearMatriz(this.lstDetalle).subscribe(res => {
      this.alertService.success(ConstantesMsg.SUCCESS_CREACION_MATRIZ, '', '');
    });
  }

  limpiar() {
    this.clearMessage();
    this.form.nombreAccion = '';
    this.form.nombreClaseCredito = '';
    this.form.fechaCreacion = '';
    this.form.fechaModificacion = '';
    this.form.preciominimo = '';
    this.form.preciomaximo = '';

    this.form.idMatriz = this.response.idMatrizDecision;
    this.form.idAccion = 0;
    this.form.idAccNoCumpleRango = 0;
    this.form.msjNoCumpleRango = '';
    this.form.idMsjNoCumpleRango = 0;
    this.form.idAccSiCumpleRango = 0;
    this.form.msjSiCumpleRango = '';
    this.form.idMsjSiCumpleRango = 0;
    this.form.precioKitMinimo = '';
    this.form.precioKitMaximo = '';
    this.form.precioTotalMinimo = '';
    this.form.precioTotalMaximo = '';
    this.form.nombreClaseCredito = '';
    this.form.idClaseCredito = 0;
    this.form.claveEstatus = '';
  }

  getAcciones() {
    this.servicio.getAccionClave(9).subscribe(res => {
      this.cbmAccion = res;
    });
  }
  getCgAccionRespuesta() {
    this.servicio.getAccionRespuesta(9).subscribe(res => this.cmbAccionRespuesta = res);
  }

  evitaEspeciales(evt): void {
    const regEx = /^([a-z0-9A-Z ])$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }

  evitaCharacteres(evt): void {
    const regEx = /^([0-9.,])$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }

  numberMaximoFormat(evt) {
    if (evt !== undefined) {
      const numero = evt.split('.');
      if (numero[0].length !== 0) {
        if (numero[1] !== undefined) {
          if (numero[1].length === 1) {
            numero[1] = numero[1] + '0';
          } else if (numero[1].length === 0) {
            numero[1] = '00';
          } else {
              numero[1] = numero[1].slice(0, 2);
          }
        } else {
          if (numero[1] === undefined) {
            numero.push('00');
          }
        }
        this.form.preciomaximo = numero[0] + '.' + numero[1];
      }
    }
  }
  numberKitMaximoFormat(evt) {
    if (evt !== undefined) {
      const numero = evt.split('.');
      if (numero[0].length !== 0) {
        if (numero[1] !== undefined) {
          if (numero[1].length === 1) {
            numero[1] = numero[1] + '0';
          } else if (numero[1].length === 0) {
            numero[1] = '00';
          } else {
              numero[1] = numero[1].slice(0, 2);
          }
        } else {
          if (numero[1] === undefined) {
            numero.push('00');
          }
        }
        this.form.precioKitMaximo = numero[0] + '.' + numero[1];
      }
    }
  }
  numberEqMaximoFormat(evt) {
    if (evt !== undefined) {
      const numero = evt.split('.');
      if (numero[0].length !== 0) {
        if (numero[1] !== undefined) {
          if (numero[1].length === 1) {
            numero[1] = numero[1] + '0';
          } else if (numero[1].length === 0) {
            numero[1] = '00';
          } else {
              numero[1] = numero[1].slice(0, 2);
          }
        } else {
          if (numero[1] === undefined) {
            numero.push('00');
          }
        }
        this.form.precioTotalMaximo = numero[0] + '.' + numero[1];
      }
    }
  }
  numberMinimoFormat(evt) {
    if (evt !== undefined) {
      const numero = evt.split('.');
      if (numero[0].length !== 0) {
        if (numero[1] !== undefined) {
          if (numero[1].length === 1) {
            numero[1] = numero[1] + '0';
          } else if (numero[1].length === 0) {
            numero[1] = '00';
          } else {
              numero[1] = numero[1].slice(0, 2);
          }
        } else {
          if (numero[1] === undefined) {
            numero.push('00');
          }
        }
        this.form.preciominimo = numero[0] + '.' + numero[1];
      }
    }
  }
  numberKitMinimoFormat(evt) {
    if (evt !== undefined) {
      const numero = evt.split('.');
      if (numero[0].length !== 0) {
        if (numero[1] !== undefined) {
          if (numero[1].length === 1) {
            numero[1] = numero[1] + '0';
          } else if (numero[1].length === 0) {
            numero[1] = '00';
          } else {
              numero[1] = numero[1].slice(0, 2);
          }
        } else {
          if (numero[1] === undefined) {
            numero.push('00');
          }
        }
        this.form.precioKitMinimo = numero[0] + '.' + numero[1];
      }
    }
  }
  numberEqMinimoFormat(evt) {
    if (evt !== undefined) {
      const numero = evt.split('.');
      if (numero[0].length !== 0) {
        if (numero[1] !== undefined) {
          if (numero[1].length === 1) {
            numero[1] = numero[1] + '0';
          } else if (numero[1].length === 0) {
            numero[1] = '00';
          } else {
              numero[1] = numero[1].slice(0, 2);
          }
        } else {
          if (numero[1] === undefined) {
            numero.push('00');
          }
        }
        this.form.precioTotalMinimo = numero[0] + '.' + numero[1];
      }
    }
  }
}
