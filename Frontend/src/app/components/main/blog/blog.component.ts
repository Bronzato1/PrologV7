import { Component, HostBinding, inject, OnDestroy, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TPost } from "@src/app/types/post.type";
import { PostCategoryEnum } from "@src/app/enumerations/post-category.enumeration";
import { ENDPOINT, GenericDataService } from "@src/app/services/generic-data-service";
import { AuthenticationService } from "@src/app/services/authentication.service";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "@src/app/bases/base.component";

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './blog.component.html',
    animations: [
        trigger('toggleSelect', [
            state('hidden', style({
                opacity: 0,
                width: '0px',
                padding: '0px',
                border: '0px solid #ccc',
                overflow: 'hidden'
            })),
            state('visible', style({
                opacity: 1,
                width: '*'
            })),
            transition('hidden <=> visible', [
                animate('300ms ease-in-out')
            ])
        ])
    ],
    providers: [
        { provide: ENDPOINT, useValue: 'posts' }, GenericDataService,
    ]
})
export class BlogComponent extends BaseComponent implements OnInit {

    private genericDataService = inject(GenericDataService);
    private authService = inject(AuthenticationService);
    protected posts: TPost[] = [];
    protected blogFilterCategoryVisible: boolean = false;
    protected blogFilterCategory?: number;
    protected blogFilterText: string = '';
    protected PostCategoryEnum = PostCategoryEnum;

    public override ngOnInit(): void {
        this.getPosts();
    }
    private getPosts() {
        this.genericDataService.getItems()
            .subscribe({
                next: (posts: TPost[]) => {
                    this.posts = posts;
                },
                error: (err) => {
                    console.log(err)
                },
                complete: () => {
                    // ...
                }
            });
    }
    protected editPost(title: string) {
        if (!this.authService.isLoggedIn) {
            // unauthenticated users can only view posts
            this.viewPost(title);
            return;
        }
        const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
        this.navigateWithAnimation(['/editor/post/', title_]);
    }
    protected viewPost(title: string) {
        const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
        this.navigateWithAnimation(['/viewer/post/', title_]);
    }
    protected getSlug(title: string) {
        return title.toLocaleLowerCase().replace(/\s+/g, '_')
    }
    protected toggleBlogFilterView() {
        this.blogFilterCategoryVisible = !this.blogFilterCategoryVisible;
        if (!this.blogFilterCategoryVisible) this.blogFilterCategory = undefined;
    }
    protected stripHtmlTags(html: string) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    get filteredPosts(): TPost[] {
        var posts = this.posts;
        if (this.blogFilterText) {
            posts = posts.filter(post =>
                post.title.toLowerCase().includes(this.blogFilterText.toLowerCase()) ||
                post.content.toLowerCase().includes(this.blogFilterText.toLowerCase())
            );
        }
        console.log(this.blogFilterCategory);
        if (this.blogFilterCategory) {
            console.log('filtering');
            posts = posts.filter(post => post.category == this.blogFilterCategory!);
        }
        return posts;
    }
}
