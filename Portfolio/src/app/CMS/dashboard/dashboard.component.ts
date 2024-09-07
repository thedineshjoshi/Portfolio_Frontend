import { Component, OnInit, OnDestroy } from '@angular/core';
import Quill from 'quill';
import { BlogPost } from '../../Model/blog-post.model';
import { ApiCallService } from '../../service/api-call.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ProjectPost } from '../../Model/project-post.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule,RouterLink]
})
export class DashboardComponent implements OnInit, OnDestroy {
  blogs: BlogPost[] = [];
  projects:ProjectPost[]=[];
  blogPost: BlogPost = {
    title: '',
    metaDescription: '',
    content: '',
    featuredImageUrl: '',
    blogImages: [],
    youtubeVideoLink: ''
  };

  constructor(private _apiCallService: ApiCallService, private http: HttpClient) {}
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.loadBlogs();
    this.loadProjects();
  }
  
  loadProjects(): void {
    this._apiCallService.getAllProjects().subscribe(
      projects => {
        this.projects = projects;
      },
      error => {
        console.error('Error loading projects', error);
      }
    );
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
}
