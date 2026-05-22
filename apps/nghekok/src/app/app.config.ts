import {
  ApplicationConfig,
  inject,
  Injector,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  runInInjectionContext,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { APP_CONFIG } from '@org/config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { from, switchMap } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
     { provide: APP_CONFIG, useValue: environment },
     { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()), 
  ],
};
