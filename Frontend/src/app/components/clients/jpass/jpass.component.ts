import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';

@Component({
    selector: 'app-equans',
    standalone: true,
    imports: [],
    templateUrl: './jpass.component.html'
})
export class JpassComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
