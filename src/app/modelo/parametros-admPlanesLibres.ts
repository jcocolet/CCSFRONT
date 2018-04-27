export class ParametrosAdmPlanesLibres {
    constructor(
        public nombreRegla?: string,
        public idRegion?: number,
        public clasecredito?: string,
        public consDeposito?: string,
        public claveEstatus?: string,
        public claveComponente?:string
    ) {
        this.nombreRegla = '';
        this.idRegion = -1; 
        this.clasecredito = '-1';
        this.consDeposito = '-1';
        this.claveEstatus = '-3';
    }
 
}