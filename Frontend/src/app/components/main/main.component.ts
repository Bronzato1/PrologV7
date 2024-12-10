import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BaseComponent } from '../base.component';
import { MenuComponent } from "../menu/menu.component";
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import adze from 'adze';
import { PostDataService } from '@src/app/services/post-data-service';
import { IPost } from '@src/app/interfaces/post.interface';

const logger = adze.namespace('MainComponent').seal();

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [MenuComponent, RouterLink],
    templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements OnInit, OnDestroy {

    private authStatusSubscription!: Subscription;
    private postDataService = inject(PostDataService);
    private authService = inject(AuthenticationService);

    protected menuItems!: { label: string; action: () => void; }[];
    protected posts: IPost[] = [];
    protected blogViewMode: 'masonry' | 'list' = 'masonry';

    constructor() {
        super();
    }
    override ngOnInit(): void {
        super.ngOnInit();
        this.authService.ngOnInit();
        this.initializeMenu();
        this.getPosts();
        this.authStatusSubscription = this.authService.getAuthStatus().subscribe(status => {
            logger.label('ngOnInit').info('Authentication status: ' + status);
            this.initializeMenu()
        });
    }
    ngOnDestroy(): void {
        if (this.authStatusSubscription) {
            this.authStatusSubscription.unsubscribe();
        }
    }
    initializeMenu() {
        this.menuItems = [];
        if (this.authService.isLoggedIn) {
            this.menuItems.push({ label: 'Logout', action: () => this.authService.logout() });
            this.menuItems.push({ label: 'Create new post', action: () => this.router.navigateByUrl('/editor/') })
        } else {
            this.menuItems.push({ label: 'Login', action: () => this.authService.loginRedirect() });
        }
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
        this.router.navigate(['/editor', title_]);
    }
    protected viewPost(title: string) {
        const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
        this.router.navigate(['/viewer', title_]);
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
}
