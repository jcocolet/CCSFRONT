export class CrearReglalnRequestDTO {
	constructor(
		public nombreRegla?: string,
		public estatus?: string,
		public regionUsuario?: number,
		public idComponente?: number
	) {}
}