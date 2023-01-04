export class BaseEvent {

	public id: string = '';
	public context_id: string = '';
	public created_at: Date;

	public model_uri: string = '';
	public parameters: Object = '';

	public constructor() {
		this.created_at = new Date();
	}
}