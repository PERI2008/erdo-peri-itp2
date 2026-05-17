import { Component, inject, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private firestore = inject(Firestore);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  vorname = '';
  nachname = '';
  email = '';
  password = '';
  role = 'schueler';

  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    setTimeout(() => { this.notificationMessage = ''; }, 3000);
  }

  async login() {
    if (!this.vorname.trim() || !this.nachname.trim() || !this.email.trim() || !this.password.trim()) {
      this.showNotification('Bitte alle Felder ausfüllen!', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.showNotification('Bitte eine gültige E-Mail-Adresse eingeben!', 'error');
      return;
    }

    try {
      const userDocRef = doc(this.firestore, 'profile', this.email.trim().toLowerCase());
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const dbData = userDocSnap.data();

        // Sicherheitsüberprüfungen gegen die Cloud-Datenbank
        if (dbData['password'] !== this.password) {
          this.showNotification('Falsches Passwort!', 'error');
          return;
        }
        if (dbData['vorname'].toLowerCase() !== this.vorname.trim().toLowerCase() ||
          dbData['nachname'].toLowerCase() !== this.nachname.trim().toLowerCase()) {
          this.showNotification('Name stimmt nicht mit E-Mail-Konto überein!', 'error');
          return;
        }
        if (dbData['role'] !== this.role) {
          this.showNotification('Falsche Rolle (Schüler/Lehrer) ausgewählt!', 'error');
          return;
        }

        localStorage.setItem('currentUserEmail', this.email.trim().toLowerCase());
        this.showNotification('Anmeldung erfolgreich!', 'success');

        setTimeout(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/profiles']);
          });
        }, 1500);

      } else {
        this.showNotification('Konto nicht gefunden! Bitte registrieren.', 'error');
      }
    } catch (error) {
      this.showNotification('Fehler bei der Anmeldung!', 'error');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
