import { TgMatriz } from '../modelo/TgMatriz.model';

export class AdmonPForzosoVo {
  constructor(
  public idRegion?: String,
  public nomRegla?: String,
  public claseCredito?: String,
  /* ESTATUS DEL COMBO */
  public estatus?: String,
  public bloqueado?: String,
  public idMatriz?: number,
  public estatusMatriz?: String,
  public matrizVo?: TgMatriz,
  public lstmatrizVo?: Array<TgMatriz>
  ) {
  }
}
