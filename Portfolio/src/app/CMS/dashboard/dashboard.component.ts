import { Component, OnInit, OnDestroy } from '@angular/core';
import Quill from 'quill';
import { BlogPost } from '../../Model/blog-post.model';
import { ApiCallService } from '../../service/api-call.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule,RouterLink]
})
export class DashboardComponent implements OnInit, OnDestroy {
  blogs: BlogPost[] = [];
  editor: any;
  selectedFile: File | null = null;
  blogPost: BlogPost = {
    title: '',
    metaDescription: '',
    content: '',
    featuredImageUrl: '',
    blogImages: [],
    youtubeVideoLink: ''
  };

  constructor(private _apiCallService: ApiCallService, private http: HttpClient) {}

  ngOnInit(): void {
    this.setupEventListeners();
    this.loadBlogs();
    this.initializeQuillEditor();
  }

  ngOnDestroy(): void {
  }

  initializeQuillEditor() {
    const toolbarOptions = [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['image'],
      [{ 'align': [] }],
      ['link']
    ];

    this.editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            image: () => this.customImageHandler()
          }
        }
      }
    });
  }

  customImageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        this.uploadImage(file);
      }
    };
  }

  private setupEventListeners(): void {
    const modal = document.getElementById('addBlogModal') as HTMLDivElement;
    const btn = document.getElementById('addBlogBtn') as HTMLButtonElement;
    const span = document.querySelector('.close') as HTMLSpanElement;
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
    });

    // Close modal on close button click
    span.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    window.addEventListener('click', (event: MouseEvent) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  if (file) {
    // Upload the selected file
    this._apiCallService.uploadImage(file).subscribe(
      (response: any) => {
        this.blogPost.featuredImageUrl = response.url; // Store the image URL
        console.log('Image uploaded successfully:', response.url);
      },
      (error) => {
        console.error('Failed to upload featured image:', error);
      }
    );
  }
  }

  uploadImage(file: File) {
    this._apiCallService.uploadImage(file).subscribe(
      (response: any) => {
        if (this.editor) {
          const range = this.editor.getSelection();
          if (range) {
            const imageUrl = response.url;
            this.editor.insertEmbed(range.index, 'image', imageUrl);
            this.blogPost.blogImages = this.blogPost.blogImages || [];
            this.blogPost.blogImages.push({ imageUrl, description: '' });
          } else {
            console.warn('No selection range found in the editor.');
          }
        } else {
          console.error('Editor is not initialized.');
        }
      },
      (error) => {
        console.error('Image upload failed:', error);
      }
    );
  }
  
  

  addBlog() {
    this.blogPost.content = this.editor.root.innerHTML;
    if (this.blogPost.blogImages.length === 0) {
      alert('Please upload images before submitting the blog.');
      return;
    }
    this._apiCallService.addBlog(this.blogPost).subscribe(
      res => {
        console.log('Blog added successfully', res);
        this.loadBlogs(); 
        this.resetForm(); 
      },
      error => {
        console.error('Failed to add blog', error);
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

  private resetForm() {
    this.blogPost = {
      title: '',
      metaDescription: '',
      content: '',
      featuredImageUrl: '',
      blogImages: [],
      youtubeVideoLink: ''
    };
    if (this.editor) {
      this.editor.setContents([]);
    }

    const modal = document.getElementById('addBlogModal') as HTMLDivElement;
    modal.style.display = 'none'; 
  }
}
