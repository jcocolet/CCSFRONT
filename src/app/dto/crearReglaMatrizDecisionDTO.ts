export class CrearReglaMatrizDecisionDTO {
    constructor(public idMatrizDecision?: number,
        public idRegion?: number,
        public nombreMatriz?: string,
        public estatus?: string,
        public fechaCreacion?: string,
        public usuarioCreacion?: string) {
    }
  }
