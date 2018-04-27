export class TipoReglaDTO {
    constructor(public idTipoRegla?: number,
        public idRegion?: number,
        public clave?: string,
        public descripcion?: string,
        public estatus?: string,
        public fechaCreacion?: string,
        public usuarioCreacion?: string,
        public fechaModificacion?: string,
        public usuarioModificacion?: string) {
    }
  }