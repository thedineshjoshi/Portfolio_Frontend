import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Adjust the path as needed
import { ApiCallService } from '../service/api-call.service';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BlogComment } from '../Model/BlogComment.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class BlogDetailsComponent implements OnInit {
  blog: any = {};
  blogId!: string;
  comments:BlogComment[]=[];
  postBlogComment: BlogComment={
    name:'',
    email:'',
    content:'',
    postedAt:new Date(),
    blogId:this.blogId
  };
  constructor(
    private route: ActivatedRoute,
    private apiCallService: ApiCallService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const blogId = params['id'];
      if (blogId) {
        this.blogId = blogId;
        this.apiCallService.getBlogById(blogId).subscribe(
          data => {
            this.blog = data;
            this.loadComments();
          },
          error => {
            console.error('Error fetching blog details:', error);
          }
        );
      }
    });
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    if (url.includes('watch?v=')) {
      url= url.replace('watch?v=', 'embed/');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  transformYouTubeUrl(url: string): string {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  }

  loadComments(): void {
    this.apiCallService.getCommentsByBlogId(this.blogId).subscribe(
      data => {
        this.comments = data;
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  resetForm() {
    this.postBlogComment = {
      name: '',
      email: '',
      content: '',
      postedAt:new Date()
    }
  }
  addComment(): void {
    this.postBlogComment.id = this.blogId;
    this.apiCallService.addComment(this.postBlogComment,this.blogId).subscribe(
      () => {
        console.log("Comment Added Successfully");
        this.loadComments();
        this.resetForm();
      },
      error => {
        console.error("Error occurred:", error);
      }
    );
  }
  
}
