import { Component, inject, OnInit } from '@angular/core';
import { IPost } from '@src/app/interfaces/post.interface';
import { PostDataService } from '@src/app/services/post-data-service';
import { BaseComponent } from '../base.component';
import { MenuComponent } from '../menu/menu.component';
import { BypassHtmlSanitizerPipe } from '@src/app/pipes/sanitizer.pipe';
import { PostCategoryEnum } from '@src/app/enumerations/post-category.enumeration';

@Component({
  standalone: true,
  selector: 'app-viewer',
  imports: [MenuComponent, BypassHtmlSanitizerPipe],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent extends BaseComponent implements OnInit {

  private postDataService = inject(PostDataService);
  protected PostCategoryEnum = PostCategoryEnum;
  protected menuItems = [
    { label: 'Edit post', action: () => this.edit() }
  ]
  protected post: IPost = {
    title: '',
    content: '',
    tags: '',
    status: 0,
    category: 0
  }
  public override ngOnInit() {
    super.ngOnInit();
    const slug = this.route.snapshot.params['slug'];
    if (slug !== undefined) {
      this.getPost(slug);
    }
  }
  private getPost(slug: string) {
    this.postDataService.getPostBySlug(slug)
      .subscribe({
        next: (post: IPost) => {
          this.post = post;
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
    const title_ = this.post.title.toLocaleLowerCase().replace(/\s+/g, '_');
    this.router.navigate(['/editor', title_]);
  }
}
