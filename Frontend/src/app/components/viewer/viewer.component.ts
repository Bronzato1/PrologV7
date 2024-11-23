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
    { label: 'Edit', action: () => this.edit() }
  ]
  protected post: IPost = {
    title: '...',
    content: '...',
    tags: 'aaa; bbb; ccc',
    status: 0
  }
  public override ngOnInit() {
    super.ngOnInit();
    const id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.getPost(id);
    }
  }
  private getPost(id: string) {
    this.postDataService.getPost(id)
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
    this.router.navigate(['/editor', this.post.id]);
  }
}
