import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/base/base.component';

@Component({
    selector: 'app-sopres',
    standalone: true,
    imports: [],
    templateUrl: './sopres.component.html'
})
export class SopresComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
