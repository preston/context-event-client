import { Directive, HostListener, Input, ViewContainerRef, OnInit } from '@angular/core';
import { ActionEvent } from "../context_event/action_event";
import { CESService } from "../ces.angular";
import { debounceTime, Subject } from "rxjs";
@Directive({
	selector: '[cesEvent]'
})
export class cesEvent {
	clickTopics = [
		'view',
		'mouse-click',
		'mouse-single-click',
		'mouse-double-click',
		'create-information-object',
		'selectable-item'
	];
	loadTopics = [
		'load',
	];
	changeTopics = [
		'file-picker',
		'alter-information-object',
		'input-information',
	];
	textSelectTopics = [
		'select-value',
		'selectable-data-representation'
	];
	focusTopics = [
		'data-input-component'
	];
	controllerName: string = '';
	private selectionSubject = new Subject<any>();
	private selectionObservable = this.selectionSubject.asObservable();//.debounceTime(300);
	constructor(private ces: CESService, private _view: ViewContainerRef) { }
	ngOnInit() {
		let component = (<any>this._view)._view.component;
		this.controllerName = component.constructor.name;
		// Use observables to debounce text selection events.
		this.selectionObservable.subscribe((text: string) => this.sendSelectionEvent(text));
	}
	@Input('cesEvent') modelUri: string = '';
	@Input('cesParameters') parameters: any;
	@Input('cesTopic') topic: any;
	@HostListener('click') onClick() {
		if (this.clickTopics.includes(this.topic)) {
			this.sendEvent();
		}
	}
	@HostListener('document:load') onLoad() {
		if (this.loadTopics.includes(this.topic)) {
			this.sendEvent();
		}
	}
	@HostListener('change') onChange() {
		if (this.changeTopics.includes(this.topic)) {
			this.sendEvent();
		}
	}
	@HostListener('focus') onFocus() {
		if (this.focusTopics.includes(this.topic)) {
			this.sendEvent();
		}
	}
	@HostListener('document:selectionchange') onTextSelect() {
		if (this.textSelectTopics.includes(this.topic)) {
			// this.selectionSubject.next();
			this.selectionSubject.complete();
		}
	}

	sendSelectionEvent(text: string) {
		const sel = window.getSelection();
		const selectedText = sel?.rangeCount ? sel.getRangeAt(0).toString() : null;
		if (selectedText) {
			console.log("selectedText:", selectedText);
			this.parameters = { text: selectedText };
		}
		this.sendEvent();
	}

	sendEvent() {
		this.ces.send(new ActionEvent(
			this.topic,
			"application://controllers/" + this.controllerName,
			this.modelUri,
			this.parameters
		));
	}
}
