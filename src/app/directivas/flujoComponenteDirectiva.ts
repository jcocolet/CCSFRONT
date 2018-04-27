import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[flujoComponente]',
})
export class FlujoComponenteDirectiva {
  constructor(public viewContainerRef: ViewContainerRef) { }
}