import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Components, EntryComponents } from './components';
import { Directives } from './directives';
import { Pipes, PipesProviders } from './pipes';
import { Services } from './services';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		Components,
		Directives,
		Pipes,
	],
	entryComponents: [
		EntryComponents,
	],
	providers: [
		PipesProviders,
		Services,
	],
	exports: [
		Components,
		Directives,
		Pipes,
	],
})
export class <% classify(name) %>Module {

}
