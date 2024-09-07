import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Adjust the path as needed
import { ApiCallService } from '../service/api-call.service';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class BlogDetailsComponent implements OnInit {
  blog: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiCallService: ApiCallService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const blogId = params['id'];
      if (blogId) {
        this.apiCallService.getBlogById(blogId).subscribe(
          data => {
            this.blog = data;
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
    return url; // Return the original URL if it doesn't need transformation
  }
  
}
