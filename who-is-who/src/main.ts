import 'zone.js'; // <-- Das muss hier ganz oben stehen!
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

// ... restlicher Code
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
