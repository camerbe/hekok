import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-youtube',
  imports: [],
  template: `
    <div class="bg-gray-100 rounded-2xl p-3 mt-4">
      <p class="font-semibold text-sm uppercase tracking-wider mb-1 p-3 rounded-lg" style="color: var(--ocre);background: linear-gradient(135deg, rgba(200,101,26,0.15), rgba(232,160,32,0.10)); border: 1.5px solid rgba(232,160,32,0.3);"><i class="pi pi-video mr-2"></i>Vidéo</p>
        <iframe
          class="w-full h-64 md:h-96 rounded-lg shadow-lg mt-4"
          [src]="videoUrl()"
          loading="lazy"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; 
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
    </div>
  `,
  styleUrl: './youtube.component.css',
})
export class YoutubeComponent {
  youtubeKey=input.required<string>();
  /******************
   * INJECT
   */
  
  sanitizer = inject(DomSanitizer);
  readonly videoUrl = computed(() => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtubeKey()}`);
  });
}
