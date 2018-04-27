export class GenerarMatrizRequestDTO {
	constructor(
		public idMtzDec?: number,
		public nombre?: string,
		public callnum?: string,
		public rfc?: string,
		public telcas?: string,
		public telofi?: string,
		public telref?: string,
		public nomref?: string,
		public tarcre?: string,
		public robide?: string,
		public accion?: number,
		public rezaut?: string,
		public moscoi?: string,
		public modinvCtrl?: string,
		public estatusCtrl?: string,
		public msgfv?: string) {
	}
}