import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/base/base.component';

@Component({
    selector: 'app-gsk',
    standalone: true,
    imports: [],
    templateUrl: './gsk.component.html'
})
export class GskComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
