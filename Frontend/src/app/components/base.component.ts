import { Directive, inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

@Directive()
export class BaseComponent implements OnInit {

    protected route = inject(ActivatedRoute);
    protected router = inject(Router);
    private location = inject(Location);

    constructor() { }

    ngOnInit(): void {
        console.log('BaseComponent initialized by ', this.constructor.name.replace(/^_/, ''));
        this.initializeWithAnimation();
    }
    /**
     * Scroll to the element with the id passed in the query parameter 'scrollTo'
     */
    initializeWithAnimation() {



        this.route.queryParams.subscribe(params => {
            const scrollTo = params['scrollTo'];
            if (scrollTo) {
                const element = document.getElementById(scrollTo);
                if (element) {
                    document.body.classList.remove("animate-out");
                    document.body.classList.add("animate-in");
                    element.scrollIntoView({ behavior: 'auto' });
                }
            } else {
                document.body.classList.remove("animate-out");
                document.body.classList.add("animate-in");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    /**
     * Navigate to the route with animation
     * @param commands - The route to navigate to
     * @param extras - The navigation extras
     */
    navigateWithAnimation(commands: any[], extras?: NavigationExtras) {
        document.body.classList.remove("animate-in");
        document.body.classList.add("animate-out");
        setTimeout(() => {
            this.router.navigate(commands, extras);
        }, 400);
    }
    protected goBack() {
        this.location.back();
    }
}
