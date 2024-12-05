import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../base.component';
import { PostDataService } from '@src/app/services/post-data-service';
import { AuthenticationService } from '@src/app/services/authentication.service';
import { IPost } from '@src/app/interfaces/post.interface';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {

  private postDataService = inject(PostDataService);
  private authService = inject(AuthenticationService);

  protected menuItems = [
    { label: 'Logout', action: () => this.authService.logout() },
    { label: 'Create new post', action: () => this.router.navigateByUrl('/editor/') }
  ]
  protected posts: IPost[]  = [];

  public override ngOnInit() {
    super.ngOnInit();
    this.getPosts();
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
    const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
    this.router.navigate(['/editor', title_]);
  }
  protected viewPost(title: string) {
    const title_ = title.toLocaleLowerCase().replace(/\s+/g, '_');
    this.router.navigate(['/viewer', title_]);
}
}
