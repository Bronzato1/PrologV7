import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/bases/base.component';

@Component({
    selector: 'app-equans',
    standalone: true,
    imports: [],
    templateUrl: './equans.component.html'
})
export class EquansComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
