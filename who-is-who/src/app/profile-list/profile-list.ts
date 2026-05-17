import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-list.html',
  styleUrl: './profile-list.css'
})
export class ProfileListComponent implements OnInit {
  private firestore = inject(Firestore);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  profiles: any[] = [];
  filteredProfiles: any[] = [];
  searchTerm: string = '';

  isDropdownOpen = false;

  async ngOnInit() {
    await this.loadProfiles();
  }

  async loadProfiles() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'profile'));
      this.profiles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Startet sauber und leer (Profile kommen erst bei Suche)
      this.filteredProfiles = [];
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Fehler beim Laden der Profile:', error);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    // FIX: Erzwingt das sofortige Aufklappen des Menüs ohne Refresh-Zwang!
    this.cdr.detectChanges();
  }

  goToProfileSetup() {
    this.isDropdownOpen = false;
    this.router.navigate(['/profile-setup']);
  }

  logout() {
    this.isDropdownOpen = false;
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('savedProfile');
    this.router.navigate(['/']);
  }

  filterProfiles() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredProfiles = [];
      return;
    }

    this.filteredProfiles = this.profiles.filter(p => {
      const vorname = p.vorname?.toLowerCase() || '';
      const nachname = p.nachname?.toLowerCase() || '';
      const klasse = p.klasse?.toLowerCase() || '';
      const fach = p.fach?.toLowerCase() || '';

      return vorname.includes(term) ||
        nachname.includes(term) ||
        klasse.includes(term) ||
        fach.includes(term);
    });
  }
}
