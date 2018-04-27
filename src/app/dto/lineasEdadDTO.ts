export class LineasedadDTO {
    constructor(
        public idAdmonLineasEdad?: number,
        public idMatrizDecision?: string,
        public aniosInicio?: number,
        public aniosFin?: number,
        public idAccionSiCumple?: string,
        public idMsjsiCumple?: string,
        public estatus?: string,
        public fechaCreacion?: string,
        public usuarioCreacion?: string,
        public fechaModificacion?: string,
        public usuarioModificacion?: string) {}
}
