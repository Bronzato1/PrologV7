import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppComponent } from '@src/app/app.component';
import { IBackendResponse, IPost } from '@src/app/interfaces/post.interface';
import { PostDataService } from '@src/app/services/post-data-service';
import { AlertService } from '@src/app/services/alert.service';
import {
    BalloonEditor,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Underline,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Undo,
    CodeBlock
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { MenuComponent } from "../menu/menu.component";
import { BaseComponent } from '../base.component';
import { AlertType } from '@src/app/enumerations/alert-type.enumeration';

@Component({
    standalone: true,
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.scss',
    imports: [CKEditorModule, MenuComponent, FormsModule, CommonModule],
})
export class EditorComponent extends BaseComponent implements OnInit {

    protected editor = BalloonEditor;
    protected errorMessage = '';
    protected deleteMessageEnabled = false;
    protected operationText = 'Insert';
    private postDataService = inject(PostDataService);
    private alertService = inject(AlertService);

    protected menuItems = [
        { label: 'Save', action: () => this.submit() }
    ];
    protected post: IPost = {
        title: '...',
        content: '...',
        tags: 'aaa, bbb, ccc',
        status: 0
    };
    public config = {
        toolbar: [
            'undo', 'redo', '|',
            'heading', '|', 'bold', 'italic', 'underline', '|',
            'link', 'mediaEmbed', 'codeBlock', '|',
            'bulletedList', 'numberedList', 'indent', 'outdent'
        ],
        plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Underline,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Undo,
            CodeBlock
        ],
        codeBlock: {
            languages: [
                { language: 'cs', label: 'C#' },
                { language: 'javascript', label: 'JavaScript' },
                { language: 'html', label: 'HTML' },
                { language: 'css', label: 'CSS' },
                { language: 'javascript', label: 'JavaScript' },
                { language: 'typescript', label: 'TypeScript' }
            ]
        }
    }
    public override ngOnInit() {
        super.ngOnInit();
        const id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getPost(id);
        }
    }
    private getPost(id: string) {
        this.postDataService.getPost(id)
            .subscribe({
                next: (post: IPost) => {
                    this.post = post;
                },
                error: (err) => {
                    console.log(err)
                },
                complete: () => {
                    // ...
                }
            });
    }
    protected submit() {
        if (this.post.id) {
            //* Updating the post 
            this.postDataService.updatePost(this.post)
                .subscribe({
                    next: (post: IPost) => {
                        if (post) {
                            this.alertService.showAlert({
                                title: 'UPDATE',
                                type: AlertType.success,
                                message: 'The post has been updated successfully'
                            });
                            this.router.navigate(['/main']);
                        } else {
                            this.errorMessage = 'Unable to save customer';
                        }
                    },
                    error: (err) => {
                        console.log(err)
                    },
                    complete: () => {
                        // ...
                    }
                });
        } else {
            //* Creating the post
            this.postDataService.insertPost(this.post)
                .subscribe({
                    next: (post: IPost) => {
                        if (post) {
                            this.alertService.showAlert({
                                title: 'CREATE',
                                type: AlertType.success,
                                message: 'The post has been added successfully'
                            });
                            this.router.navigate(['/main']);
                        }
                        else {
                            this.errorMessage = 'Unable to add customer';
                        }
                    },
                    error: (err) => {
                        console.log(err)
                    },
                    complete: () => {
                        // ...
                    }
                });
        }
    }
    protected addTag(tagToAdd: string) {
        if (tagToAdd.trim()) {
            const tagArray = this.post.tags.split(';').map(tag => tag.trim());
            const filteredTags = tagArray.filter(tag => tag.length > 0);
            filteredTags.push(tagToAdd.trim());
            this.post.tags = filteredTags.join('; ');
        }
    }
    protected removeTag(tagToRemove: string) {
        const tagArray = this.post.tags.split(';').map(tag => tag.trim());
        const filteredTags = tagArray.filter(tag => tag !== tagToRemove.trim());
        this.post.tags = filteredTags.join('; ');
    }
    protected cancel(event: Event) {
        event.preventDefault();
        this.router.navigate(['/main']);
    }
    protected delete(event: Event) {
        event.preventDefault();
        this.postDataService.deletePost(this.post.id as string)
            .subscribe({
                next: (resp: IBackendResponse) => {
                    if (resp.status) {
                        alert('The customer has been deleted successfully');
                        this.router.navigate(['/main']);
                    }
                    else {
                        this.errorMessage = 'Unable to delete customer';
                    }
                },
                error: (err) => {
                    console.log(err)
                },
                complete: () => {
                    // ...
                }
            });
    }
}
