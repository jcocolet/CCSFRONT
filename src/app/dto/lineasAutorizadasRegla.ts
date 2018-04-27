export class LineasAutorizadasRegla {
  constructor(
    public idLineasAutoregla?: number,
    public descripcion?: string,
    public pctLineasAct?: number,
    public operador?: string,
    public lineasAdicionales?: number,
    public claveEstatus?: string,
    public fechaCreacion?: any,
    public usuarioCreacion?: string,
    public fechaModificacion?: any,
    public usuarioModificacion?: string
  ) {}
}
