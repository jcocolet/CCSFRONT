export class CategoriaRequestDTO {
    constructor(public idCategoria?: number,
        public idRegion?: number,
        public idComponente?: number,
        public categoria?: string,
        public descripcion?: string,
        public seleccionado?: boolean
    ) {
        this.seleccionado = false;
    }
}