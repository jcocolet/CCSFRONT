export class EvaluacionTramiteGetDetallesRegla {
	constructor(
		public nombreRegla?: string,public region?: number,
		public fechaInicio?: string,public fechaFin?: string,
		public fuerzasVenta?: string[],public tiposPersona?: string[],
		public tiposLinea?: string[], public canalesVenta?: string[],
		public mercados?: string[], public planes?: string[],
		public tramites?: string,public tiposProyecto?: string[],
		public detalleModulosEvaluacion?: any[]){
	}
}