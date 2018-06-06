import { Directive, HostListener, Input, ViewContainerRef, OnInit } from '@angular/core';
import { ActionEvent } from "../context_event/action_event";
import { CESService } from "../ces.angular";
@Directive({
	selector: '[cesEvent]'
})
export class cesEvent {
	clickTopics = [
		'view',
		'load',
		'create-information-object',
	];
	changeTopics = [
		'file-picker'
	];
	textSelectTopics = [];
	focusTopics = [
		'data-input-component'
	];
	controllerName: string = '';
	constructor(private ces: CESService, private _view: ViewContainerRef) {}
	ngOnInit(){
		let component = (<any> this._view)._view.component;
		this.controllerName = component.constructor.name
	}
	@Input('cesEvent') modelUri: string = '';
	@Input('cesParameters') parameters: any;
	@Input('cesTopic') topic: any;
	@HostListener('click') onClick() {
		if(this.clickTopics.includes(this.topic)){
			this.sendEvent();
		}
	}
	@HostListener('change') onChange() {
		if(this.changeTopics.includes(this.topic)){
			this.sendEvent();
		}
	}
	@HostListener('focus') onFocus() {
		if(this.focusTopics.includes(this.topic)){
			this.sendEvent();
		}
	}

	sendEvent() {
		this.ces.send(new ActionEvent(
			this.topic,
			"knartwork://controllers/"+ this.controllerName,
			this.modelUri,
			this.parameters
		));
	}
}
