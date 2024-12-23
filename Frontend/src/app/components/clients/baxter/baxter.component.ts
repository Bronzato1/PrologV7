import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/bases/base.component';

@Component({
    selector: 'app-baxter',
    standalone: true,
    imports: [],
    templateUrl: './baxter.component.html'
})
export class BaxterComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
