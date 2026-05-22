import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-stat',
  imports: [],
  template: `
    <!-- Stats bar -->
  <div class="mt-20 flex flex-wrap justify-center gap-12 animate-fade-up delay-4">
    <div class="text-center">
      <p class="font-display text-3xl font-bold" style="color: var(--or);">3</p>
      <p class="text-xs uppercase tracking-widest mt-1" style="color: rgba(245,230,200,0.6);">Communautés</p>
    </div>
    <div class="text-center">
      <p class="font-display text-3xl font-bold" style="color: var(--or);">{{membreactif()}}+</p>
      <p class="text-xs uppercase tracking-widest mt-1" style="color: rgba(245,230,200,0.6);">Membres actifs</p>
    </div>
    <div class="text-center">
      <p class="font-display text-3xl font-bold" style="color: var(--or);">{{duree()}}+</p>
      <p class="text-xs uppercase tracking-widest mt-1" style="color: rgba(245,230,200,0.6);">Ans d'histoire</p>
    </div>
    <div class="text-center">
      <p class="font-display text-3xl font-bold" style="color: var(--or);">12</p>
      <p class="text-xs uppercase tracking-widest mt-1" style="color: rgba(245,230,200,0.6);">Réunions / an</p>
    </div>
  </div>
  `,
  styleUrl: './front-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatComponent {
  membreactif = input.required<number>();
  duree = input.required<number>();
}
