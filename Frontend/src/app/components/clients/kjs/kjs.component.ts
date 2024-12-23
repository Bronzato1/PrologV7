import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/bases/base.component';

@Component({
    selector: 'app-kjs',
    standalone: true,
    imports: [],
    templateUrl: './kjs.component.html'
})
export class KjsComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
