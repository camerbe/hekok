import { Component } from '@angular/core';
import { QuiSommesNous } from '@org/qui-sommes-nous';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-footer-app',
  imports: [
    QuiSommesNous,
    RouterLink
  ],
  templateUrl: './footer-app.html',
  styleUrl: './footer-app.css',
})
export class FooterApp {
  currentYear = new Date().getFullYear();
  
}
