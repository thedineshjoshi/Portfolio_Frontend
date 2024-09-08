import { Component } from '@angular/core';
import { BlogPost } from '../../Model/blog-post.model';
import { ApiCallService } from '../../service/api-call.service';
import Quill from 'quill';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule,RouterLink]
})
export class ManageBlogsComponent {
  blogs: BlogPost[] = [];
  editor: any;
  blogPost: BlogPost = {
    title: '',
    metaDescription: '',
    content: '',
    createdAt:new Date(),
    updatedAt:new Date(),
    label:'',
    featuredImageUrl: '',
    youtubeVideoLink: '',
    blogImages: []
  };
  isEditMode: boolean = false;

  constructor(private _apiCallService: ApiCallService) {}

  ngOnInit(): void {
    this.loadBlogs();
    this.initializeQuillEditor();
  }

  openAddBlogModal() {
    this.isEditMode = false;
    this.blogPost = {
      title: '',
      metaDescription: '',
      content: '',
      featuredImageUrl: '',
      youtubeVideoLink: '',
      createdAt:new Date(),
      updatedAt:new Date(),
      label:'',
      blogImages: []
    };
    this.openModal();
  }

  openEditBlogModal(blog: BlogPost) {
    this.isEditMode = true;
    this.blogPost = { ...blog };
    this.openModal();

    // Set the Quill editor content
    if (this.editor && this.blogPost.content) {
      this.editor.root.innerHTML = this.blogPost.content;
    }
  }

  submitBlog() {
    // Get the latest content from the Quill editor
    this.blogPost.content = this.editor.root.innerHTML;

    if (this.isEditMode) {
      this.updateBlog();
    } else {
      this.addBlog();
    }
  }

  updateBlog() {
    this._apiCallService.updateBlog(this.blogPost.id!, this.blogPost).subscribe(
      () => {
        this.loadBlogs();
        this.closeModal();
      },
      (error) => console.error('Failed to update blog', error)
    );
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

  closeModal() {
    const modal = document.getElementById('addEditBlogModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openModal() {
    const modal = document.getElementById('addEditBlogModal');
    if (modal) {
      modal.style.display = 'block';

      // Initialize or focus the editor when the modal opens
      if (!this.editor) {
        this.initializeQuillEditor();
      } else {
        this.editor.focus();
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      this._apiCallService.uploadImage(file).subscribe(
        (response: any) => {
          this.blogPost.featuredImageUrl = response.url;
          console.log('Image uploaded successfully:', response.url);
        },
        (error) => console.error('Failed to upload featured image:', error)
      );
    }
  }
  

  customImageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // Trigger file picker dialog
  
    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        this.uploadImage(file);  // Upload the image after selection
      }
    };
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

  // Confirm and delete a blog
  confirmDelete(id: string) {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this._apiCallService.deleteBlog(id).subscribe(
        () => {
          this.loadBlogs();
        },
        (error) => console.error('Failed to delete blog', error)
      );
    }
  }
  addBlog() {
    this._apiCallService.addBlog(this.blogPost).subscribe(
      () => {
        this.loadBlogs(); // Refresh blogs list
        this.closeModal();
      },
      (error) => console.error('Failed to add blog', error)
    );
  }
}
