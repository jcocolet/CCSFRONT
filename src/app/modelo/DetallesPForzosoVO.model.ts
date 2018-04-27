import { CategoriasVO } from '../modelo/CsCategoria.model';
import { CgAcionClave } from '../modelo/cgAccionClave.model';
import { CgClaseCreditoModel } from '../modelo/cgClaseCredito.model';
import { CgAccionResp } from '../modelo/cgAccionRes.model';
import { CsMensajeSistema } from '../modelo/csMensajeSistema.model';

export class DetallePForzosoVO {
  constructor(

      /* ADMON PF*/
    public id?: number,
    public bloqueado?: string,
    public msnNo?: string,
    public msnSi?: string,
    public accionResSi?: string,
    public accionResNo?: string,
    public accionClave?: string,
    public claseCredito?: string,
    public lstCategoriaVo?: Array<CategoriasVO>,
    public lstAccionClave?: Array<CgAcionClave>
  ) {  }
}
