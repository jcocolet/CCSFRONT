import { Tramite } from '../modelo/tramite';

export class EvaluacionTramiteInformacionParametrosBusquedaResponseDTO {
	constructor(
		public tramites? : any,
		public canalVentas? : any,
		public mercado? : any,
		public tipoPersona? : any,
		public tipoPlazo? : any,
		public tipoProyecto?: any
	) { }
}