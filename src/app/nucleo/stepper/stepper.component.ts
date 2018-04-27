import { Component, OnInit } from '@angular/core';
import { FlujoTrabajoService } from '../../servicios/flujo-de-trabajo';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  public actual: boolean = true;
  public retraso: boolean = false;
  private avance: number = 0;

	constructor(private flujoTrabajoService: FlujoTrabajoService) {

	}

  	ngOnInit() {
      setTimeout(()=>{
        this.retraso = true;
      },3500);
  	}

  	getPasos():any {
  		return this.flujoTrabajoService.getPasos();
  	}

    getNombrePaso(): string {
    return this.flujoTrabajoService.getNombrePaso();
    }

    estaCompletado() {
      return this.flujoTrabajoService.estaCompletado();
    }
}