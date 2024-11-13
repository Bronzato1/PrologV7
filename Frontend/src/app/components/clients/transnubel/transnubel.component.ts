import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';

@Component({
    selector: 'app-transnubel',
    standalone: true,
    imports: [],
    templateUrl: './transnubel.component.html'
})
export class TransnubelComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
