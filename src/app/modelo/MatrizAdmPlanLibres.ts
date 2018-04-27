import { ClaseCreditoRequestDTO } from '../dto/getClaseCreditoRequestDTO';
import { CgSiNo } from '../modelo/cgSiNO.model';
import { AccionRespuestaRequestDTO } from '../dto/getAccionRespuestaRequestDTO';
import { EstatusRequestDTO } from '../dto/getEstatusRequestDTO';
import {CsMensajeSistema} from '../modelo/csMensajeSistema.model';

export class MatrizAdmPlanLibres {
    constructor (
        public  idAdmonPlanLibre?: number,
        public idMatrizDecision?: number,
        //public cbmClasecredito?: ClaseCreditoRequestDTO,  
        public idClaseCredito?: number,
        public descClaseCredito?: string,

        //public accionConsDep?:CgSiNo,
        public idAccionConsDep?: number,
        public descAccionConsDep?: string,
        
        //public accionSiCumpleDepDto?: AccionRespuestaRequestDTO,
        public idAccionSiCumpleDep?: number,
        public descASiCumpleDep?: string,
        
        //public msjsjSiCumpleDepDto?:CsMensajeSistema,
        public idMsjsjSiCumpleDep?: number,
        public descMccionSiCumpleDep?: string,
        
        //public accionNoCumpleDepDto?: AccionRespuestaRequestDTO,
        public idAccionNoCumpleDep?: number,
        public descAccionNoCumpleDep?: string,

        //public msjsjNoCumpleDepDto?:CsMensajeSistema,
        public idMsjNoCumpleDep?: number,
        public descMsjNoCumpleDep?: string,

        //public accionAdm?: AccionRespuestaRequestDTO,
        public idAccionAdm?: number,
        public descIdAccionAdm?:string,

        //public msjAccionAdmpDto?:CsMensajeSistema,
        public idMsjAccionAdm?:number,
        public descMsjAccionAdm?:string,
        
        //public estatusDTO?: EstatusRequestDTO,
        public estatus?: string,
        public estatusValor?: string,
    ) {
        this.idClaseCredito = -1;
        this.idAccionConsDep = -1;
        this.idAccionSiCumpleDep=-1;
        this.idAccionNoCumpleDep=-1;
        this.idAccionAdm=-1;
        this.estatus="-1";
        this.descMccionSiCumpleDep ="";
        this.descMsjNoCumpleDep ="";
        this.descMsjAccionAdm ="";

    }
}