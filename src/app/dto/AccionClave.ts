export class AccionClave {
  constructor (public idAccionClave?: number,
    public idRegion?: number,
    public idComponente?: number,
    public accion?: string,
    public descripcion?: string,
    public estatus?: string,
    public fechaCreacion?: string,
    public usuarioCreacion?: string,
    public fechaModificacion?: string,
    public usuarioModificacion?: string) {
    }
}
