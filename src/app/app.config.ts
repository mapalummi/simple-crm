import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "simple-crm-3fe9a", appId: "1:345942422370:web:215a5ea70fe4a53e8e723b", storageBucket: "simple-crm-3fe9a.firebasestorage.app", apiKey: "AIzaSyCbWv-yF3G3TRpPqS8289ZSkFiaRVTm7ms", authDomain: "simple-crm-3fe9a.firebaseapp.com", messagingSenderId: "345942422370" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
