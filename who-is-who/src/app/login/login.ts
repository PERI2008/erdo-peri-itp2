import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true, // Wichtig für moderne Angular-Projekte
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {} // Hier stand vorher nur 'Login'
