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
  klasse = '';
  fach = '';
  bio = '';

  ngOnInit() {
    this.role = localStorage.getItem('userRole') || 'schueler';
    this.vorname = localStorage.getItem('registeredVorname') || '';
    this.nachname = localStorage.getItem('registeredNachname') || '';
  }

  saveProfile() {
    if (this.role === 'schueler' && !this.klasse.trim()) {
      alert('Bitte trage deine Klasse ein.');
      return;
    }
    alert('Profil für ' + this.vorname + ' ' + this.nachname + ' wurde gespeichert!');
  }
}
