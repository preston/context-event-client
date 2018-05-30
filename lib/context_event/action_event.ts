export class ActionEvent {

	public static EVENT_TYPE_ACTION: string = 'artaka://events/action';

	public type: string = ActionEvent.EVENT_TYPE_ACTION;
	public topic_uri: string = '';
	public controller_uri: string = '';
	public model_uri: string = '';
	public parameters: any = '';

}
