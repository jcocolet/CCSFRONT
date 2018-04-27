import { Component, OnInit, Input } from '@angular/core';
import { LimiteCreditoCrearReglaGetRegionEstatusDTOResponse } from '../../../../dto/limiteCreditoCrearReglaGetRegionEstatusDTOResponse';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-crear-regla-limite-credito',
  templateUrl: './crear-regla-limite-credito.component.html',
})
export class CrearReglaLimiteCreditoComponent implements OnInit {

  @Input()
  public response1: LimiteCreditoCrearReglaGetRegionEstatusDTOResponse;
  public formCRM: FormGroup;
  public nombreReglaCRM: AbstractControl;
  public regionCRM: AbstractControl;
  public estatusCRM: AbstractControl;
  constructor(private fb: FormBuilder) {
  	this.formCRM = fb.group({
      'nombreReglaCRM': ['', Validators.compose([Validators.required,Validators.minLength(8)])],
      'regionCRM': ['', Validators.compose([Validators.required])],
      'estatusCRM': ['', Validators.compose([Validators.required])]
    });

    this.nombreReglaCRM = this.formCRM.controls['nombreReglaCRM'];
    this.regionCRM = this.formCRM.controls['regionCRM'];
    this.estatusCRM = this.formCRM.controls['estatusCRM'];
  }

  ngOnInit() {
  }

  onSubmit(frm) {
    console.log(this.formCRM.valid);
  }

  limpiarFormulario() {
    this.formCRM.reset();
  }

}
