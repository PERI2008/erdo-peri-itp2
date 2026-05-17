import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
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
  private ngZone = inject(NgZone);

  profiles: any[] = [];
  filteredProfiles: any[] = [];
  searchTerm: string = '';

  isDropdownOpen = false;
  isModalOpen = false;
  selectedProfile: any = null;

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

      this.filteredProfiles = [];
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Fehler beim Laden der Profile:', error);
    }
  }

  openModal(profile: any) {
    this.selectedProfile = profile;
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.ngZone.run(() => {
      this.isModalOpen = false;
      this.selectedProfile = null;
      this.cdr.detectChanges();
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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
