import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';

@Component({
    selector: 'app-tott-systems',
    standalone: true,
    imports: [],
    templateUrl: './tott-systems.component.html'
})
export class TottSystemsComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
}
