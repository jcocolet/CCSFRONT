export class CgClaseCreditoModel {
  constructor( public descripcion: string,
    public idClaseCredito?: number,
    public nombre?: string,
    public estatus?: number,
    public clave?: string,
    public usuarioModificacion?: string,
    public fechaModificacion?: string
    ) {
    }
}
