import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BlogComponent } from './blog/blog.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './CMS/login/login.component';
import { DashboardComponent } from './CMS/dashboard/dashboard.component';
import { ManageBlogsComponent } from './CMS/manage-blogs/manage-blogs.component';
import { ManageprojectsComponent } from './CMS/manageprojects/manageprojects.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { AuthguardService } from './service/authguard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home',component:HomeComponent,pathMatch:'full'},
    {path:'about',component:AboutComponent,pathMatch:'full'},
    {path:'timeline',component:TimelineComponent,pathMatch:'full'},
    {path:'blog',component:BlogComponent,pathMatch:'full'},
    {path:'contact',component:ContactComponent,pathMatch:'full'},
    {path:'project',component:ProjectComponent,pathMatch:'full'},
    {path:'login',component:LoginComponent,pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent,pathMatch:'full',canActivate:[AuthguardService]},
    {path:'project',component:ProjectComponent,pathMatch:'full'},
    {path:'dashboard/manageblog',component:ManageBlogsComponent,pathMatch:'full',canActivate:[AuthguardService]},
    {path:'dashboard/manageproject',component:ManageprojectsComponent,pathMatch:'full',canActivate:[AuthguardService]},
    { path: 'blog-details', component: BlogDetailsComponent }
]
