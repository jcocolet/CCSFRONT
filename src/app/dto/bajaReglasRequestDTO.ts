export class BajaReglasRequestDTO {
	private ids: number[] = [];
	constructor() {
	}
	public setId(id: number) {
		this.ids.push(id);
	}
}