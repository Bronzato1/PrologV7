import { Directive, inject, OnInit } from "@angular/core";
import { TPost } from "@src/app/types/post.type";
import { TProject } from "@src/app/types/project.type";
import { BaseComponent } from "./base.component";
import { ENDPOINT, GenericDataService } from "@src/app/services/generic-data-service";

@Directive(
    // {
    //     providers: [
    //         { provide: ENDPOINT, useValue: 'xxxxx' }, GenericDataService,
    //     ]
    // }
)
export abstract class BaseViewerComponent<T extends TPost | TProject> extends BaseComponent implements OnInit {

    protected abstract discriminant: 'post' | 'project';
    protected abstract genericDataService: GenericDataService<T>;
    protected item: T = {
        title: '',
        content: '',
        tags: '',
        status: 0,
        category: 0
    } as T;
    protected menuItems = [
        { label: 'Edit', action: () => this.edit() }
    ]
    public override ngOnInit() {
        super.ngOnInit();
        const slug = this.route.snapshot.params['slug'];
        if (slug !== undefined) {
            this.getItem(slug);
        }
    }
    private getItem(slug: string) {
        this.genericDataService.getItemBySlug(slug)
            .subscribe({
                next: (item: T) => {
                    this.item = item;
                },
                error: (err) => {
                    console.log(err)
                },
                complete: () => {
                    // ...
                }
            });
    }
    private edit() {
        const title_ = this.item.title.toLocaleLowerCase().replace(/\s+/g, '_');
        const route = this.discriminant === 'post' ? '/editor/post' : '/editor/project';
        this.router.navigate([route, title_]);
    }
}
