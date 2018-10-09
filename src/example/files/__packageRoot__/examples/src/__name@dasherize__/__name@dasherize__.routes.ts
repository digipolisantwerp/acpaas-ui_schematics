import { Routes } from "@angular/router";

import { <%= classify(name) %>DemoPageComponent } from './pages/demo/demo.page';

export const <%= underscore(name).toUpperCase() %>_EXAMPLES_ROUTES: Routes = [
    {
        path: "",
        component: <%= classify(name) %>DemoPageComponent,
        pathMatch: "full",
    },
];
