export class MatrizDecisionDTO {
    constructor(public idMatrizDecision?: number,
        public idRegion?: number,
        public nombreMatriz?: string,
        public estatus?: string,
        public fechaCreacion?: string,
        public usuarioCreacion?: string,
        public fechaModificacion?: string,
        public usuarioModificacion?: string,
        public idComponente?: number) {
    }
  }