import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProfileSetupComponent } from './profile-setup/profile-setup';
import { SchuelerDetailComponent } from './schueler-detail/schueler-detail';
import { LehrerDetailComponent } from './lehrer-detail/lehrer-detail';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-setup', component: ProfileSetupComponent },
  { path: 'schueler-detail', component: SchuelerDetailComponent },
  { path: 'lehrer-detail', component: LehrerDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
