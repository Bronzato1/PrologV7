import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "../../base.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './profile.component.html'
})
export class ProfileComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
    override ngOnInit(): void {
    }
}
