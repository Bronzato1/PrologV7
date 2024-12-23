import { Component, inject, OnInit } from '@angular/core';
import { IPost } from '@src/app/types/post.type';
import { MenuComponent } from "../../menu/menu.component";
import { BypassHtmlSanitizerPipe } from '@src/app/pipes/sanitizer.pipe';
import { PostCategoryEnum } from '@src/app/enumerations/post-category.enumeration';
import { BaseViewerComponent } from '../../../bases/base-viewer.component';
import { ENDPOINT, GenericDataService } from '@src/app/services/generic-data-service';

@Component({
  standalone: true,
  selector: 'app-post-viewer',
  imports: [MenuComponent, BypassHtmlSanitizerPipe],
  templateUrl: './post-viewer.component.html',
  styleUrl: './post-viewer.component.scss',
  providers: [
    { provide: ENDPOINT, useValue: 'posts' }, GenericDataService,
  ]
})
export class PostViewerComponent extends BaseViewerComponent<IPost> implements OnInit {

  protected PostCategoryEnum = PostCategoryEnum;
  protected discriminant: 'post' = 'post';
  protected genericDataService = inject(GenericDataService);

  public override ngOnInit() {
    super.ngOnInit();
  }
}
