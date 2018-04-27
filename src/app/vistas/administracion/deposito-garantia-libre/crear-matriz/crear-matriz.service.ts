import { Injectable } from '@angular/core';
import { MatrizDepoGarantiaPLibres } from '../../../../modelo/matrizDepoGarantiaPLibres';

@Injectable()
export class CrearMatrizService {

  constructor() { }

  public formvista: MatrizDepoGarantiaPLibres = new MatrizDepoGarantiaPLibres();
    public lstMatriz: MatrizDepoGarantiaPLibres [] = [];

    agregaLst (formDatos: MatrizDepoGarantiaPLibres): Array <MatrizDepoGarantiaPLibres> {
        this.formvista = formDatos;
        this.lstMatriz.push(this.formvista);
        return this.getLstMatriz();

    }
    borraLstMatriz (index: number) {
        this.lstMatriz.splice(index, 1);
        return this.getLstMatriz();

    }
    getLstMatriz(): Array <MatrizDepoGarantiaPLibres> {
        return this.lstMatriz;

    }
    clonar (formDatos: MatrizDepoGarantiaPLibres): Array <MatrizDepoGarantiaPLibres> {
        this.formvista = formDatos;
        this.lstMatriz.push(this.formvista);
         return this.getLstMatriz();
 
     }
}
