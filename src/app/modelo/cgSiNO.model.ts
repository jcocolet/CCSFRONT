export class CgSiNo{
    constructor(
        public idSiNo?: number,
		public valor?: string,
        public estatus?:string,
        public descripcion?:string,
		public fechaCreacion?:Date,
		public usuarioCreacion?:string,
		public fechaModificaci?:Date,
		public usuarioModificacion?: string
    ){
        this.idSiNo=null;
        this.valor=null;
        this.estatus=null;
        this.descripcion=null;
        this.fechaCreacion=null;
        this.usuarioCreacion=null;
        this.fechaModificaci=null;
        this.usuarioModificacion=null;

    }
}