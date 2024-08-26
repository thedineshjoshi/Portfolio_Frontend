import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project } from '../Interfaces/project';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projects:Project[]=[];
  pageIndex = 0;
  pageSize = 6;

  constructor() {}

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
    // Replace this with an actual API call
    const newProjects = Array.from({ length: this.pageSize }, (_, i) => ({
      id: this.pageIndex * this.pageSize + i,
      title: `Project ${(this.pageIndex * this.pageSize + i + 1)}`,
      description: 'A brief description of the project.',
      image: '/assets/project-image.png'  // Replace with your image path
    }));

    this.projects = [...this.projects, ...newProjects];
    this.pageIndex++;
  }
}
