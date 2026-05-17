import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Eure geheimen Schlüssel aus der Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCwIR_8d4SkQmncQWpSFjKYaysz7H5RR9k",
  authDomain: "who-is-who-htl-4db59.firebaseapp.com",
  projectId: "who-is-who-htl-4db59",
  storageBucket: "who-is-who-htl-4db59.firebasestorage.app",
  messagingSenderId: "4738085733",
  appId: "1:4738085733:web:803986b7153dd1cac93dbc",
  measurementId: "G-6DGVJHGBC6"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Hier aktivieren wir Firebase für eure gesamte App
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Hier aktivieren wir die Firestore-Datenbank
    provideFirestore(() => getFirestore())
  ]
};
