// Core Modules
import { NgModule } from '@angular/core';

// Directives
import { cesMouseSingleClick } from './directives/cesMouseSingleClick';

@NgModule({
	declarations: [
		cesMouseSingleClick,
	],
	exports: [
		cesMouseSingleClick
	],
	providers: []
})
export class CESModule { }
