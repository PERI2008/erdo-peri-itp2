import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
// HIER muss der echte Import hin, KEIN "let"!
import { ProfileSetupComponent } from './profile-setup/profile-setup';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-setup', component: ProfileSetupComponent }, // Jetzt zeigt es auf den echten Code
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
