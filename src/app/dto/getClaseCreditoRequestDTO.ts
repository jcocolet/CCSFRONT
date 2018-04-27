export class ClaseCreditoRequestDTO {
    constructor(public idClaseCredito?: number,
        public idRegion?: number,
        public clave?: string,
        public descripcion?: string,
        public estatus?: number,
        public fechaCreacion?: string,
        public usuarioCreacion?: string,
        public fechaModificacion?: string,
        public usuarioModificacion?: String) {
        }
}
