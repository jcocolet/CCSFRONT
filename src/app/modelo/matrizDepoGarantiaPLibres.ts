export class MatrizDepoGarantiaPLibres {
    constructor (
        public  idAdmonDepPLibre?: string,
        public idMatrizDecision?: number,
        public idClaseCredito?: string,
        public descClaseCredito?: string,
        public descMsjSiCumpleDep?: string,
        public idMsjSiCumpleDep?: number,
        public descMsjNoCumpleDep?: string,
        public idMsjNoCumpleDep?: number,
        public idAccionSiDep?: string,
        public idAccionNoDep?: string,
        public idTipoRegla?: string,
        public minImporte?: string,
        public maxImporte?: string,
        public deposito?: string,
        public estatus?: string) {

    }
}
