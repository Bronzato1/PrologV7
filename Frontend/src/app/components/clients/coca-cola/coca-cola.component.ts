import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';

@Component({
    selector: 'app-coca-cola',
    standalone: true,
    imports: [],
    templateUrl: './coca-cola.component.html'
})
export class CocaColaComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
