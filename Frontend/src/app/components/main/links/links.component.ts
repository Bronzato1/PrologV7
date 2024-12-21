import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "@src/app/components/base/base.component";

@Component({
    selector: 'app-links',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './links.component.html'
})
export class LinksComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
    override ngOnInit(): void {
    }
}
