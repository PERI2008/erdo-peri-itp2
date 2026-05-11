import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProfileSetupComponent } from './profile-setup/profile-setup'; // Neu importieren

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-setup', component: ProfileSetupComponent }, // Neue Route
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
