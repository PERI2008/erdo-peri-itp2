import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  role = 'schueler';

  constructor(private router: Router) {}

  goToStepTwo() {
    // E-Mail, Passwort und Rolle im Browser speichern
    localStorage.setItem('registeredEmail', this.email);
    localStorage.setItem('registeredPassword', this.password);
    localStorage.setItem('userRole', this.role);

    this.router.navigate(['/profile-setup']);
  }
}
