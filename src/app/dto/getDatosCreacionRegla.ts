export class DatosCreacionRegla {
  constructor(public idMatrizDecision?: number,
      public idRegion?: number,
      public nombreMatriz?: string,
      public estatus?: string,
      public fechaCreacion?: string,
      public usuarioCreacion?: string,
      public usuarioModificacion?: string,
      public idComponente?: string,
      public tipoAccion?: string) {
  }
}