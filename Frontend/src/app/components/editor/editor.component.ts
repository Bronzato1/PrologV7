import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppComponent } from '@src/app/app.component';
import { IBackendResponse, IPost } from '@src/app/interfaces/post.interface';
import { PostDataService } from '@src/app/services/post-data-service';
import { AlertService } from '@src/app/services/alert.service';
import { Observable } from 'rxjs';
import {
    ClassicEditor,
    GeneralHtmlSupport,
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
    CodeBlock,
    Highlight,
    HtmlEmbed,
    SourceEditing,
    Editor,
    EditorUI,
    EditorUIView,
    View
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

    @ViewChild('resumeEditor') resumeEditor?: ElementRef;

    protected editor = ClassicEditor;
    protected errorMessage = '';
    protected deleteMessageEnabled = false;
    protected operationText = 'Insert';
    private postDataService = inject(PostDataService);
    private alertService = inject(AlertService);

    protected menuItems = [
        { label: 'Save', action: () => this.submit() }
    ]
    protected post: IPost = {
        title: '...',
        content: '...',
        tags: 'aaa; bbb; ccc',
        status: 0
    }
    public config = {
        htmlSupport: {
            allow: [ {
                name: /.*/,
                attributes: /.*/,
                classes: /.*/,
                styles: /.*/
            } ],
            disallow: [ /* HTML features to disallow. */ ]
        },
        toolbar: [
            'undo', 'redo', '|',
            'heading', '|', 'bold', 'italic', 'underline', '|',
            'link', 'mediaEmbed', 'codeBlock', 'highlight', 'htmlEmbed', 'sourceEditing', '|',
            'bulletedList', 'numberedList', 'indent', 'outdent'
        ],
        plugins: [
            GeneralHtmlSupport,
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
            CodeBlock,
            Highlight,
            HtmlEmbed,
            SourceEditing
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
            this.getPost(id).subscribe(() => {
                // ...
            });
        }
    }
    protected submit() {
        if (this.post.id) {

            // ....
            this.post.content = this.post.content.replace('<div class="close-button"></div>', '<button class="close-button" aria-label="Dismiss alert" type="button" data-close=""><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 3.44 3.44"><path fill="#000" fill-rule="evenodd" d="M3.23.59L2.096 1.717 3.23 2.85c.103.104.103.273 0 .38-.106.102-.274.102-.38 0L1.72 2.096.588 3.23c-.104.102-.273.102-.377 0-.102-.107-.102-.276 0-.38l1.134-1.13L.21.588C.108.484.108.315.21.21.316.107.485.107.59.21l1.13 1.133L2.85.21c.106-.103.274-.103.38 0 .103.104.103.273 0 .38z" clip-rule="evenodd"></path></svg></span></button>');

            // Updating the post 
            this.postDataService.updatePost(this.post)
                .subscribe({
                    next: (post: IPost) => {
                        if (post) {
                            this.alertService.showAlert({
                                title: 'UPDATE',
                                type: AlertType.success,
                                message: 'The post has been updated successfully'
                            });
                            this.router.navigate(['/viewer', this.post.id]);
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
    private getPost(id: string): Observable<IPost> {
        const postObservable = this.postDataService.getPost(id);
        postObservable.subscribe({
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
        return postObservable;
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
