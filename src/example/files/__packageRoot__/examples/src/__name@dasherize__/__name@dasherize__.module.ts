import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { <%= classify(name) %>Module } from "@acpaas-ui/ngx-components/<%= dasherize(name) %>";

import { <%= underscore(name).toUpperCase() %>_EXAMPLES_ROUTES } from './<%= dasherize(name) %>.routes';
import { Pages } from './pages/index';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(<%= underscore(name).toUpperCase() %>_EXAMPLES_ROUTES),
        <%= classify(name) %>Module,
    ],
    declarations: [
        Pages,
	],
})
export class <%= classify(name) %>ExamplesModule {}
