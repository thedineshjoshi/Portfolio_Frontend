import { Component, OnInit } from '@angular/core';
import { AboutComponent } from "../about/about.component";
import { TimelineComponent } from "../timeline/timeline.component";
import { BlogComponent } from "../blog/blog.component";
import { ProjectComponent } from "../project/project.component";
import { ContactComponent } from "../contact/contact.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    TimelineComponent, 
    BlogComponent, 
    ProjectComponent, 
    ContactComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const hamburger = document.getElementById('hamburger') as HTMLElement;
    const nav = document.getElementById('nav') as HTMLElement;

    
      hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        const isOpen = nav.classList.contains('nav-open');
        hamburger.innerHTML = isOpen ? '&times;' : '&#9776;';
        
      });
    document.addEventListener('click', function (event) {
      const target = event.target as HTMLElement;
      if (!hamburger.contains(target) && !nav.contains(target)) {
          nav.classList.remove('nav-open');
          hamburger.innerHTML = '&#9776;';
      }
  });

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }
}
