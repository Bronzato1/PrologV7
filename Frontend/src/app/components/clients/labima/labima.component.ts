import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/base/base.component';

@Component({
    selector: 'app-labima',
    standalone: true,
    imports: [],
    templateUrl: './labima.component.html'
})
export class LabimaComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
