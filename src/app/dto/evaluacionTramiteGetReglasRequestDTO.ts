export class EvaluacionTramiteGetReglasRequestDTO {

	private nombreRegla: string;
	private tramite: string;
	private estatus: string;
	private fechaInicio: Date;
	private fechaFin: Date;
	private canal: string;
	private mercado: string;
	private tipoPersona: string;
	private tipoPlazo: string;
	private tipoProyecto: string;

	constructor (formulario: any) {
		this.nombreRegla = formulario.nombreRegla;
		this.tramite = formulario.tramite;
		this.estatus = formulario.estatus;
		this.fechaInicio = formulario.fechaInicio;
		this.fechaFin = formulario.fechaFin;
		this.canal = formulario.canal;
		this.mercado = formulario.mercado;
		this.tipoPersona = formulario.tipoPersona;
		this.tipoPlazo = formulario.tipoPlazo;
		this.tipoProyecto = formulario.tipoProyecto;
	}

	getNombreRegla(): string {
		return this.nombreRegla;
	}

	getTramite(): string {
		return this.tramite;
	}

	getEstatus(): string {
		return this.estatus;
	}

	getFechaInicio(): Date {
		return this.fechaInicio;
	}

	getFechaFin(): Date {
		return this.fechaFin;
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