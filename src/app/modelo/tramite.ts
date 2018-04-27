export class Tramite {

	private tramite : string;
	private descripcion : string;
	private estatus : number;
	private usuarioModificacion : string;
	private fechaModificacion : Date;

	constructor( 
		tramite? : string,
		descripcion? : string,
		estatus? : number,
		usuarioModificacion? : string,
		fechaModificacion? : Date,
	) {
		this.tramite = tramite;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioModificacion = usuarioModificacion;
		this.fechaModificacion = fechaModificacion;
	}

	public setTramite(tramite : string) {
		this.tramite = tramite;
	}
	public getTramite() {
		return this.tramite;
	}

	public setDescripcion(descripcion : string) {
		this.descripcion = descripcion;
	}

	public getDescripcion() {
		return this.descripcion;
	}

	public setEstatus(estatus : number) {
		this.estatus = estatus;
	}

	public getEstatus() {
		return this.estatus;
	}

	public setUsuarioModificacion(usuarioModificacion : string) {
		this.usuarioModificacion = usuarioModificacion;
	}

	public getUsuarioModificacion() {
		return this.usuarioModificacion;
	}

	public setFechaModificacion(fechaModificacion : Date) {
		this.fechaModificacion = fechaModificacion;
	}

	public getFechaModificacion() {
		return this.fechaModificacion
	}
}