import { Component, inject, OnInit } from '@angular/core';
import { IPost } from '@src/app/interfaces/post.interface';
import { PostDataService } from '@src/app/services/post-data-service';
import { BaseComponent } from '../base.component';
import { MenuComponent } from '../menu/menu.component';
import { BypassHtmlSanitizerPipe } from '@src/app/pipes/sanitizer.pipe';

@Component({
  standalone: true,
  selector: 'app-viewer',
  imports: [MenuComponent, BypassHtmlSanitizerPipe],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent extends BaseComponent implements OnInit {

  private postDataService = inject(PostDataService);

  protected menuItems = [
    { label: 'Edit post', action: () => this.edit() },
    { label: 'List posts', action: () => this.router.navigateByUrl('/list') }
  ]
  protected post: IPost = {
    title: '...',
    content: '...',
    tags: 'aaa; bbb; ccc',
    status: 0
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
