export class EvaluacionTramiteGetReglasResponseDTO {
	private idRegla: number;
	private nombreRegla: string;
	private tramite: string;
	private fechaInicio: string;
	private fechaFin: string;
	private estatus: string;
	private canal: string;
	private mercado: string;
	private tipoPersona: string;
	private tipoPlazo: string;
	private tipoProyecto: string;

	constructor(
		id?: number,
		nombreRegla?:string,
		tramite?:string,
		fechaInicio?:string,
		fechaFin?:string,
		estatus?:string,
		canal?:string,
		mercado?:string,
		tipoPersona?:string,
		tipoPlazo?:string,
		tipoProyecto?:string){
		this.idRegla = id;
		this.nombreRegla = nombreRegla;
		this.tramite = tramite;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.estatus = estatus;
		this.canal = canal;
		this.mercado = mercado;
		this.tipoPersona = tipoPersona;
		this.tipoPlazo = tipoPlazo;
		this.tipoProyecto = tipoProyecto;
	}

	getIdRegla(): number {
		return this.idRegla;
	}

	getNombreFlujo(): string {
		return this.nombreRegla;
	}

	getTramite(): string {
		return this.tramite;
	}

	getFechaInicio(): string {
		return this.fechaInicio;
	}

	getFechaFin(): string {
		return this.fechaFin;
	}

	getEstatus(): string {
		return this.estatus;
	}

	getCanal(): string {
		return this.canal;
	}

	getMercado(): string {
		return this.mercado;
	}

	getTipoPersona(): string {
		return this.tipoPersona;
	}

	getTipoPlazo(): string {
		return this.tipoPlazo;
	}

	getTipoProyecto(): string {
		return this.tipoProyecto;
	}
}