import { Tramite } from '../modelo/tramite';

export class InformacionBasicaDTO {
	constructor(
		public tramites? : any,
		public estatusRegistroList? : any,
		public canalVentas? : any,
		public mercado? : any,
		public tipoPersona? : any,
		public tipoPlazo? : any
	) { }
}
