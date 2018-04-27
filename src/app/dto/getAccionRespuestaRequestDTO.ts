export class AccionRespuestaRequestDTO {
    constructor(public idAccion?: number,
        public idRegion?: number,
        public accion?: string,
        public descripcion?: string,
        public estatus?: number,
        public fechaCreacion?: string,
        public usuarioCreacion?: string,
        public fechaModificacion?: string,
        public usuarioModificacion?: string) {
    }
}