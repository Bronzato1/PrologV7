import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "@src/app/components/bases/base.component";

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './about.component.html'
})
export class AboutComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
    override ngOnInit(): void {
    }
}
