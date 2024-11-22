import { Directive, inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Directive()
export class BaseComponent implements OnInit {
    
    protected route = inject(ActivatedRoute);
    protected router = inject(Router);

    constructor() { }

    ngOnInit(): void {
        console.log('BaseComponent initialized by ', this.constructor.name.replace(/^_/, ''));
        this.initializeWithAnimation();
    }
    /**
     * Scroll to the element with the id passed in the query parameter 'scrollTo'
     */
    initializeWithAnimation() {
        document.body.classList.remove("animate-out");
        document.body.classList.add("animate-in");

        this.route.queryParams.subscribe(params => {
            const scrollTo = params['scrollTo'];
            if (scrollTo) {
                const element = document.getElementById(scrollTo);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });  
                    }, 2000);
                }
            } else {
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
        }, 500);
    }
}
