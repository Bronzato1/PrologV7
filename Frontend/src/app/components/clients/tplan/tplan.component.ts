import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/base/base.component';

@Component({
    selector: 'app-tplan',
    standalone: true,
    imports: [],
    templateUrl: './tplan.component.html'
})
export class TplanComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
