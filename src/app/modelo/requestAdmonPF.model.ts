import { PForzosoVo } from '../modelo/PlanForzosoVO.model';
import { CategoriasVO } from '../modelo/CsCategoria.model';

export class RequestPForzosoVo {
  constructor(
  public idMatriz: number,
  public idRegion: number,
  public lstAdmonPForzoso?: Array<PForzosoVo>,
  public admonPForzoso?: PForzosoVo,
  public lstCategoriaVo?: Array<CategoriasVO>,

  ) {
  }
}
