import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '@src/app/components/bases/base.component';
import { MenuComponent } from "../menu/menu.component";
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { BlogComponent } from './blog/blog.component';
import { ProjectsComponent } from "./projects/projects.component";
import adze from 'adze';
import { ProfileComponent } from "./profile/profile.component";
import { LinksComponent } from "./links/links.component";
import { AboutComponent } from "./about/about.component";

const logger = adze.namespace('MainComponent').seal();

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, FormsModule, MenuComponent, BlogComponent, ProjectsComponent, ProfileComponent, LinksComponent, AboutComponent],
    templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements OnInit, OnDestroy {

    private authStatusSubscription!: Subscription;
    private authService = inject(AuthenticationService);

    protected menuItems!: { label: string; action: () => void; }[];

    constructor() {
        super();
    }
    override ngOnInit(): void {
        super.ngOnInit();
        this.authService.ngOnInit();
        this.initializeMenu();
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
            this.menuItems.push({ label: 'Create new post', action: () => this.router.navigateByUrl('/editor/post/') });
            this.menuItems.push({ label: 'Create new project', action: () => this.router.navigateByUrl('/editor/project/') })
        } else {
            this.menuItems.push({ label: 'Login', action: () => this.authService.loginRedirect() });
        }
    }
}
