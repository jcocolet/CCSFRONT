import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LimiteCreditoCrearReglaGetRegionEstatusDTOResponse } from '../../../../dto/limiteCreditoCrearReglaGetRegionEstatusDTOResponse';
import { AlertService } from '../../../../servicios/alert.service';
import { AdministracionReglasLimiteCreditoService } from '../admin-limite-credito/limite-credito.service';
import { LimiteCreditoResponseDTO } from '../../../../dto/limiteCreditoResponseDTO';

@Component({
  selector: 'app-admin-limite-credito',
  templateUrl: './admin-limite-credito.component.html',
  styleUrls: ['./admin-limite-credito.component.css'],
  providers: [AdministracionReglasLimiteCreditoService]
})
export class AdminLimiteCreditoComponent implements OnInit {
  public form: FormGroup;
  public response1: LimiteCreditoCrearReglaGetRegionEstatusDTOResponse;
  public response: any[] = [];
  public multiplosPaginador: number[] = [5,10,15];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any [] = [];
  public numeroPaginas: number = 0;
  public paginaActual: any = [];
  public numeroPaginaActual: number = 0;
  public nombreRegla: AbstractControl;
  public estatus: AbstractControl;
  public minimo: AbstractControl;
  public maximo: AbstractControl;
  public clasificacion: AbstractControl;
  public claseCredito: AbstractControl;
  public deposito: AbstractControl;
  public parametrosBusquedaResponse: LimiteCreditoResponseDTO = new LimiteCreditoResponseDTO();
  private regionUsuario: number = 9;

  constructor(private fb: FormBuilder,private alertService: AlertService, private restService: AdministracionReglasLimiteCreditoService) {
    this.form = fb.group({
      'nombreRegla': ['', Validators.compose([])],
      'estatus': ['', Validators.compose([])],
      'minimo': ['', Validators.compose([])],
      'maximo': ['', Validators.compose([])],
      'clasificacion': ['', Validators.compose([])],
      'claseCredito': ['', Validators.compose([])],
      'deposito': ['', Validators.compose([])]
    });
    this.response1 = new LimiteCreditoCrearReglaGetRegionEstatusDTOResponse();

    this.nombreRegla = this.form.controls['nombreRegla'];
    this.estatus = this.form.controls['estatus'];
    this.minimo = this.form.controls['minimo'];
    this.maximo = this.form.controls['maximo'];
    this.clasificacion = this.form.controls['clasificacion'];
    this.claseCredito = this.form.controls['claseCredito'];
    this.deposito = this.form.controls['deposito'];
    this.restService.getParametrosBusqueda(this.regionUsuario).subscribe((response)=>{
          this.parametrosBusquedaResponse = response;
    });

  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
    if(form.nombreRegla !== '' || form.estatus !== '' || form.minimo !== '' || form.maximo !== ''
      || form.clasificacion !== '' || form.claseCredito !== '' || form.deposito !== ''){
      if(form.minimo !== '' && form.maximo == '') {
        this.alertService.error('max',null,null);
        return;
      }else if(form.maximo !== '' && form.minimo == '') {
        this.alertService.error('min',null,null);
        return;
      }
   
      this.restService.getReglas(form.nombreRegla,form.estatus,form.minimo,form.maximo,
        form.clasificacion,form.claseCredito,form.deposito).subscribe((response)=>{
            this.response = response;
        });

    }else {
      this.alertService.error('almenos_uno',null,null);
    }
  }

  siguientePagina() {
    this.numeroPaginaActual++;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }

  paginaAnterior() {
    this.numeroPaginaActual--;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }

  establecerRegistrosMostrar(evento) {
    this.numeroRegistrosPagina = evento.target.value;
    this.cargarDatosTabla();
    this.numeroPaginaActual = 0;
    this.paginaActual = this.paginas[this.numeroPaginaActual];
  }

  cargarDatosTabla() {
    let pagina = [];
    let contador = 0;
    this.numeroPaginas = Math.ceil(this.response.length/this.numeroRegistrosPagina);
    if(this.paginas.length>0) {
      this.paginas = [];
    }
    for (let i = 0; i < this.response.length; i++) {
      pagina.push(this.response[i]);
      contador++;
      if(contador==this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
        contador = 0;
        pagina = [];
        continue;
      }
    }
    if(pagina.length<this.numeroRegistrosPagina) {
        this.paginas.push(pagina);
    }
  }

  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  myFunction2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("show2");
  }
  
}