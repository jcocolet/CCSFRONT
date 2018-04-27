export class Constants {
  // public URL : string = 'http://192.9.198.41:18048/CreditCheckWebBack';
   public URL : string = 'http://localhost:8080';
  // public URL : string = 'http://localhost:9080/CreditCheckWebBack';
   //public URL : string = 'http://10.119.3.24:9085/CreditCheckWebBack';

  public static DIAGONAL: string = '/';

  //Evaluacion tramite
  public static EVALUACION_TRAMITE: string = 'evaluacion-tramite';
  public static PARAMETROS_BUSQUEDA: string = 'ParametrosBusqueda';
  public static REGLAS: string = 'Reglas';

  public static GET_LC_REGN_ESTS_NR: string = 'limiteCreditoCrearReglaGetRegionEstatus';
  public static GET_INFO_PARAMS_BUSC_REGLN: string = 'getInfoParamsBuscRegLN';
  public static GET_CATEGORIAS_LISTA_NEGRA: string = 'getCategoriasListaNegra';
  public static BAJA_REGLAS: string = 'bajaReglas';
  public static CLONAR_REGLA: string = 'clonarRegla';
  public static DETALLES_REGLA: string = 'DetallesRegla';
  public static RECUPERAR_INFORMACION_FLUJO: string = 'getDetallesRegla';

  //Informacion basica
  public static INFORMACION_BASICA: string = 'informacion-basica';
  public static GET_OPCIONES_INFBSC_USUARIO: string = 'getOpcionesInformacionBasicaPorUsuario';
  public static GET_FUERZAVENTA: string = 'getFuerzaVenta';
  public static GET_MODELOS: string = 'getModelos';

  //Lista negra
  public static LISTA_NEGRA: string = 'lista-negra';
  public static BUSCAR_REGLAS_LISTA_NEGRA: string = 'buscarReglasListaNegra';
  public static CREAR_REGLA_LISTA_NEGRA: string = 'crearReglaListaNegra';
  public static BUSCAR_CATEGORIAS_XREGION_XIDCOMP: string = 'getCategoriasxRegionxComp';
  public static GUARDAR_MATRICES: string = 'guardarMatrices';
  public static ACCION: string = 'accion';
  public static RECHAZO_AUTOMATICO: string = 'rechAut';
  public static MOSTRAR_COINCIDENCIA: string = 'mostrarCoin';
  public static MODALIDAD_INVESTIGACION: string = 'modInv';
  public static ID_COMPONENTE: string = 'idComponente';
  public static GUARDAR_CATEGORIAS: string = 'guardarCategorias';

  //Limite de credito
  public static LIMITE_CREDITO: string = 'limite-credito';
  public static MINIMO: string = 'minimo';
  public static MAXIMO: string = 'maximo';
  public static CLASIFICACION: string = 'clasificacion';
  public static CLASE_CREDITO: string = 'claseCredito';
  public static DEPOSITO: string = 'deposito';


  //Deposito en garantia plazo libre
  public static DG_PLAZO_LIBRE: string = 'depgar-plazo-libre';

  //Deposito en garantia plazo forzoso
  public static DG_PLAZO_FORSOZO: string = 'depgar-plazo-forsozo';

  //Rango de equipo
  public static RANGO_EQUIPO: string = 'rango-equipo';


  //Descripciones de los valores de las literales de estatus
  public static A: string = 'A';
  public static ACTIVO: string = 'ACTIVO';
  public static D: string = 'D';
  public static DEPURAR: string = 'DEPURAR';
  public static DI: string = 'DI';
  public static DEPURAR_INMEDIATAMENTE: string = 'DEPURAR INMEDIATAMENTE';

  // Descripciones de los valores de las literales de modalidad de investigacion
  public static NA: string = 'NA';
  public static MI_DI: string = 'DI';

  public static COMBO_ESTATUS = [Constants.A,Constants.D,Constants.DI];
  public static MOD_INVST = [Constants.NA,Constants.MI_DI];

  // Errores http
  public static ERROR_INTERNO_SERVIDOR: number = 500;

  //Informacion basica
  public static INFORMACION_BASICA_CREAR_FLUJO: string = 'crearFlujo';

  //DEPOSITO GARANTIA PLAZO FORZOSO
  public static GET_MATRIZPFORZOSO: any = 'depoGarantiaPForzoso/getMatrizDepoGarantiaPForzoso';
  public static GET_ADMONPFORZOSO: any = 'depoGarantiaPForzoso/getAdmonDepoGarantiaPForzoso';
  public static BAJA_MATRIZPF: any = 'depoGarantiaPForzoso/bajaMatrizDepoGarantiaPForzoso';
  public static ACTUALIZA_MATRIZPF: any = 'depoGarantiaPForzoso/actualizaMatrizDepoGarantiaPForzoso';
  public static AGREGA_MATRIZPF: any = 'depoGarantiaPForzoso/agregaMatrizDepoGarantiaPForzoso';
  public static CLONAR_MATRIZPF: any = 'depoGarantiaPForzoso/clonarMatrizDepoGarantiaPForzoso';
  public static BAJA_ALL_MATRIZPF: any = 'depoGarantiaPForzoso/bajaMatrizAllDepoGarantiaPForzoso';
  public static GET_CATEGORIAPF: any = 'depoGarantiaPForzoso/getCategoriaPFDepoGarantiaPForzoso';
  public static GET_ACCIONCLAVEPF: any = 'depoGarantiaPForzoso/getAccionClavePFDepoGarantiaPForzoso';
  public static AGREGA_ADMON_PF: any = 'depoGarantiaPForzoso/agregaAdmonPFDepoGarantiaPForzoso';
  public static ELIMINA_ADMON_PF: any = 'depoGarantiaPForzoso/eliminaAdmonPFDepoGarantiaPForzoso';

  // Descripcion de los valores de los combos si no
  public static S: string = 'S';
  public static SI: string = 'SI';
  public static N: string = 'N';
  public static NO: string = 'NO';

  // CATALOGOS GENERALES
  public static GET_CGCLASECREDITO: any = 'catalogosGenerales/getClasecredito';
  public static GET_CGESTATUSREGISTRO: any = 'catalogosGenerales/getEstatus';
  public static GET_CGCATEGORIA: any = 'catalogosGenerales/getCategoriaComponente';
  public static GET_CGACCIONRESPUESTA: any = 'catalogosGenerales/getAccionRespuesta';
  public static GET_EVALUACION_TRAMITE: String = 'getEvaluacionTramite';
  public static GET_BUSQUEDA: any = 'matrizAdministracion/getMatrizRangoEquipo';
  public static GET_BUSQUEDAREGIONPF: any = 'getRegionPForozoso';
  public static GET_ACCIONRESPUESTA: any = 'catalogosGenerales/getAccionRespuesta';
  public static GET_CGCATEGORIAA: any = 'catalogosGenerales/getCategoriaComponenteA';
  public static GET_ACCIONCLAVE: any = 'catalogosGenerales/getAccionClave';
  public static GET_CGCLASIFICACION: any = 'catalogosGenerales/getClasificacion';
  public static GET_TIPOREGLA: any = 'catalogosGenerales/getTipoRegla';
  public static GET_CGSINO: any = 'catalogosGenerales/getCGSiNo';
  public static GET_COMPONENTEBYCVE: any = 'catalogosGenerales/getComponenteByClave';


  // RANGO EQUIPO
  public static GET_BUSQUEDARANGOEQUIPO: any = 'rangoEquipoController/getMatrizRangoEquipo';
  public static GET_RANGODESCRIPCION: any = 'rangoEquipoController/getRangoDescripcion';
  public static PUT_CREAR_REGLA: any = 'rangoEquipoController/putCrearRegla';
  public static DEL_MATRIZ: any = 'rangoEquipoController/delMatriz';
  public static DEL_RANGOEQUIPO = 'rangoEquipoController/delRangoEquipo';
  public static CREAR_MATRIZ: any = 'rangoEquipoController/putCrearMatriz';

  // DEPOSITO GARANTIA PLAZO LIBRE
  public static GET_BUSQUEDADEPOGARANTIAPLIBRES: any = 'depoGarantiaPLibres/getMatrizDepoGarantiaPLibres';
  public static BAJA_REGLAS_DEPOSITOS_LIBRES: string = 'depoGarantiaPLibres/depurarMatriz';
  public static CLONAR_REGLA_DEPOSITO_LIBRES: string = 'depoGarantiaPLibres/getClonarDepoGarantiaPLibres';
  public static GET_ADMINDEPOGARANTIAPLIBRES: string = 'depoGarantiaPLibres/getAdminDepoGarantiaPLibres';
  public static CREAR_REGLA_DEPOSITO_LIBRES: string = 'depoGarantiaPLibres/crearReglaDepoGarantiaPLibres';
  public static GET_DETALLEDEPOGARANTIAPLIBRES: string ='depoGarantiaPLibres/getDetalleDepoGarantiaPLibres';
  public static ACTUALIZAR_REGLA_DEPOSITO_LIBRES: string = 'depoGarantiaPLibres/actualizarReglaDepoGarantiaPLibres';
  public static PUT_CREAR_MATRIZ_DEPGARANTIA_PLIBRES: string = 'depoGarantiaPLibres/crearMatrizDepoGarantiaPLibres';
  public static GET_MATRIZDEPOGARANTIAPLIBRES: string = 'depoGarantiaPLibres/getAdmonMatrizGarantiaPLibres';
  public static ELIMINAR_REGLA_DEPOGARANTIAPLIBRES:string = 'depoGarantiaPLibres/eliminarReglaMatrizPLibres';

  public static INTERROGACION: string = '?';
  public static IGUAL: string = '=';
  public static AMPERSAND: string = '&';

  //Todas administraciones
  public static NOMBRE_REGLA: string = 'nombreRegla';
  public static TRAMITE: string = 'tramite';
  public static ESTATUS: string = 'estatus';
  public static FECHA_INICIO: string = 'fechaInicio';
  public static FECHA_FIN: string = 'fechaFin';
  public static CANAL: string = 'canal';
  public static MERCADO: string = 'mercado';
  public static TIPO_PERSONA: string = 'tipoPersona';
  public static TIPO_PLAZO: string = 'tipoPlazo';
  public static TIPO_PROYECTO: string = 'tipoProyecto';

  // ADM PLANES LIBRES
  public static GET_BUSQUEDAMATRIZPLANESLIBRES: any = 'admPlanesLibres/getMatrizPlanesLibres';
  public static GET_MATRIZADMPLANLIBRES: string = 'admPlanesLibres/getAdmonMatrizPLibres';
  public static ELIMINA_REGLA_ADM_PLANES_LIBRES: string = 'admPlanesLibres/eliminaReglaMatrizPLibres';
  public static PUT_CREAR_MATRIZ_PLANES_LIBRES: string = 'admPlanesLibres/crearMatrizPLibres';
  public static ACTUALIZAR_REGLA_ADM_PLANES_LIBRES: string = 'admPlanesLibres/actualizarReglaPLibres';
  public static CLONAR_REGLA_ADM_PLANES_LIBRES: string = 'admPlanesLibres/getClonarAdmPLibres';
  public static BAJA_REGLAS_ADM_PLAN_LIBRES: string = 'admPlanesLibres/depurarMatriz';
  public static CREAR_MATRIZ_ADM_P_LIBRES: string = 'admPlanesLibres/crearReglaPLibres';
  public static CLAVECOMPONENTE:string = 'ADMPL';
  // ADMINISTRACION LIMITE DE CREDITO
  public static CREAR_REGLA_LINEAS_AUTORIZADAS: any = 'lineasAutorizadasController/crearReglaLineasAuto';
  public static GET_BUSQUEDA_LINEAS_AUTORIZADAS: any = 'lineasAutorizadasController/getMatrizLineasAutorizadas';
  public static ACTUALIZAR_REGLA_LINEAS_AUTORIZADAS: any = 'lineasAutorizadasController/actualizarRegla';
  public static GET_MATRIZ_LINEAS_AUTORIZADAS: string = 'lineasAutorizadasController/getLineasAutorizadasRegla';
  public static SET_MATRIZ_LINEAS_AUTORIZADAS: string = 'lineasAutorizadasController/setLineasAutorizadasRegla';
  public static DEL_MATRIZ_LINEAS_AUTORIZADAS: string = 'lineasAutorizadasController/delLineasAutorizadasRegla';
  public static AGRUPAR_COMPONENTES: string = 'agrupar-componentes';
  public static COMPONENTES: string = 'Componentes'; 

  // ADMINISTRACION SCORE
  public static GET_BUSQUEDA_SCORE: any = 'scoreController/getMatrizDecision';
  public static CREAR_REGLA_SCORE: string = 'scoreController/crearRegla';
  public static ACTUALIZAR_REGLA_SCORE: string = 'scoreController/actualizarRegla';
}
