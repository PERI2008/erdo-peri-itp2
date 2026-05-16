import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lehrer-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lehrer-detail.html',
  styleUrl: './lehrer-detail.css'
})
export class LehrerDetailComponent implements OnInit {
  profil: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const daten = localStorage.getItem('savedProfile');
    if (daten) {
      this.profil = JSON.parse(daten);
    }
  }

  zurueck() {
    this.router.navigate(['/profile-setup']);
  }
}
