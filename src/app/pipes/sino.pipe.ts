import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../utiles/constants';

@Pipe({name: 'sn'})
export class SiNoPipe implements PipeTransform {
  transform(literal: string, descripcion: string): string {
  	switch (literal) {
  		case Constants.S:
  			return Constants.SI;
  		case Constants.N:
  			return Constants.NO;
  		default:
  			return undefined;
  	}
  }
}