export class AdminLineasAutorizadasRequestDTO {
constructor (public idAdmonLineasAutorizadas?: number,
    public idMatrizDecision?: number,
    public idClaseCredito?: number,
    public idLineasAutRegla?: number,
    public idAccionNoCumple?: number,
    public idAccionSiCumple?: number,
    public idMsjNoCumple?: number,
    public idMsjSiCumple?: number,
    public claveEstatus?: string,
    public fechaCreacion?: string,
    public usuarioCreacion?: string,
    public fechaModificacion?: string,
    public usuarioModificacion?: string) {}
}
