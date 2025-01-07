import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "@src/app/bases/base.component";

@Component({
    selector: 'app-stack',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './stack.component.html'
})
export class StackComponent extends BaseComponent implements OnInit {

    constructor() {
        super();
    }
    override ngOnInit(): void {
    }
}
