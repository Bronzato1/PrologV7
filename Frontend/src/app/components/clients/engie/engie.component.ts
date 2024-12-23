import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/bases/base.component';

@Component({
    selector: 'app-engie',
    standalone: true,
    imports: [],
    templateUrl: './engie.component.html'
})
export class EngieComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
