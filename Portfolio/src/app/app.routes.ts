import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BlogComponent } from './blog/blog.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home',component:HomeComponent,pathMatch:'full'},
    {path:'about',component:AboutComponent,pathMatch:'full'},
    {path:'timeline',component:TimelineComponent,pathMatch:'full'},
    {path:'blog',component:BlogComponent,pathMatch:'full'},
    {path:'contact',component:ContactComponent,pathMatch:'full'},
    {path:'project',component:ProjectComponent,pathMatch:'full'},

]
