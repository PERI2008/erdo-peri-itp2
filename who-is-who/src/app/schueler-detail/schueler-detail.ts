import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schueler-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schueler-detail.html',
  styleUrl: './schueler-detail.css'
})
export class SchuelerDetailComponent implements OnInit {
  profil: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Daten aus dem localStorage holen
    const daten = localStorage.getItem('savedProfile');
    if (daten) {
      this.profil = JSON.parse(daten);
    }
  }

  zurueck() {
    this.router.navigate(['/profile-setup']);
  }
}
