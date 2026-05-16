import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 👈 Importiert für die Weiterleitung

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

  // Variable für das Profilbild als Base64-String
  profilbild = '';

  // Schüler-Felder (EPIP-9)
  klasse = '';
  geburtsdatum = '';

  // Lehrer-Felder (EPIP-10)
  fach = '';
  raum = '';
  istKlassenvorstand = false;

  // Gemeinsames Feld
  bio = '';

  // 👈 Router im Constructor injizieren
  constructor(private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('userRole') || 'schueler';
    this.vorname = localStorage.getItem('registeredVorname') || '';
    this.nachname = localStorage.getItem('registeredNachname') || '';
  }

  // Funktion für den Bild-Upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.profilbild = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    // 1. Validierung & Speichern für SCHÜLER
    if (this.role === 'schueler') {
      if (!this.klasse.trim() || !this.geburtsdatum) {
        alert('Bitte trage deine Klasse und dein Geburtsdatum ein! ❌');
        return;
      }

      const schuelerProfil = {
        role: 'schueler',
        vorname: this.vorname,
        nachname: this.nachname,
        klasse: this.klasse,
        geburtsdatum: this.geburtsdatum,
        bio: this.bio,
        profilbild: this.profilbild
      };

      localStorage.setItem('savedProfile', JSON.stringify(schuelerProfil));
      alert('Schülerprofil erfolgreich gespeichert! ✅');

      // Weiterleitung zur Schüler-Detailseite
      this.router.navigate(['/schueler-detail']);

      // 2. Validierung & Speichern für LEHRER
    } else {
      if (!this.fach.trim() || !this.raum.trim()) {
        alert('Bitte trage dein Unterrichtsfach und deinen Raum ein! ❌');
        return;
      }

      const lehrerProfil = {
        role: 'lehrer',
        vorname: this.vorname,
        nachname: this.nachname,
        fach: this.fach,
        raum: this.raum,
        istKlassenvorstand: this.istKlassenvorstand,
        bio: this.bio,
        profilbild: this.profilbild
      };

      localStorage.setItem('savedProfile', JSON.stringify(lehrerProfil));
      alert('Lehrerprofil erfolgreich gespeichert! ✅');

      // Weiterleitung zur Lehrer-Detailseite
      this.router.navigate(['/lehrer-detail']);
    }
  }
}
