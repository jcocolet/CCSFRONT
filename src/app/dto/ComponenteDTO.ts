export class ComponenteDTO {
    constructor(
        public idComponente?:number,
        public idRegion?:number,
        public nombre?:string,
        public descripcion?:string,
        public estatus?:string,
        ) {
            this.idComponente = idComponente,
            this.idRegion = idRegion,
            this.nombre = nombre,
            this.descripcion = descripcion,
            this.estatus = estatus
    }
}