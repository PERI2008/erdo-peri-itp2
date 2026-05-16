import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  checkLogin() {
    // Die Zugangsdaten aus dem Speicher holen
    const savedEmail = localStorage.getItem('registeredEmail');
    const savedPassword = localStorage.getItem('registeredPassword');

    // Abgleich der E-Mail und des Passworts
    if (this.email.trim() === savedEmail && this.password === savedPassword) {
      this.message = 'Login erfolgreich! ✅';

      // Automatische Weiterleitung nach 1 Sekunde
      setTimeout(() => {
        this.router.navigate(['/profile-setup']);
      }, 1000);
    } else {
      this.message = 'Falsches Passwort oder E-Mail-Adresse! ❌';
    }
  }
}
