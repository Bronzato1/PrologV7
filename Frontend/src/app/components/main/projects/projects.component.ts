import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "../../base.component";

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './projects.component.html'
})
export class ProjectsComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
    override ngOnInit(): void {
    }
}
