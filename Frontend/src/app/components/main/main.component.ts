import { Component, OnInit, Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base.component';

declare var Foundation: any;

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [],
    templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent {

    constructor() {
        super();
     }
}
