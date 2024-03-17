import { Component, inject } from '@angular/core';
import { Tags } from '../../../models/blog.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from "../../../components/breadcrumbs/breadcrumbs.component";
import { Store } from '@ngrx/store';
import { TagsService } from '../tags.service';
@Component({
    selector: 'app-tag-list',
    standalone: true,
    templateUrl: './tag-list.component.html',
    styleUrl: './tag-list.component.scss',
    imports: [NgFor, RouterLink, BreadcrumbsComponent]
})
export class TagListComponent {
  
  tags: Tags = [];

  tagsService = inject(TagsService);
  store = inject(Store);

  constructor() {}

  ngOnInit() {
    this.tagsService.getTags().subscribe((data: any) => {
      this.tags = data;
      // console.log(this.tags);
    });
  }
}
