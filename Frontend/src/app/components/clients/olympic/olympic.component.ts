import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@src/app/components/bases/base.component';

@Component({
    selector: 'app-olympic',
    standalone: true,
    imports: [],
    templateUrl: './olympic.component.html'
})
export class OlympicComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
