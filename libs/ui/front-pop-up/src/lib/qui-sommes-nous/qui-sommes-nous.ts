import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'lib-qui-sommes-nous',
  imports: [
    ButtonModule, 
    DialogModule
  ],
  template: `
   
      <p-button (click)="showDialog()" icon="pi pi-bullseye" label="Qui sommes-nous?" />
      <p-dialog 
        header="Qui sommes-nous?" 
        [modal]="true" 
        [(visible)]="visible" 
        [style]="{ width: '35rem' }" >
      
        <div class="flex justify-center mb-4">
            <img 
            [src]="quiSommesNous()" 
            alt="Qui sommes-nous?" 
            class="object-contain h-auto rounded-lg" />
           
        </div>
        <div class="mb-4 text-xs text-justify text-gray-600">
          <p class="mb-3">
            L’Association des Banens du Benelux (HEKOK) est une association sans but lucratif créée afin de rassembler les ressortissants Banen de la communauté vivant dans les pays du Benelux.
          </p>
          <p class="mb-3">
            Fondée dans un esprit de solidarité, d’entraide et de fraternité, HEKOK constitue un cadre d’échange et de coopération entre ses membres, tout en contribuant à la préservation et à la promotion du patrimoine culturel, historique et traditionnel du peuple Banen.</p>
          <p class="mb-3">
            L’association œuvre au renforcement des liens entre les membres de la diaspora, favorise l’intégration sociale et citoyenne dans les pays d’accueil et encourage les initiatives visant le développement humain, culturel et économique des communautés d’origine.
          </p>
        </div>
      
      
      
      </p-dialog>
    
  `,
  styleUrl: './qui-sommes-nous.css',
})
export class QuiSommesNous {
  /*****************************
   * SIGNALS
   */
  visible=signal<boolean>(false);
  readonly quiSommesNous=signal<string>('assets/logo/Qui-sommes-nous.webp');
  /*************************************
   * METHODS
   */
  showDialog() {
    this.visible.set(true);
  }
}
