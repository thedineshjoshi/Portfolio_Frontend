import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BlogPost } from '../Model/blog-post.model';
import { ProjectPost } from '../Model/project-post.model';
import { BlogComment } from '../Model/BlogComment.model';
import { Timeline } from '../Model/timeline.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private blogApiUrl = 'https://localhost:7209/api/Blogs'; // Blog API URL
  private projectApiUrl = 'https://localhost:7209/api/Projects';//Project API URL
  private imageUploadUrl = 'https://localhost:7209/api/Upload/'; // Image upload API URL
  private timelineUploadUrl = 'https://localhost:7209/api/Timeline';


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
    return this.http.get<BlogPost[]>(`${this.blogApiUrl}/GetBlog`,{responseType:'json'})
  }
  getBlogById(id: string): Observable<any> {
    return this.http.get(`${this.blogApiUrl}/GetBlogById/${id}`,{responseType:'json'})
  }
  addBlog(blogPost: BlogPost): Observable<any> {
    return this.http.post(`${this.blogApiUrl}/AddBlog`, blogPost,{responseType:'json'})
  }
  updateBlog(id: string, blogPost: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.blogApiUrl}/UpdateBlog/${id}`, blogPost,{responseType:'json'})
  }
  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.blogApiUrl}/DeleteBlog/${id}`,{responseType:'json'});
  }

  addTimeline(timeline:Timeline):Observable<any>{
    return this.http.post(`${this.timelineUploadUrl}/AddTimeline`,timeline,{responseType:'json'})
  }
  getTimeline(): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.timelineUploadUrl}/GetTimeline`,{responseType:'json'})
  }
  addComment(comment:BlogComment,blogId:string):Observable<any>
  {
    return this.http.post(`${this.blogApiUrl}/AddComment?blogId=${encodeURIComponent(blogId)}`,comment,{responseType:'json'});
  }
  getCommentsByBlogId(blogId: string): Observable<any> 
  {
    return this.http.get(`${this.blogApiUrl}/GetCommentsByBlogId/${blogId}`,{responseType:'json'});
  }
  // Projects Apis
  getAllProjects(): Observable<ProjectPost[]> {
    return this.http.get<ProjectPost[]>(`${this.projectApiUrl}/GetProject`,{responseType:'json'})
  }
  getProjectById(id: string): Observable<any> {
    return this.http.get(`${this.projectApiUrl}/GetProject/${id}`,{responseType:'json'})
  }
  addProject(projectPost: ProjectPost): Observable<any> {
    return this.http.post(`${this.projectApiUrl}/AddProject`, projectPost,{responseType:'json'})
  }
  updateProject(id: string, projectPost: ProjectPost): Observable<ProjectPost> {
    return this.http.put<ProjectPost>(`${this.projectApiUrl}/UpdateProject/${id}`, projectPost,{responseType:'json'})
  }
  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.projectApiUrl}/DeleteProject/${id}`,{responseType:'json'});
  }
}
