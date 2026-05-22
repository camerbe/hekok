import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterApp } from '@org/footer-app';
import { Nav } from '@org/front-nav';

@Component({
  imports: [
    RouterModule,
    FooterApp,
    Nav
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isMenuOpen = signal(false);
  protected title = 'nghekok';

  /*************************
   * METHODS
   */
  toggleMenu(isOpen: boolean) {
    this.isMenuOpen.set(isOpen);
  }
}
