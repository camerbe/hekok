import { Component, output, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ScrollTopModule } from 'primeng/scrolltop';
@Component({
  standalone:true,
  selector: 'lib-nav',
  imports: [
    RouterLink,
    RouterModule,
    ScrollTopModule
  ],
  template: `
    <nav class="kente-bg shadow-xl" role="navigation">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="animate-float" style="animation-duration:5s;">
          <svg width="38" height="38" viewBox="0 0 38 38">
            <circle cx="19" cy="19" r="17" fill="none" stroke="#E8A020" stroke-width="1.5"/>
            <circle cx="19" cy="19" r="12" fill="none" stroke="#C8651A" stroke-width="1.5"/>
            <line x1="19" y1="2" x2="19" y2="36" stroke="#E8A020" stroke-width="1.5" opacity="0.5"/>
            <line x1="2" y1="19" x2="36" y2="19" stroke="#E8A020" stroke-width="1.5" opacity="0.5"/>
            <circle cx="19" cy="19" r="4" fill="#E8A020"/>
            <circle cx="19" cy="7" r="2.5" fill="#B5251E"/>
            <circle cx="19" cy="31" r="2.5" fill="#B5251E"/>
            <circle cx="7" cy="19" r="2.5" fill="#B5251E"/>
            <circle cx="31" cy="19" r="2.5" fill="#B5251E"/>
          </svg>
        </div>
        <a routerLink="/accueil"            fragment="accueil">
          <img 
            class="h-12" 
            [src]="logo()" 
            [alt]="'logo Hekok'"
            
          />
        </a>
        
       
      </div>
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-6">
        <a 
          [routerLink]="['/accueil']"
          fragment="accueil"
          class="footer-link text-sm font-semibold" style="color: rgba(245,230,200,0.85);">Accueil</a>
        
        <a 
         [routerLink]="['/accueil']"
         fragment="histoire"
        class="footer-link text-sm font-semibold" style="color: rgba(245,230,200,0.85);">Histoire</a>
        
        <a 
          [routerLink]="['/accueil']"
          fragment="actualites"
          
           class="footer-link text-sm font-semibold" style="color: rgba(245,230,200,0.85);">
        Actualités
        </a>

        <a 
        [routerLink]="['/accueil']"
        fragment="culture"
        class="footer-link text-sm font-semibold" style="color: rgba(245,230,200,0.85);">Culture</a>
        
        <a 
          [routerLink]="['/accueil']"
          fragment="equipe"
          class="footer-link text-sm font-semibold" style="color: rgba(245,230,200,0.85);">
        Équipe
        </a>

        <a 
        [routerLink]="['/accueil']"
        fragment="contact"
         class="font-semibold text-sm px-5 py-2 rounded-full transition-all duration-300" style="background: var(--ocre); color: white;">Contact</a>
      </div>
      <!-- Burger -->
      <button id="burger" aria-label="Ouvrir le menu" class="md:hidden p-2" style="color: var(--or);" (click)="toggleMenu()">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M3 12h18M3 18h18"/>
        </svg>
      </button>
    </div>
    <!-- Scroll to Top -->
    <div class="bg-blue-700 fixed bottom-4 right-4">
      <p-scrolltop />
    </div>
    
  </div>
  
  <!-- Mobile Menu -->
  @if (isMenuOpen()){
  <div id="mobile-menu" class="py-4 px-6 border-t border-yellow-900/30 kente-bg bg-red-500">
    <div class="flex flex-col gap-4">
      <a 
        rel="noopener noreferrer"
        [routerLink]="['/accueil']"
        fragment="accueil"
         
        (click)="toggleMenu()" class="footer-link" style="color: rgba(245,230,200,0.85);">Accueil</a>
      <a 
        rel="noopener noreferrer"
        [routerLink]="['/accueil']"
        fragment="histoire"
        (click)="toggleMenu()" class="footer-link" style="color: rgba(245,230,200,0.85);">Histoire</a>
      <a 
        rel="noopener noreferrer"
        [routerLink]="['/accueil']"
        fragment="equipe"
        (click)="toggleMenu()" class="footer-link" style="color: rgba(245,230,200,0.85);">Équipe</a>
      <a 
        rel="noopener noreferrer"
        [routerLink]="['/accueil']"
        fragment="actualites"
        (click)="toggleMenu()" class="footer-link" style="color: rgba(245,230,200,0.85);">Actualités</a>
      <a 
        rel="noopener noreferrer"
        [routerLink]="['/accueil']"
        fragment="contact"
        (click)="toggleMenu()" class="footer-link" style="color: rgba(245,230,200,0.85);">Contact</a>
    </div>
  </div>
  }
</nav>
  `,
  styleUrl: './nav.css',
})
export class Nav {
  isMenuOpen = signal(false);
  readonly logo=signal<string>('assets/logo/logo-hekok-trans.png');
  changeMenu=output<boolean>();
  toggleMenu(){
    const isOpen = !this.isMenuOpen();   
    this.isMenuOpen.set(isOpen);  
    this.changeMenu.emit(isOpen)
    
  }
}
