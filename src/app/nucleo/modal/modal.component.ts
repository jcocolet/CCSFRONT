import { Component, 
  OnInit, 
  ViewChild, 
  OnDestroy, 
  OnChanges, 
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { FlujoTrabajoService } from '../../servicios/flujo-de-trabajo';
import { FlujoComponenteDirectiva} from '../../directivas/flujoComponenteDirectiva';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, OnDestroy, OnChanges, DoCheck, AfterContentInit {

  @ViewChild(FlujoComponenteDirectiva) puntoAnclaje: FlujoComponenteDirectiva;
  public mostrarFondosubModal: boolean = false;

  @Output()
  public reiniciar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private flujoTrabajoService: FlujoTrabajoService) {
  }

  ngOnChanges() {
  }

  ngAfterContentInit() {
  }

  ngAfterContentChecked() {
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
  }
  
  ngOnInit() {
    this.flujoTrabajoService.setPuntoAnclaje(this.puntoAnclaje);
    this.flujoTrabajoService.getObjetoServicio().subscribe((data)=>{
      if(data==true) {
        setTimeout(()=>{
          this.flujoTrabajoService.getObjetoRetropropagado().subscribe((data)=>{
            this.mostrarFondosubModal = data;
          });
        },200);
      }
    });
  }

  ngDoCheck() {
  }

  ngOnDestroy() {
    this.flujoTrabajoService.cancelar();
  }

  getNombrePaso(): string {
  	return this.flujoTrabajoService.getNombrePaso();
  }

  reiniciarFlujo() {
    this.reiniciar.emit(true);
  }
}