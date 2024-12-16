import { Component } from '@angular/core';
import { ApiCallService } from '../../service/api-call.service';
import { Timeline } from '../../Model/timeline.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-timeline',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './manage-timeline.component.html',
  styleUrl: './manage-timeline.component.css'
})
export class ManageTimelineComponent {
  timelines:Timeline = {
    icon_Url:'',
    start_Date:'',
    completed_Date:'',
    description:'',
    label:''
  }
  constructor(private apiCallService:ApiCallService){}
  addTimeline(){

    this.apiCallService.addTimeline(this.timelines).subscribe(
      ()=>{
        alert("Timeline added successfully.");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
