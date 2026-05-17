import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  profiles: any[] = [];         // Hier landen alle Profile aus der Cloud
  filteredProfiles: any[] = []; // Diese Liste zeigen wir an (wird gefiltert)
  searchTerm: string = '';      // Das Suchfeld

  async ngOnInit() {
    await this.loadProfiles();
  }

  // Holt alle Profile live aus Firestore
  async loadProfiles() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'profile'));
      this.profiles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Am Anfang sind gefilterte Profile = alle Profile
      this.filteredProfiles = [...this.profiles];
      console.log('Profile erfolgreich aus Firestore geladen:', this.profiles);
    } catch (error) {
      console.error('Fehler beim Laden der Profile:', error);
    }
  }

  // Filtert die Liste in Echtzeit nach Vorname, Nachname oder Klasse/Fach
  filterProfiles() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredProfiles = [...this.profiles];
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
