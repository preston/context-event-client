export class ActionEvent {

	public static EVENT_TYPE_ACTION: string = 'artaka://events/action';

	public type: string = ActionEvent.EVENT_TYPE_ACTION;
	public topic_uri: string = '';
	public controller_uri: string = '';
	public model_uri: string = '';
	public parameters: any = '';
	constructor(topic_uri: string,
				controller_uri: string,
				model_uri: string,
				parameters: any){
		this.topic_uri = topic_uri;
		this.controller_uri = controller_uri;
		this.model_uri = model_uri;
		this.parameters = parameters;
	}
}
