import { CgClaseCreditoModel} from '../modelo/cgClaseCredito.model';
import { CgClasificacionBCR9Model} from '../modelo/cgClasificacionBCR9.model';
import { CgClasificacionBCDEURModel} from '../modelo/cgClasificacionBCDEUR.model';


export class AdminLimiteCreditoDTO {

    public _cgClaseCredito: CgClaseCreditoModel;
    public _cgClasificacionBCR9: CgClasificacionBCR9Model;
    public _cgClasificacionBCDEUR: CgClasificacionBCDEURModel;

    constructor(public cgClaseCreditoModel: CgClaseCreditoModel) {

        this._cgClaseCredito = cgClaseCreditoModel;
    }
}
