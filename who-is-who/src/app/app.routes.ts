import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome'; // Der neue Import für die Vorseite
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProfileSetupComponent } from './profile-setup/profile-setup';
import { SchuelerDetailComponent } from './schueler-detail/schueler-detail';
import { LehrerDetailComponent } from './lehrer-detail/lehrer-detail';
import { ProfileListComponent } from './profile-list/profile-list';

export const routes: Routes = [
  { path: '', component: WelcomeComponent }, // Keine Weiterleitung mehr, sondern die echte Vorseite!
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-setup', component: ProfileSetupComponent },
  { path: 'schueler-detail', component: SchuelerDetailComponent },
  { path: 'lehrer-detail', component: LehrerDetailComponent },
  { path: 'profiles', component: ProfileListComponent }
];
