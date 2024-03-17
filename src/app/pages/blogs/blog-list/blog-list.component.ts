import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../models/blog.model';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { BreadcrumbsComponent } from "../../../components/breadcrumbs/breadcrumbs.component";
import { Store } from '@ngrx/store';
import * as BlogsActions from '../blogs.actions';
@Component({
    selector: 'app-blog-list',
    standalone: true,
    templateUrl: './blog-list.component.html',
    styleUrl: './blog-list.component.scss',
    imports: [NgFor, RouterLink, DatePipe, NgIf, BreadcrumbsComponent]
})
export class BlogListComponent implements OnInit {
  private authStatusSubscription: Subscription = new Subscription();
  blogs: Blog[] = [];
  isLoggedIn: boolean = false;
  auth = inject(AuthService);
  currentUserId: string = '';
  blogsService = inject(BlogsService);
  store = inject(Store);
  loading: boolean = false;
  error: any = null;

  ngOnInit() {
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
    this.store.dispatch(BlogsActions.loadBlogs());
    this.store.select('blogs').subscribe((data: any) => {
      // console.log(data);
      this.blogs = data.blogs.posts;
      this.loading = data.loading;
      this.error = data.error;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
