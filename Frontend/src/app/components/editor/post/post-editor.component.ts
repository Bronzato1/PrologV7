import { Component, inject } from "@angular/core";
import { BaseEditorComponent } from "@src/app/bases/base-editor.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MenuComponent } from "../../menu/menu.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TPost } from "@src/app/types/post.type";
import { ENDPOINT, GenericDataService } from "@src/app/services/generic-data-service";

@Component({
    standalone: true,
    selector: 'app-post-editor',
    templateUrl: './post-editor.component.html',
    styleUrl: './post-editor.component.scss',
    imports: [CKEditorModule, MenuComponent, FormsModule, CommonModule],
    providers: [
        { provide: ENDPOINT, useValue: 'posts' }, GenericDataService,
    ]
})
export class PostEditorComponent<T> extends BaseEditorComponent<TPost> {

    protected discriminant: 'post' = 'post';
    protected genericDataService = inject(GenericDataService);
    
    constructor() {
        super();
    }
}
