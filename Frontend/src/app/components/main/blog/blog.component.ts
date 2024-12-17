import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { IPost } from "@src/app/interfaces/post.interface";
import { PostColorEnum } from "@src/app/enumerations/post-color.enumeration";
import { PostCategoryEnum } from "@src/app/enumerations/post-category.enumeration";
import { PostDataService } from "@src/app/services/post-data-service";
import { AuthenticationService } from "@src/app/services/authentication.service";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "../../base.component";

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './blog.component.html'
})
export class BlogComponent extends BaseComponent implements OnInit {

    private postDataService = inject(PostDataService);
    private authService = inject(AuthenticationService);
    protected posts: IPost[] = [];
    protected blogViewMode: 'masonry' | 'list' = 'masonry';
    protected blogSearchText: string = '';
    protected PostColorEnum = PostColorEnum;
    protected PostCategoryEnum = PostCategoryEnum;

    public override ngOnInit(): void {
        this.getPosts();
    }
    private getPosts() {
        this.postDataService.getPosts()
            .subscribe({
                next: (posts: IPost[]) => {
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
        if (!this.authService.isLoggedIn)  {
            // unauthenticated users can only view posts
            this.viewPost(title);
            return;
        }
        const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
        this.navigateWithAnimation(['/editor', title_]);
    }
    protected viewPost(title: string) {
        const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
        this.navigateWithAnimation(['/viewer', title_]);
    }
    protected getSlug(title: string) {
        return title.toLocaleLowerCase().replace(/\s+/g, '_')
    }
    protected toggleBlogView() {
        this.blogViewMode = this.blogViewMode === 'masonry' ? 'list' : 'masonry';
    }
    protected stripHtmlTags(html: string) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    get filteredPosts(): IPost[] {
        if (!this.blogSearchText) {
            return this.posts;
        }
        return this.posts.filter(post =>
            post.title.toLowerCase().includes(this.blogSearchText.toLowerCase()) ||
            post.content.toLowerCase().includes(this.blogSearchText.toLowerCase())
        );
    }
}
