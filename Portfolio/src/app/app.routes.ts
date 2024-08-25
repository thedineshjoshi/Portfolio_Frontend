import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TimelineComponent } from './timeline/timeline.component';

export const routes: Routes = [
    {path:'\home',component:HomeComponent,pathMatch:'full'},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'about',component:AboutComponent,pathMatch:'full'},
    {path:'timeline',component:TimelineComponent,pathMatch:'full'}
];
