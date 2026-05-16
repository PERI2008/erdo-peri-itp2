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
  vorname = '';
  nachname = '';
  email = '';
  password = '';
  role = 'schueler';

  constructor(private router: Router) {}

  goToStepTwo() {
    if (!this.vorname.trim() || !this.nachname.trim() || !this.email.trim() || !this.password.trim()) {
      alert('Bitte alle Felder vollständig ausfüllen!');
      return;
    }

    localStorage.setItem('registeredVorname', this.vorname);
    localStorage.setItem('registeredNachname', this.nachname);
    localStorage.setItem('registeredEmail', this.email);
    localStorage.setItem('registeredPassword', this.password);
    localStorage.setItem('userRole', this.role);

    this.router.navigate(['/profile-setup']);
  }
}
