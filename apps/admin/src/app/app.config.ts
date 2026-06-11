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
import { APP_CONFIG } from '@org/config';
import { environment } from '../environments/environment';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { from, switchMap } from 'rxjs';
import localeFr from '@angular/common/locales/fr';
import { ConfirmationService, MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
     MessageService,
    ConfirmationService,
    { provide: APP_CONFIG, useValue: environment },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([(req,next)=>{
      const injector = inject(Injector);
      return from(import('@org/auth')).pipe(
          switchMap(m => runInInjectionContext(injector, () => m.authInterceptor(req, next)))
        );
    }])), 
    providePrimeNG({
        theme: {
            preset: Aura
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
