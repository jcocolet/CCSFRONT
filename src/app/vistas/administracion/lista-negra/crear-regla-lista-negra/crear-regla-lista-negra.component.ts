import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlujoTrabajoService } from '../../../../servicios/flujo-de-trabajo';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../servicios/alert.service';

@Component({
  selector: 'app-crear-regla-lista-negra',
  templateUrl: './crear-regla-lista-negra.component.html',
  styleUrls: ['./crear-regla-lista-negra.component.css'],
  providers: [ FlujoTrabajoService ]
})
export class CrearReglaListaNegraComponent implements OnInit {
  @Input()
  public estatusList: any;
  @Input()
  public reglaModif: any;
  @Input()
  editarRegla : any;
  @Output()
  public cerrarModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public formCapturado = new EventEmitter<any>();
  @Output()
  public formModif = new EventEmitter<any>();
  public form: FormGroup;
  public nombreRegla: AbstractControl;
  public estatus: AbstractControl;

  editarRegla2: boolean = false;

  constructor(public fb: FormBuilder, public alertService: AlertService) {
  this.form = fb.group({
      'nombreRegla': ['', Validators.compose([Validators.minLength(8), Validators.required ])],
      'estatus': ['', Validators.compose([ Validators.required ])]
    }); 
    this.nombreRegla = this.form.controls['nombreRegla'];
    this.estatus = this.form.controls['estatus'];
  }

  ngOnInit() {
    this.reglaModif.subscribe((info)=>{
        this.form.controls['nombreRegla'].setValue(info.nombreRegla);
        this.form.controls['estatus'].setValue(info.estatus);
    });

    this.editarRegla.subscribe((data)=>{
        this.editarRegla2 = data;
    });
  }

  onSubmit(frm) {
    if(this.form.valid) {
      if(this.editarRegla2) {
        this.formModif.emit(frm);
        this.editarRegla2 = false;
      }else {
        this.formCapturado.emit(frm);
      }
    }else {
      this.alertService.error('oblig',null,null);
    }
  }

  evitaEspeciales(evt):void {
    let regEx = /^([a-z0-9A-Z ])$/;
    if(!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }

  limpiarFormulario() {
    this.form.controls['nombreRegla'].setValue('');
    this.form.controls['estatus'].setValue('');
  }

}