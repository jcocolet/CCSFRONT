import { Component, OnInit, Input } from '@angular/core';
import { RangoEquipoService } from '../rango-equipo.service';
import { AlertService } from '../../../../servicios/alert.service';
import { ClaseCreditoRequestDTO } from '../../../../dto/getClaseCreditoRequestDTO';
import { EstatusRequestDTO } from '../../../../dto/getEstatusRequestDTO';
import { MatrizRangoEquipoResponseDTO } from '../../../../dto/matrizRangoEquipoResponseDTO';
import { ParametrosRangoEquipo } from '../../../../modelo/parametrosRangoEquipo';
import { DetalleRango } from '../../../../dto/getMatrizRangoEquipo';
import { DatosCreacionRegla } from '../../../../dto/getDatosCreacionRegla';
import { ConstantesMsg } from '../../../../../assets/constantesMsg';

@Component({
  selector: 'app-admin-rango-equipo',
  templateUrl: './admin-rango-equipo.component.html',
  styleUrls: ['./admin-rango-equipo.component.css'],
  providers: [RangoEquipoService]
})
export class AdminRangoEquipoComponent implements OnInit {
  public cbmClasecredito: ClaseCreditoRequestDTO[];
  public cbmEstatus: EstatusRequestDTO[];
  public response: MatrizRangoEquipoResponseDTO[];
  public elementosAAlterar: MatrizRangoEquipoResponseDTO[] = new Array<MatrizRangoEquipoResponseDTO>();
  public selecResponse: MatrizRangoEquipoResponseDTO;
  public parametros: ParametrosRangoEquipo = new ParametrosRangoEquipo();
  private isValidform: boolean;
  private message: any;
  public showAlert: any;
  public checkBoxheader: boolean;
  public checkBoxElements: boolean[] = new Array<boolean>();
  public idRegion: number;
  public idSeleccionado: number;
  public lstDetalle: DetalleRango[];
  public datos: DatosCreacionRegla = new DatosCreacionRegla();
  public nombreRegla: string;
  public estatusSelect: string;
  public msjEliminar: string;
  public msjEliminarTitulo: string;

    // DEPURAR ELIMINAR
    public totalDepurarEliminar: number;
    public totalDepurar: number;
    public totalEliminar: number;

  constructor(
    private servicio: RangoEquipoService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.showAlert = true;
    this.response = [];
    this.checkBoxheader = false;
    this.idRegion = 9;
    this.parametros.idRegion = this.idRegion;
    (this.parametros.nombreRegla = ''),
      (this.parametros.clasecredito = ''),
      (this.parametros.estatus = ''),
      (this.parametros.maximo = ''),
      (this.parametros.minimo = '');
    this.getCgClaseCredito();
    this.getCgEstatusregistro();
  }
  boxCheckAll() {
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      this.checkBoxElements[i] = this.checkBoxheader;
    }
  }
  buscar = () => {
    if (this.validaDatos()) {
      this.checkBoxheader = false;
      this.checkBoxElements = [];
      this.servicio.getBusqueda(this.parametros).subscribe(res => {
        if (res && res.length > 0) {
          this.response = res;
          console.log(this.response);
          for (let i = 0; i < this.response.length; i++) {
            const stat = this.response[i].estatusMatriz;
            this.response[i].estatusMatriz = this.estatusConvert(stat);
            this.checkBoxElements.push(false);
          }
        } else {
          this.response = [];
          this.alertService.error(ConstantesMsg.INFO_BUSQUEDA_SIN_RESULTADO, null, '' );
        }
      });
    }
  }
  estatusConvert(searchVal) {
    for (let i = 0; i < this.cbmEstatus.length; i++) {
      const currentEst = this.cbmEstatus[i];
      if (currentEst.clave === searchVal) {
        return currentEst.descripcion;
      }
    }
  }
  validaDatos() {
    if (
      (this.parametros.nombreRegla != null &&
        this.parametros.nombreRegla !== '') ||
      (this.parametros.clasecredito != null &&
        this.parametros.clasecredito !== '') ||
      (this.parametros.estatus != null && this.parametros.estatus !== '') ||
      (this.parametros.minimo != null && this.parametros.minimo !== '') ||
      (this.parametros.maximo != null && this.parametros.maximo !== '')
    ) {
      return true;
    } else {
      this.response = [];
      this.alertService.error(ConstantesMsg.ERROR_PARAMETROS_VACIO, null, '');
      return false;
    }
  }
  clearMessage = () => {
    this.alertService.clearMessage();
  }
  limpiarCampos = () => {
    this.response = [];
    this.checkBoxheader = false;
    this.checkBoxElements = [];
    (this.parametros.nombreRegla = ''),
      (this.parametros.clasecredito = ''),
      (this.parametros.estatus = ''),
      (this.parametros.maximo = ''),
      (this.parametros.minimo = '');
    this.clearMessage();
  }
  getCgClaseCredito() {
    this.servicio
      .getClaseCredito(this.idRegion)
      .subscribe(res => (this.cbmClasecredito = res));
  }
  getCgEstatusregistro() {
    this.servicio
      .getEstatusRegistro()
      .subscribe(res => (this.cbmEstatus = res));
  }
  selecionarFila(selected: MatrizRangoEquipoResponseDTO) {
    this.selecResponse = selected;
  }
  verDetalle(result: MatrizRangoEquipoResponseDTO) {
    this.idSeleccionado = result.idMatrizDecision;
    this.nombreRegla = result.nombreMatriz;
    this.estatusSelect = result.estatusMatriz;
    console.log(this.idSeleccionado);
    this.servicio
      .getRangoDetalle({ id: this.idSeleccionado })
      .subscribe(res => {this.lstDetalle = res; });
  }
  returnEvent(event): void {
    this.datos = event.datos;
    this.servicio.crearRegla(this.datos).subscribe(datos => {
      this.datos = datos;
      const stat = this.datos.estatus;
      if (stat === 'NOMBRE EXISTENTE') {
        this.alertService.error(ConstantesMsg.ERROR_REGLA_EXISTE, null, '');
      } else if (stat === 'NOMBRE LARGO') {
        this.alertService.error(ConstantesMsg.ERROR_NOMBRE_TAMANIO, null, '');
      } else {
        this.datos.estatus = this.estatusConvert(stat);
        let exist = false;
        for (let i = 0; i < this.response.length; i++) {
          if (this.response[i].idMatrizDecision === this.datos.idMatrizDecision) {
            exist = true;
            this.response[i].nombreMatriz = this.datos.nombreMatriz;
            this.response[i].estatusMatriz = this.datos.estatus;
            this.alertService.success(ConstantesMsg.SUCCESS_ACTUALIZAR, '', '');
            return;
          }
        }
        this.checkBoxElements.push(false);
        this.response.push(
          new MatrizRangoEquipoResponseDTO(
            this.datos.idMatrizDecision,
            this.datos.nombreMatriz,
            this.datos.estatus
          )
        );
        this.alertService.success(ConstantesMsg.SUCCESS_CREACION_REGLA, '', '');
        // this.alertService.success('EL REGISTRO SE HA CLONADO EXITOSAMENTE.', null);
      }
    });
  }

  clonar(element: MatrizRangoEquipoResponseDTO) {
    this.datos.idMatrizDecision = element.idMatrizDecision;
    this.datos.nombreMatriz = element.nombreMatriz.toUpperCase();
    this.datos.tipoAccion = 'CLONAR';
    this.datos.estatus = 'D';
    this.datos.usuarioCreacion = 'SYSTEM';
    this.returnEvent({datos: this.datos});
  }
  borrarSeleccionados() {
    this.elementosAAlterar = [];
    alert(this.checkBoxElements.length);
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      if (this.checkBoxElements[i]) {
        this.elementosAAlterar.push(this.response[i]);
      }
    }
    this.enviaMsjEliminarDepurar();
  }
    /*DETERMINA LA ACCION AL REMOVER LA REGLA {DEPURAR O ELIMINACION}*/
    enviaMsjEliminarDepurar() {
      this.clearMessage();
      const contadorTotal = this.elementosAAlterar.length;
    let contadorDepuarar = 0;
    let contadorEliminar = 0;
    for (let i = 0; i < this.elementosAAlterar.length; i++) {
      if (this.checkBoxElements[i]) {
        const elemento = this.elementosAAlterar;
        if (elemento[i].estatusMatriz === 'D') {
          contadorEliminar++;
        } else {
          contadorDepuarar++;
        }
      }
    }
    this.totalDepurarEliminar = contadorTotal;
    this.totalDepurar = contadorDepuarar;
    this.totalEliminar = contadorEliminar;
    this.msjEliminar = ConstantesMsg.MSN_ELIMINAR_DEPURAR;
    this.msjEliminarTitulo = ConstantesMsg.TITULO_DEPURAR_ELIMINAR_REGLA;
   }
  validarDatosSeleccionados() {
    let vacio = true;
    for (let i = 0; i < this.checkBoxElements.length; i++) {
      if (this.checkBoxElements[i]) {
        vacio = false;
      }
    }
    return !vacio;
  }
  emptyChkBox() {
    this.alertService.error('NO HAY NINGÚN ELEMENTO SELECCIONADO.', null, '');
  }
  borrarSeleccionado(result: MatrizRangoEquipoResponseDTO) {
    this.elementosAAlterar.push(result);
  }
  /*DETERMINA LA ACCION AL REMOVER LA REGLA {DEPURAR O ELIMINACION}*/
  enviaMsjEliminar(result: MatrizRangoEquipoResponseDTO) {
    this.clearMessage();
    console.log(result.estatusMatriz);
    if (result.estatusMatriz === 'DEPURAR') {
      this.msjEliminar = ConstantesMsg.MSN_ELIMINAR;
      this.msjEliminarTitulo = ConstantesMsg.TITULO_ELIMINAR_REGLA;
    } else {
      this.msjEliminar = ConstantesMsg.MSN_DEPURAR;
      this.msjEliminarTitulo = ConstantesMsg.TITULO_DEPURAR_REGLA;
    }
 }
  eliminarRegistro(): void {
    this.servicio.eliminarMatriz(this.elementosAAlterar).subscribe(res => {
      // this.noElementosModificados = res;
      if (res && res.length > 0) {
        for (; this.elementosAAlterar.length > 0; ) {
          const elemento = this.elementosAAlterar.splice(0, 1);
          if (elemento[0].estatusMatriz !== 'DEPURAR') {
            elemento[0].estatusMatriz = this.estatusConvert('D');
          } else {
            for (let i = 0; i < this.response.length ; i++) {
              if (this.response[i].idMatrizDecision === elemento[0].idMatrizDecision) {
                this.response.splice(i, 1);
              }
            }
          }
        }
        this.alertService.success(ConstantesMsg.SUCCESS_ELIMINA_REGLA, null, '');
      } else {
        this.alertService.error(ConstantesMsg.ERROR_DEPURAR_REGLA, '', null);
      }
    });
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
    if (evt.length <= 12) {
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
        this.parametros.maximo = numero[0] + '.' + numero[1];
      }
    }
  }
  numberMinimoFormat(evt) {
    if (evt.length <= 12) {
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
        this.parametros.minimo = numero[0] + '.' + numero[1];
      }
    }
  }
}
