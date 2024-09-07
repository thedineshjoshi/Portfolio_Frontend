import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project } from '../Interfaces/project';
import { ApiCallService } from '../service/api-call.service';
import { ProjectPost } from '../Model/project-post.model';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projects:ProjectPost[]=[];
  pageIndex = 0;
  pageSize = 6;

  constructor(private _apiCallService:ApiCallService) {}

  ngOnInit(): void {
    this.loadProjects();

    const container = document.getElementById('projects-container');
    if (container) {
      container.addEventListener('scroll', () => {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 50) {
          this.loadProjects();
        }
      });
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
}
