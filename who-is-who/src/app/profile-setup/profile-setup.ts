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

  // Variable für das Profilbild als Base64-String
  profilbild = '';

  // Schüler-Felder
  klasse = '';
  geburtsdatum = '';

  // Lehrer-Felder
  fach = '';
  raum = '';
  istKlassenvorstand = false;

  // Gemeinsames Feld
  bio = '';

  // Konstruktor ist jetzt leer – kein Service nötig!
  constructor() {}

  ngOnInit() {
    this.role = localStorage.getItem('userRole') || 'schueler';
    this.vorname = localStorage.getItem('registeredVorname') || '';
    this.nachname = localStorage.getItem('registeredNachname') || '';
  }

  // Funktion, die aufgerufen wird, wenn ein Bild ausgewählt wird
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Wenn der Reader fertig geladen hat, speichern wir das Ergebnis
      reader.onload = () => {
        this.profilbild = reader.result as string;
      };

      // Datei als DataURL einlesen (wird zu einem Base64-String)
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.role === 'schueler') {
      if (!this.klasse.trim() || !this.geburtsdatum) {
        alert('Bitte trage deine Klasse und dein Geburtsdatum ein! ❌');
        return;
      }

      // Temporäre Speicherung im localStorage für die Zwischen-Präsentation
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
      console.log('Schülerprofil lokal gesichert:', schuelerProfil);

    } else {
      if (!this.fach.trim() || !this.raum.trim()) {
        alert('Bitte trage dein Unterrichtsfach und deinen Raum ein! ❌');
        return;
      }

      // Temporäre Speicherung im localStorage für die Zwischen-Präsentation
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
      console.log('Lehrerprofil lokal gesichert:', lehrerProfil);
    }

    alert('Profil für ' + this.vorname + ' ' + this.nachname + ' wurde erfolgreich gespeichert! ✅');
  }
}
