import { Component } from '@angular/core';
import { Timeline } from '../Model/timeline.model';
import { ApiCallService } from '../service/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  timelines:Timeline[]=[];
  constructor(private _apiCallService: ApiCallService) {}
  ngOnInit(): void {
    this.loadTimeline();
  }
  loadTimeline(){
    this._apiCallService.getTimeline().subscribe(
      timelines => {
        this.timelines = timelines;
      },
      error =>{
        console.log("Error Loading");
      }
    )
  }
}
