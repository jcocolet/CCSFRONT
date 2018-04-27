export class EstatusRequestDTO {
    constructor(
        public estatus?: string,
        public descripcion?: string,
        public usuarioModificacion?: string,
        public fechaModificacion?: string,
        public clave?: string) {
            this.estatus = estatus;
            this.descripcion = descripcion;
            this.usuarioModificacion = usuarioModificacion;
            this.fechaModificacion = fechaModificacion;
            this.clave = clave;
    }
}
