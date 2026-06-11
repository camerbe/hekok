import { Component, input } from '@angular/core';
import { UserDetail } from '@org/shared';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'lib-bureau',
  imports: [
    NgOptimizedImage
  ],
  template: `
<section id="equipe" class="adinkra-bg py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-14">
      <p class="text-sm font-semibold tracking-widest uppercase mb-2" style="color: var(--ocre);">✦ Les piliers de notre famille ✦</p>
      <h2 class="font-display text-4xl md:text-5xl font-bold" style="color: var(--nuit);">Notre Équipe Dirigeante</h2>
      <div class="w-20 h-1 mx-auto mt-4 rounded-full" style="background: linear-gradient(90deg, var(--ocre), var(--or));"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
       @let items = team;

      @for (item of items(); track item.id) {
        <div class="card-hover rounded-2xl overflow-hidden shadow-lg" style="background: white; border: 1px solid rgba(200,101,26,0.15);">
        <div class="h-3 w-full" style="background: linear-gradient(90deg, var(--rouge), var(--ocre));"></div>
        <div class="p-8 text-center">
          
          <div class="profile-ring w-28 h-28 mx-auto mb-5">
            
            <div class="profile-inner w-full h-full">
              <svg viewBox="0 0 112 112" xmlns="http://www.w3.org/2000/svg">
                <rect width="112" height="112" fill="#8B4513"/>
                <circle cx="56" cy="42" r="22" fill="#C68642"/>
                <ellipse cx="56" cy="95" rx="32" ry="24" fill="#A0522D"/>
                <path d="M34 70 Q56 58 78 70 Q85 82 78 95 Q56 105 34 95 Q27 82 34 70" fill="#C68642"/>
                <circle cx="48" cy="40" r="3" fill="#3D1A08"/>
                <circle cx="64" cy="40" r="3" fill="#3D1A08"/>
                <path d="M48 52 Q56 58 64 52" fill="none" stroke="#3D1A08" stroke-width="2" stroke-linecap="round"/>
                <!-- Crown/President badge -->
                <polygon points="56,6 62,18 76,18 65,26 69,39 56,31 43,39 47,26 36,18 50,18" fill="#E8A020" opacity="0.9"/>
              </svg>
              <img 
                class="object-cover rounded-t-2xl"
                fill
                [ngSrc]="item.image"
                [alt]="getSlogan(item.role)"
                [title]="getSlogan(item.role)"
               /> 
            </div>
          </div>
          <div class="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3" style="background: rgba(181,37,30,0.1); color: var(--rouge);">{{ getRoleIcon(item.role) }}</div>
          <h3 class="font-display text-xl font-bold mb-1" style="color: var(--nuit);">{{ item.fullName }}</h3>
          <p class="font-lora text-sm italic mb-4" style="color: var(--ocre);">"{{ getSlogan(item.role) }}"</p>
          
        </div>
      </div>
      }
    </div>

  </div>
</section>
  `,
  styleUrl: './bureau.css',
})
export class Bureau {
  team = input.required<UserDetail[]>();

  /***************************
   * METHODS
   */
  getRoleIcon(role: string): string {
    switch (role.toLowerCase()) {
      case 'pre':
        return '👑 Président';
      case 'tre':
        return '💰 Trésorière';
      case 'sec':
        return '📝 Secrétaire';
      default:
        return '👤';
    } 
  }
  getSlogan(role: string):string{
    switch (role.toLowerCase()) {
      case 'pre':
        return "L'union fait la force";
      case 'tre':
        return 'Chaque sou compte pour tous';
      case 'sec':
        return 'La mémoire est notre force';
      default:
        return '👤';
    } 
  }
}
