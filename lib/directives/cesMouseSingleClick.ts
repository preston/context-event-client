import { Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { ActionEvent } from "../context_event/action_event";
import { CESService } from "../ces.angular";
@Directive({
	selector: '[cesMouseSingleClick]'
})
export class cesMouseSingleClick {
	constructor(private ces: CESService, private _view: ViewContainerRef) {}
	@Input('cesMouseSingleClick') modelUri: string = '';
	@Input('cesParameters') parameters: any;
	@HostListener('click') onClick() {
		let component = (<any> this._view)._view.component;
		this.ces.send(new ActionEvent(
			"mouse-single-click",
			"knartwork://controllers/"+ component.constructor.name,
			this.modelUri,
			this.parameters
		));
	}
}
