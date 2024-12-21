import { Component, HostBinding, inject, OnDestroy, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IPost } from "@src/app/interfaces/post.interface";
import { ProjectCategoryEnum } from "@src/app/enumerations/project-category.enumeration";
import { ENDPOINT, GenericDataService } from "@src/app/services/generic-data-service";
import { AuthenticationService } from "@src/app/services/authentication.service";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseComponent } from "@src/app/components/base/base.component";
import { IProject } from "@src/app/interfaces/project.interface";

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './projects.component.html',
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
        { provide: ENDPOINT, useValue: 'projects' }, GenericDataService,
    ]
})
export class ProjectsComponent extends BaseComponent implements OnInit {

    private genericDataService = inject(GenericDataService);
    private authService = inject(AuthenticationService);
    protected projects: IProject[] = [];
    protected projectsFilterCategoryVisible: boolean = false;
    protected projectsFilterCategory?: number;
    protected projectsFilterText: string = '';
    protected ProjectCategoryEnum = ProjectCategoryEnum;

    public override ngOnInit(): void {
        this.getProjects();
    }
    private getProjects() {
        this.genericDataService.getItems()
            .subscribe({
                next: (projects: IProject[]) => {
                    this.projects = projects;
                },
                error: (err) => {
                    console.log(err)
                },
                complete: () => {
                    // ...
                }
            });
    }
    protected editProject(title: string) {
        if (!this.authService.isLoggedIn) {
            // unauthenticated users can only view posts
            this.viewProject(title);
            return;
        }
        const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
        this.navigateWithAnimation(['/editor/project/', title_]);
    }
    protected viewProject(title: string) {
        const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
        this.navigateWithAnimation(['/viewer/project/', title_]);
    }
    protected getSlug(title: string) {
        return title.toLocaleLowerCase().replace(/\s+/g, '_')
    }
    protected toggleProjectsFilterView() {
        this.projectsFilterCategoryVisible = !this.projectsFilterCategoryVisible;
        if (!this.projectsFilterCategoryVisible) this.projectsFilterCategory = undefined;
    }
    protected stripHtmlTags(html: string) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    get filteredProjects(): IPost[] {
        var projects = this.projects;
        if (this.projectsFilterText) {
            projects = projects.filter(project =>
                project.title.toLowerCase().includes(this.projectsFilterText.toLowerCase()) ||
                project.content.toLowerCase().includes(this.projectsFilterText.toLowerCase())
            );
        }
        console.log(this.projectsFilterCategory);
        if (this.projectsFilterCategory) {
            console.log('filtering');
            projects = projects.filter(project => project.category == this.projectsFilterCategory!);
        }
        return projects;
    }
}
