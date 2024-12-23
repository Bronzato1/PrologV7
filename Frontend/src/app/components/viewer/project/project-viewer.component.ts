import { Component, inject, OnInit } from '@angular/core';
import { IProject } from '@src/app/types/project.type';
import { MenuComponent } from "../../menu/menu.component";
import { BypassHtmlSanitizerPipe } from '@src/app/pipes/sanitizer.pipe';
import { ProjectCategoryEnum } from '@src/app/enumerations/project-category.enumeration';
import { BaseViewerComponent } from '../../../bases/base-viewer.component';
import { ENDPOINT, GenericDataService } from '@src/app/services/generic-data-service';

@Component({
  standalone: true,
  selector: 'app-project-viewer',
  imports: [MenuComponent, BypassHtmlSanitizerPipe],
  templateUrl: './project-viewer.component.html',
  styleUrl: './project-viewer.component.scss',
  providers: [
    { provide: ENDPOINT, useValue: 'projects' }, GenericDataService,
  ]
})
export class ProjectViewerComponent extends BaseViewerComponent<IProject> implements OnInit {

  protected ProjectCategoryEnum = ProjectCategoryEnum;
  protected discriminant: 'project' = 'project';
  protected genericDataService = inject(GenericDataService);
  
  public override ngOnInit() {
    super.ngOnInit();
  }
}
