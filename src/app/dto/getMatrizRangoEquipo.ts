export class DetalleRango {
  constructor(
    public nombreAccion?: string,
    public nombreClaseCredito?: string,
    public fechaCreacion?: string,
    public fechaModificacion?: string,
    public preciominimo?: string,
    public preciomaximo?: string,

    public idAdmonRango?: number,
    public idMatriz?: number,
    public idAccion?: number,
    public idAccNoCumpleRango?: number,
    public idMsjNoCumpleRango?: number,
    public msjNoCumpleRango?: string,
    public idAccSiCumpleRango?: number,
    public idMsjSiCumpleRango?: number,
    public msjSiCumpleRango?: string,
    public precioKitMaximo?: string,
    public precioKitMinimo?: string,
    public precioTotalMaximo?: string,
    public precioTotalMinimo?: string,
    public idClaseCredito?: number,
    public claveEstatus?: string,
    public usuarioCreacion?: string,
    public usuarioModificacion?: string
  ) {}
}
