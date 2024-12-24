import { AfterViewInit, Component, Directive, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppComponent } from '@src/app/app.component';
import { TPost } from '@src/app/types/post.type';
import { TProject } from '@src/app/types/project.type';
import { AlertService } from '@src/app/services/alert.service';
import { Observable } from 'rxjs';
import {
    ClassicEditor,
    GeneralHtmlSupport,
    Bold,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
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

import { BaseComponent } from '@src/app/bases/base.component';
import { AlertTypeEnum } from '@src/app/enumerations/alert-type.enumeration';
import { UploadAdapterPlugin } from '@src/app/services/upload-adapter';
import { FileRepository } from '@ckeditor/ckeditor5-upload';
import { InjectionToken } from '@angular/core';
import { ENDPOINT, GenericDataService } from '@src/app/services/generic-data-service';
import { IBackendResponse } from '../interfaces/backend-response.interface';

@Directive()
export abstract class BaseEditorComponent<T extends TPost | TProject> extends BaseComponent implements OnInit {

    @ViewChild('resumeEditor') resumeEditor?: ElementRef;

    protected abstract discriminant: 'post' | 'project';
    protected abstract genericDataService: GenericDataService<T>;
    private alertService = inject(AlertService);
    protected editor = ClassicEditor;
    protected errorMessage = '';
    protected deleteMessageEnabled = false;
    protected operationText = 'Insert';
    protected item: T = {
        id: 0,
        title: '',
        content: '',
        tags: '',
        status: 0,
        category: 0
    } as T;
    protected menuItems = [
        { label: 'Save', action: () => this.submit() },
        { label: 'View', action: () => this.viewItem() }
    ]
    public config = {
        htmlSupport: {
            allow: [{
                name: /.*/,
                attributes: /.*/,
                classes: /.*/,
                styles: /.*/
            }],
            disallow: [ /* HTML features to disallow. */]
        },
        toolbar: [
            'undo', 'redo', '|',
            'heading', '|', 'bold', 'italic', 'underline', '|',
            'link', 'mediaEmbed', 'uploadImage', 'codeBlock', 'highlight', 'htmlEmbed', 'sourceEditing', '|',
            'bulletedList', 'numberedList', 'indent', 'outdent'
        ],
        plugins: [
            GeneralHtmlSupport,
            Bold,
            Essentials,
            Heading,
            Image,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
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
            UploadAdapterPlugin
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
        const slug = this.route.snapshot.params['slug?'];
        if (slug !== undefined) {
            this.operationText = 'Update';
            this.getItem(slug).subscribe(() => {
                // ...
            });
        }
    }
    protected submit() {
        if (this.item.id) {
            // ....
            this.item.content = this.item.content.replace('<div class="close-button"></div>', '<button class="close-button" aria-label="Dismiss alert" type="button" data-close=""><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 3.44 3.44"><path fill="#000" fill-rule="evenodd" d="M3.23.59L2.096 1.717 3.23 2.85c.103.104.103.273 0 .38-.106.102-.274.102-.38 0L1.72 2.096.588 3.23c-.104.102-.273.102-.377 0-.102-.107-.102-.276 0-.38l1.134-1.13L.21.588C.108.484.108.315.21.21.316.107.485.107.59.21l1.13 1.133L2.85.21c.106-.103.274-.103.38 0 .103.104.103.273 0 .38z" clip-rule="evenodd"></path></svg></span></button>');

            // Updating the post 
            this.genericDataService.updateItem({ ...this.item, id: Number(this.item.id) })
                .subscribe({
                    next: (item: T) => {
                        if (item) {
                            this.alertService.showAlert({
                                title: 'UPDATE',
                                type: AlertTypeEnum.success,
                                message: 'The item has been updated successfully'
                            });
                            this.router.navigateByUrl('/list');
                        } else {
                            this.errorMessage = 'Unable to save customer';
                        }
                    },
                    error: (err: any) => {
                        console.log(err)
                    },
                    complete: () => {
                        // ...
                    }
                });
        } else {
            //* Creating the post
            this.genericDataService.insertItem({ ...this.item, id: Number(this.item.id) })
                .subscribe({
                    next: (item: T) => {
                        if (item) {
                            this.alertService.showAlert({
                                title: 'CREATE',
                                type: AlertTypeEnum.success,
                                message: 'The item has been added successfully'
                            });
                            this.router.navigate(['/main']);
                        }
                        else {
                            this.errorMessage = 'Unable to add customer';
                        }
                    },
                    error: (err: any) => {
                        console.log(err)
                    },
                    complete: () => {
                        // ...
                    }
                });
        }
    }
    private getItem(slug: string): Observable<TPost> {
        const itemObservable = this.genericDataService.getItemBySlug(slug);
        itemObservable.subscribe({
            next: (item: T) => {
                this.item = item;
            },
            error: (err: any) => {
                console.log(err)
            },
            complete: () => {
                // ...
            }
        });
        return itemObservable;
    }
    private viewItem() {
        const title_ = this.item.title.toLocaleLowerCase().replace(/\s+/g, '_');
        const route = this.discriminant === 'post' ? '/viewer/post' : '/viewer/project';
        this.router.navigate([route, title_]);
    }
    protected addTag(tagToAdd: string) {
        if (tagToAdd.trim()) {
            const tagArray = this.item.tags.split(';').map(tag => tag.trim());
            const filteredTags = tagArray.filter(tag => tag.length > 0);
            filteredTags.push(tagToAdd.trim());
            this.item.tags = filteredTags.join('; ');
        }
    }
    protected removeTag(tagToRemove: string) {
        const tagArray = this.item.tags.split(';').map(tag => tag.trim());
        const filteredTags = tagArray.filter(tag => tag !== tagToRemove.trim());
        this.item.tags = filteredTags.join('; ');
    }
    protected cancel(event: Event) {
        event.preventDefault();
        this.router.navigate(['/main']);
    }
    protected delete(event: Event) {
        event.preventDefault();
        this.genericDataService.deleteItem(this.item.id)
            .subscribe({
                next: (resp: IBackendResponse<T>) => {
                    if (resp.status) {
                        alert('The item has been deleted successfully');
                        this.router.navigate(['/main']);
                    }
                    else {
                        this.errorMessage = 'Unable to delete the item';
                    }
                },
                error: (err: any) => {
                    console.log(err)
                },
                complete: () => {
                    // ...
                }
            });
    }
}
