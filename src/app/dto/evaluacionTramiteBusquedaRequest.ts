export class EvaluacionTramiteBusquedaRequest {
	constructor(
		public nombreRegla?: string,
		public tramite?: string,
		public status?: string,
		public fechaInicio?: string,
		public fechaFin?: string,
		public canal?: string,
		public mercado?: string,
		public tipoPersona?: string,
		public tipoPlazo?: string,
		public tipoProyecto?: string){}
}