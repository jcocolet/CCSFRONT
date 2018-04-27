import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../utiles/constants';

@Pipe({name: 'sts'})
export class EstatusPipe implements PipeTransform {
  transform(literal: string, descripcion: string): string {
  	switch (literal) {
  		case Constants.A:
  			return Constants.ACTIVO
  		case Constants.D:
  			return Constants.DEPURAR
  		case Constants.DI:
  			return Constants.DEPURAR_INMEDIATAMENTE
  		default:
  			return undefined;
  	}
  }
}