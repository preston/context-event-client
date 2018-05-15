import { BaseEvent } from "./base_event";

export class HintEvent extends BaseEvent {

	public static EVENT_TYPE_ACTION: string = 'artaka://events/hint';

	public handler_uri: string;
	public hint_uri: string;

}