import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BlogPost } from '../Model/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private blogApiUrl = 'https://localhost:7209/api/Blogs'; // Blog API URL
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
  
}
