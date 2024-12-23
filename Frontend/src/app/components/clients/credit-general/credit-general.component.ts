import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/bases/base.component';

@Component({
    selector: 'app-equans',
    standalone: true,
    imports: [],
    templateUrl: './credit-general.component.html'
})
export class CreditGeneralComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
