export class Alert {
    constructor(
    	public  type: AlertType,
    	public  message: string,
    	public message2: string,
        public message3: string
    ) { }
}

export enum AlertType {
    Primary,
    Success,
    Error,
    Info,
    Warning
}
