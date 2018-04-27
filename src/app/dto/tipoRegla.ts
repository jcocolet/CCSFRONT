export class TipoRegla {
  constructor(
    public idTipoRegla?: number,
    public idRegion?: number,
    public clave?: string,
    public descripcion?: string,
    public claveEstatus?: string,
    public fechaCreacion?: any,
    public usuarioCreacion?: string,
    public fechaModificacion?: any,
    public usuarioModificacion?: string
  ) {}
}
