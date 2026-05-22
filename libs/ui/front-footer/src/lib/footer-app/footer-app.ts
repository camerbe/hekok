import { Component } from '@angular/core';

@Component({
  selector: 'lib-footer-app',
  imports: [],
  templateUrl: './footer-app.html',
  styleUrl: './footer-app.css',
})
export class FooterApp {
  currentYear = new Date().getFullYear();
}
