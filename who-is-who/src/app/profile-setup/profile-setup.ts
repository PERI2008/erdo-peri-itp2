import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-setup.html'
})
export class ProfileSetupComponent implements OnInit {
  role = '';
  vorname = '';
  nachname = '';
  klasse = '';
  fach = '';
  bio = '';

  ngOnInit() {
    // Rolle von der vorherigen Seite laden
    this.role = localStorage.getItem('userRole') || 'schueler';
  }

  saveProfile() {
    alert('Profil für ' + this.vorname + ' wurde gespeichert!');
    // Hier könnte man später zur Liste aller Personen weiterleiten
  }
}
