import { BaseEvent } from "./base_event";

export class ActionEvent extends BaseEvent {

	public static EVENT_TYPE_ACTION: string = 'artaka://events/action';

	public type: string = ActionEvent.EVENT_TYPE_ACTION;
	public topic_uri: string = '';
	public controller_uri: string = '';
	public action_uri: string = '';
	public model_uri: string = '';

}