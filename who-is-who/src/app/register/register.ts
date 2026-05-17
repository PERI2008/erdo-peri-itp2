import { Component, inject, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
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

  async goToStepTwo() {
    // 1. Pflichtfelder-Check
    if (!this.vorname.trim() || !this.nachname.trim() || !this.email.trim() || !this.password.trim()) {
      this.showNotification('Bitte alle Felder vollständig ausfüllen!', 'error');
      return;
    }

    // 2. Strenger E-Mail-Format-Check (Verhindert Quatsch-Eingaben ohne @ oder Punkt)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.showNotification('Bitte eine gültige E-Mail-Adresse eingeben (z.B. name@htl.at)!', 'error');
      return;
    }

    try {
      const userDocRef = doc(this.firestore, 'profile', this.email.trim().toLowerCase());
      const userDocSnap = await getDoc(userDocRef);

      // 3. E-Mail-Existenz-Check in Firestore
      if (userDocSnap.exists()) {
        this.showNotification('Diese E-Mail-Adresse ist bereits registriert!', 'error');
        return;
      }

      // Daten im Browser zwischenspeichern
      localStorage.setItem('registeredVorname', this.vorname.trim());
      localStorage.setItem('registeredNachname', this.nachname.trim());
      localStorage.setItem('registeredEmail', this.email.trim().toLowerCase());
      localStorage.setItem('registeredPassword', this.password);
      localStorage.setItem('userRole', this.role);
      localStorage.setItem('currentUserEmail', this.email.trim().toLowerCase());

      this.showNotification('Registrierung erfolgreich! Weiterleitung...', 'success');

      // Zuverlässiger Seitenwechsel ohne Einfrieren
      setTimeout(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/profile-setup']);
        });
      }, 1500);

    } catch (error) {
      this.showNotification('Fehler bei der Datenbank-Verbindung!', 'error');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
