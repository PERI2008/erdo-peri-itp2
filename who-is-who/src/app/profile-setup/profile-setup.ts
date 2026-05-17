import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core'; // NgZone hinzugefügt
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-setup.html',
  styleUrl: './profile-setup.css'
})
export class ProfileSetupComponent implements OnInit {
  private firestore = inject(Firestore);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone); // Zwingt Angular wach zu bleiben

  role = '';
  vorname = '';
  nachname = '';
  email = '';
  password = '';
  profilbild = '';
  klasse = '';
  geburtsdatum = '';
  fach = '';
  raum = '';
  istKlassenvorstand = false;
  bio = '';

  isEditMode = false;

  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  async ngOnInit() {
    this.email = localStorage.getItem('currentUserEmail') || localStorage.getItem('registeredEmail') || '';
    this.role = localStorage.getItem('userRole') || 'schueler';
    this.vorname = localStorage.getItem('registeredVorname') || '';
    this.nachname = localStorage.getItem('registeredNachname') || '';
    this.password = localStorage.getItem('registeredPassword') || '';

    if (this.email) {
      try {
        const userDocRef = doc(this.firestore, 'profile', this.email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          this.role = data['role'] || 'schueler';
          this.vorname = data['vorname'] || '';
          this.nachname = data['nachname'] || '';
          this.password = data['password'] || this.password;
          this.profilbild = data['profilbild'] || '';
          this.klasse = data['klasse'] || '';
          this.geburtsdatum = data['geburtsdatum'] || '';
          this.fach = data['fach'] || '';
          this.raum = data['raum'] || '';
          this.istKlassenvorstand = data['istKlassenvorstand'] || false;
          this.bio = data['bio'] || '';

          this.isEditMode = true;
          this.cdr.detectChanges();
        }
      } catch (error) {
        console.error('Fehler:', error);
      }
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    setTimeout(() => { this.notificationMessage = ''; }, 3000);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.showNotification('Fehler: Bild ungültig!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width, height = img.height;
        if (width > height) { if (width > 400) { height *= 400 / width; width = 400; } }
        else { if (height > 400) { width *= 400 / height; height = 400; } }

        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        if (Math.round((compressedBase64.length * 3) / 4) > 900000) {
          this.showNotification('Bild zu groß!', 'error'); return;
        }

        this.profilbild = compressedBase64;
        this.cdr.detectChanges();
      };
    };
    reader.readAsDataURL(file);
  }

  async saveProfile() {
    if (!this.email || !this.email.trim()) {
      this.showNotification('Keine E-Mail gefunden.', 'error'); return;
    }

    let profilDaten: any = {
      role: this.role,
      vorname: this.vorname,
      nachname: this.nachname,
      email: this.email,
      password: this.password,
      bio: this.bio,
      profilbild: this.profilbild,
      erstelltAm: new Date()
    };

    if (this.role === 'schueler') {
      profilDaten.klasse = this.klasse;
      profilDaten.geburtsdatum = this.geburtsdatum;
    } else {
      profilDaten.fach = this.fach;
      profilDaten.raum = this.raum;
      profilDaten.istKlassenvorstand = this.istKlassenvorstand;
    }

    try {
      const userProfileRef = doc(this.firestore, 'profile', this.email.trim().toLowerCase());
      await setDoc(userProfileRef, profilDaten, { merge: true });
      localStorage.setItem('savedProfile', JSON.stringify(profilDaten));

      this.showNotification(this.isEditMode ? 'Aktualisiert!' : 'Erstellt!', 'success');

      // NG-ZONE FIX
      setTimeout(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/profiles']);
        });
      }, 2000);

    } catch (error) {
      this.showNotification('Datenbank-Fehler!', 'error');
    }
  }
}
