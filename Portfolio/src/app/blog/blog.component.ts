import { Component } from '@angular/core';
import { BlogPost } from '../Model/blog-post.model';
import { ApiCallService } from '../service/api-call.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blogs: BlogPost[] = [];
  constructor(private _apiCallService: ApiCallService) {}
  ngOnInit(): void {
    this.loadBlogs();
  }
  loadBlogs(): void {
    this._apiCallService.getAllBlogs().subscribe(
      blogs => {
        this.blogs = blogs;
      },
      error => {
        console.error('Error loading blogs', error);
      }
    );
  }

  openBlogInNewTab(blog: BlogPost) {
    const url = `./blogDetails.html?id=${blog.id}`;
    window.open(url, '_blank');
  }
  
}
