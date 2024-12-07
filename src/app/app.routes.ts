import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { RepositoryListComponent } from './features/repository/repository-list/repository-list.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
{ path: '', component: HomeComponent },
{path: 'login' , component: LoginComponent},
{ path: 'profile', component: ProfileComponent },
{path: 'repository' , component: RepositoryListComponent},
];
