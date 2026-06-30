import {
  ApplicationConfig,
  inject,
  Injector,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  runInInjectionContext,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { environment } from '../environments/environment.production';
import { APP_CONFIG } from '@org/config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
     { provide: APP_CONFIG, useValue: environment },
     { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: false, // only cache GET/HEAD by default
      })
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes
      , withInMemoryScrolling({     scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
       })
    ),
    provideHttpClient(
      withFetch()
    ), 
    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
              darkModeSelector: 'system',
              ripple: true,
            }
        },
        translation: {
            accept: 'Oui',
            reject: 'Non',
            dayNames: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
            dayNamesShort: ["dim","lun","mar","mer","jeu","ven","sam"],
            dayNamesMin: ["D","L","M","M","J","V","S"],
            monthNames: [
              "janvier","février","mars","avril","mai","juin",
              "juillet","août","septembre","octobre","novembre","décembre"
            ],
            monthNamesShort: [
              "janv.","févr.","mars","avr.","mai","juin",
              "juil.","août","sept.","oct.","nov.","déc."
            ],
            today: "Aujourd'hui",
            clear: "Effacer",
            // autres
            choose: 'Choisir',
            upload: 'Téléverser',
            cancel: 'Annuler',
        }
        
    })
  ],
};
