import { Component, OnInit, Input } from '@angular/core';
import { ConstantesMsg } from './../../../../../assets/constantesMsg';
import { AlertService } from '../../../../servicios/alert.service';
import { LineasAutorizadasRegla } from '../../../../dto/lineasAutorizadasRegla';
import { AdmonLineasXEdad } from '../../../../dto/admonLineasXEdad';
import { LineasAutorizadasService } from '../lineas-autorizadas.service';
import { CgAccionResp } from '../../../../modelo/cgAccionRes.model';
import { TipoRegla } from '../../../../dto/tipoRegla';
import { AdminLineasAutorizadasRequestDTO } from '../../../../dto/adminLineasAutorizadasRequestDTO';

@Component({
  selector: 'app-crear-matriz',
  templateUrl: './crear-matriz.component.html',
  styleUrls: ['./crear-matriz.component.css']
})
export class CrearMatrizComponent implements OnInit {
  lstMatrizRegla: TipoRegla[] = [];
  lstAcciones: CgAccionResp;
  @Input() lstMatriz: LineasAutorizadasRegla[] = [];
  formLineasAutorizadasRegla: LineasAutorizadasRegla = new LineasAutorizadasRegla();
  isEditingLineasAutorizadasRegla: boolean;

  lstLineasPorEdad: AdmonLineasXEdad[] = [];
  formLineasPorEdad: AdmonLineasXEdad = new AdmonLineasXEdad();

  constructor(private servicio: LineasAutorizadasService,
    private alertService: AlertService) {
    this.isEditingLineasAutorizadasRegla = false;
  }

  lstLineasAutorizadas: AdminLineasAutorizadasRequestDTO;
  ngOnInit() {
    this.limpiarLineasAutorizadasRegla();
    this.getAcciones();
  }

  clearMessage() {
    this.alertService.clearMessage();
  }

  getAcciones() {
    this.servicio
    .getAccionRespuesta(9)
    .subscribe(res => {
      this.lstAcciones = res;
    });
  }

  eliminarLineasAutorizadasRegla(num: number) {
    const elementosAEliminar: Array<LineasAutorizadasRegla> = [];
    elementosAEliminar.push(this.lstMatriz[num]);
    this.servicio
    .delMatrizLineasAutorizadas(elementosAEliminar)
    .subscribe(res => {
      this.lstMatriz.splice(num, 1);
      this.alertService.success(ConstantesMsg.SUCCESS_ELIMINA_REGLA, null, '');
    });
  }

  agregarLineasAutorizadasRegla() {
    if (this.isFormFiledLineasAutorizadasRegla()) {
      this.formLineasAutorizadasRegla.claveEstatus = 'A';
      this.lstMatriz.push(Object.assign({}, this.formLineasAutorizadasRegla));
      this.limpiarLineasAutorizadasRegla();
    } else {
      this.alertService.error(ConstantesMsg.ERROR_CAMPOS_VACIOS_MATRIZ, null, '');
    }
  }

  editarLineasAutorizadasRegla(elemento: LineasAutorizadasRegla) {
    this.isEditingLineasAutorizadasRegla = true;
    this.formLineasAutorizadasRegla = elemento;
  }

  actualizarLineasAutorizadasRegla() {
    this.isEditingLineasAutorizadasRegla = false;
    this.formLineasAutorizadasRegla = new LineasAutorizadasRegla();
  }

  limpiarLineasAutorizadasRegla() {
    this.formLineasAutorizadasRegla.idLineasAutoregla = 0;
    this.formLineasAutorizadasRegla.descripcion = '';
    this.formLineasAutorizadasRegla.pctLineasAct = null;
    this.formLineasAutorizadasRegla.operador = '';
    this.formLineasAutorizadasRegla.lineasAdicionales = null;

    this.formLineasAutorizadasRegla.claveEstatus = '';
    this.formLineasAutorizadasRegla.fechaCreacion = null;
    this.formLineasAutorizadasRegla.usuarioCreacion = '';
    this.formLineasAutorizadasRegla.fechaModificacion = null;
    this.formLineasAutorizadasRegla.usuarioModificacion = '';
  }

  guardarLineasAutorizadasRegla() {
    this.servicio
      .setMatrizLineasAutorizadas(this.lstMatriz)
      .subscribe(res => {
        this.lstMatriz = res;
        this.alertService.success(ConstantesMsg.SUCCESS_CREACION, null, '');
      });
  }

  isFormFiledLineasAutorizadasRegla() {
    if (
      this.formLineasAutorizadasRegla.descripcion === '' ||
      this.formLineasAutorizadasRegla.pctLineasAct === null ||
      this.formLineasAutorizadasRegla.operador === '' ||
      this.formLineasAutorizadasRegla.lineasAdicionales === null) {
        return false;
      }
    return true;
  }
}
