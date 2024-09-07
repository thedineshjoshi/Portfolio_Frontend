import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectPost } from '../../Model/project-post.model';
import { ApiCallService } from '../../service/api-call.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manageprojects',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './manageprojects.component.html',
  styleUrl: './manageprojects.component.css'
})
export class ManageprojectsComponent {
  projects:ProjectPost[]=[];
  projectPost: ProjectPost = {
    title: '',
    description: '',
    featuredImageUrl: '',
    link: ''
  };
  isEditMode: boolean = false;
  constructor(private _apiCallService: ApiCallService) {}

  ngOnInit(): void {
    this.loadProjects();
  }
  openAddProjectModal() {
    this.isEditMode = false;
    this.projectPost = {
      title: '',
      description: '',
      featuredImageUrl: '',
      link: ''
    };
    this.openModal();
  }

  openEditProjectModal(blog: ProjectPost) {
    this.isEditMode = true;
    this.projectPost = { ...blog };
    this.openModal();
  }

  submitProject() {
    if (this.isEditMode) {
      this.updateProject();
    } else {
      this.addProject();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  if (file) {
    this._apiCallService.uploadImage(file).subscribe(
      (response: any) => {
        this.projectPost.featuredImageUrl = response.url;
        console.log('Image uploaded successfully:', response.url);
      },
      (error) => {
        console.error('Failed to upload featured image:', error);
      }
    );
  }
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
  addProject() {
    this._apiCallService.addProject(this.projectPost).subscribe(
      () => {
        this.loadProjects();
        this.closeModal();
      },
      (error) => console.error('Failed to add project', error)
    );
  }

  closeModal() {
    const modal = document.getElementById('addprojectModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.resetForm();
  }

  openModal() {
    const modal = document.getElementById('addprojectModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  private resetForm() {
    this.projectPost = {
      title: '',
      description: '',
      featuredImageUrl: '',
      link: ''
    };
    const modal = document.getElementById('addProjectModal') as HTMLDivElement;
    modal.style.display = 'none'; 
  }

  confirmDelete(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this._apiCallService.deleteProject(id).subscribe(
        () => {
          this.loadProjects();
        },
        (error) => console.error('Failed to delete project', error)
      );
    }
  }

  updateProject() {
    this._apiCallService.updateProject(this.projectPost.id!, this.projectPost).subscribe(
      () => {
        this.loadProjects();
        this.closeModal();
      },
      (error) => console.error('Failed to update blog', error)
    );
  }
}
