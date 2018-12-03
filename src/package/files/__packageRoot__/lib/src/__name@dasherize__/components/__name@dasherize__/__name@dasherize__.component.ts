import { Component, OnInit } from '@angular/core';

@Component({
    selector: '<%= selector %>',
    templateUrl: './<%= dasherize(name) %>.component.html',
})
export class <%= classify(name) %>Component implements OnInit {
    constructor() {

    }

    public ngOnInit(): void {

    }
}
