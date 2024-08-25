import { Component } from '@angular/core';
import { AboutComponent } from "../about/about.component";
import { TimelineComponent } from "../timeline/timeline.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, TimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
