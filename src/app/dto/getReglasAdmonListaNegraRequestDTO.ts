export class GetReglasAdmonListaNegraRequestDTO {
	constructor(private nombreRegla?: string,private estatus?: string,private accion?: string,
		private rechazoAutomatico?: string,private mostrarCoincidencia?: string,private modalidadInvestigacion?: string){}
}