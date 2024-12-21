import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/base/base.component';

@Component({
    selector: 'app-schenk',
    standalone: true,
    imports: [],
    templateUrl: './schenk.component.html'
})
export class SchenkComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
