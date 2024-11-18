import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base.component';
import { MenuComponent } from "../menu/menu.component";
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import adze from 'adze';

const logger = adze.namespace('MainComponent').seal();

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [MenuComponent],
    templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements OnInit, OnDestroy {

    private authStatusSubscription!: Subscription;

    menuItems!: { label: string; action: () => void; }[];

    constructor(private authService: AuthenticationService) {
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
            this.menuItems.push({ label: 'Create new post', action: () => this.router.navigateByUrl('/editor/0') });
        } else {
            this.menuItems.push({ label: 'Login', action: () => this.authService.loginRedirect() });
        }
    }
}
