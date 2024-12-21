import { Component, inject } from "@angular/core";
import { BaseEditorComponent } from "@src/app/components/base/base-editor.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MenuComponent } from "../../menu/menu.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IProject } from "@src/app/interfaces/project.interface";
import { ENDPOINT, GenericDataService } from "@src/app/services/generic-data-service";

@Component({
    standalone: true,
    selector: 'app-project-editor',
    templateUrl: './project-editor.component.html',
    styleUrl: './project-editor.component.scss',
    imports: [CKEditorModule, MenuComponent, FormsModule, CommonModule],
    providers: [
        { provide: ENDPOINT, useValue: 'projects' }, GenericDataService,
    ]
})
export class ProjectEditorComponent<T> extends BaseEditorComponent<IProject> {

    protected discriminant: 'project' = 'project';
    protected genericDataService = inject(GenericDataService);

    constructor() {
        super();
    }
}
