import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-setup.html',
  styleUrl: './profile-setup.css'
})
export class ProfileSetupComponent implements OnInit {
  role = '';
  vorname = '';
  nachname = '';

  // Schüler-spezifische Felder (EPIP-9)
  klasse = '';
  geburtsdatum = '';

  // Lehrer-spezifische Felder (EPIP-10)
  fach = '';
  raum = '';
  istKlassenvorstand = false;

  // Allgemeines Feld
  bio = '';

  ngOnInit() {
    // Daten aus der Registrierung laden
    this.role = localStorage.getItem('userRole') || 'schueler';
    this.vorname = localStorage.getItem('registeredVorname') || '';
    this.nachname = localStorage.getItem('registeredNachname') || '';
  }

  saveProfile() {
    // Validierung je nach Rolle
    if (this.role === 'schueler') {
      if (!this.klasse.trim() || !this.geburtsdatum) {
        alert('Bitte trage deine Klasse und dein Geburtsdatum ein! ❌');
        return;
      }
    } else {
      if (!this.fach.trim() || !this.raum.trim()) {
        alert('Bitte trage dein Unterrichtsfach und deinen Raum ein! ❌');
        return;
      }
    }

    // Wenn alles passt, Bestätigung ausgeben
    alert('Profil für ' + this.vorname + ' ' + this.nachname + ' wurde erfolgreich ausgefüllt! ✅');
  }
}
