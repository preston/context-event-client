// Core Modules
import { NgModule } from '@angular/core';

// Directives
import { cesEvent } from './directives/cesEvent';

@NgModule({
	declarations: [
		cesEvent,
	],
	exports: [
		cesEvent
	],
	providers: []
})
export class CESModule { }
