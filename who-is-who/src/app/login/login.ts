import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  checkLogin() {
    // Daten aus dem Speicher holen
    const savedEmail = localStorage.getItem('registeredEmail');
    const savedPassword = localStorage.getItem('registeredPassword');

    // Prüfen, ob die Eingabe mit der Registrierung übereinstimmt
    if (this.email === savedEmail && this.password === savedPassword) {
      this.message = 'Login erfolgreich! ✅';
      // Hier könntest du jetzt zur Personenliste weiterleiten
    } else {
      this.message = 'Falsche E-Mail oder Passwort! ❌';
    }
  }
}
