import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';

@Component({
    selector: 'app-equans',
    standalone: true,
    imports: [],
    templateUrl: './akzonobel.component.html'
})
export class AkzonobelComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
