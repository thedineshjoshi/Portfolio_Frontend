import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Adjust the path as needed
import { ApiCallService } from '../service/api-call.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blog: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiCallService: ApiCallService
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
}
