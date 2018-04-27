export class AdmPlanesLibresMatrizDTO {

    constructor(
        public seleccionado?:boolean,
        public idMatrizDecision?: number,
        public idRegion?: number,
        public nombreMatriz?: string,
        public estatusMatriz?: string,
        public fechaCreaciona?: Date,
        public usuarioCreacion?: string,
        public fechaModificacion?: Date,
        public usuarioModificacion?: string,
        public descripcionEstatusMat?: string,
        public idComponente?: number,
        public estatus?: string
    ) { 
        this.seleccionado = false;
    }
}