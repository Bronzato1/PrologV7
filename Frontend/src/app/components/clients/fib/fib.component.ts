import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';

@Component({
    selector: 'app-fib',
    standalone: true,
    imports: [],
    templateUrl: './fib.component.html'
})
export class FibComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
