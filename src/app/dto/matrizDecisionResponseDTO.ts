export class MatrizDecisionResponseDTO {
    constructor(
        public  idMatrizDecision?: number,
        public  nombreMatriz?: string,
        public  estatusMatriz?: string,
        public idRegion?: number,
        public descEstatus?: string) {
        }
    }