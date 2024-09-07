import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BlogPost } from '../Model/blog-post.model';
import { ProjectPost } from '../Model/project-post.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private blogApiUrl = 'https://localhost:7209/api/Blogs'; // Blog API URL
  private projectApiUrl = 'https://localhost:7209/api/Projects';//Project API URL
  private imageUploadUrl = 'https://localhost:7209/api/Upload/'; // Image upload API URL

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}
  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Headers for image upload (you might not need 'Content-Type' for FormData)
    const uploadHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post<any>(`${this.imageUploadUrl}UploadImage`, formData);
  }
  getAllBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.blogApiUrl}/GetBlog`)
  }
  getBlogById(id: string): Observable<any> {
    return this.http.get(`${this.blogApiUrl}/GetBlogById/${id}`)
  }
  addBlog(blogPost: BlogPost): Observable<any> {
    return this.http.post(`${this.blogApiUrl}/AddBlog`, blogPost)
  }
  updateBlog(id: string, blogPost: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.blogApiUrl}/UpdateBlog/${id}`, blogPost)
  }
  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.blogApiUrl}/DeleteBlog/${id}`);
  }
  // Projects Apis
  getAllProjects(): Observable<ProjectPost[]> {
    return this.http.get<ProjectPost[]>(`${this.projectApiUrl}/GetProject`)
  }
  getProjectById(id: string): Observable<any> {
    return this.http.get(`${this.projectApiUrl}/GetProject/${id}`)
  }
  addProject(projectPost: ProjectPost): Observable<any> {
    return this.http.post(`${this.projectApiUrl}/AddProject`, projectPost)
  }
  updateProject(id: string, projectPost: ProjectPost): Observable<ProjectPost> {
    return this.http.put<ProjectPost>(`${this.projectApiUrl}/UpdateProject/${id}`, projectPost)
  }
  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.projectApiUrl}/DeleteProject/${id}`);
  }
}
