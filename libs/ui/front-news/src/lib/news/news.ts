import { ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, OnInit, PLATFORM_ID, signal } from '@angular/core';

import { DatePipe, isPlatformBrowser,NgOptimizedImage } from '@angular/common';

import { ArticleDetail, Message, MessageDetail } from '@org/shared';
import {MessageApiService} from '@org/message-api';
import {AgMessage} from '@org/ag-message'

import { ButtonModule } from 'primeng/button';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

registerLocaleData(localeFr);

@Component({
  selector: 'lib-news',
  imports: [
    ButtonModule,
    ProgressSpinnerModule,
    NgOptimizedImage,
    AgMessage,
    RouterLink

  ],
  providers: [
    DatePipe, // ✅ CRITIQUE: Fournir DatePipe
    { provide: LOCALE_ID, useValue: 'fr-FR' } // ✅ Optionnel: définir la locale
],
  template: `
 
    <section id="actualites" class="adinkra-bg py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-14 ">
      <p class="text-sm font-semibold tracking-widest uppercase mb-2" style="color: var(--ocre);">✦ La vie de notre communauté ✦</p>
      <h2 class="font-display text-4xl md:text-5xl font-bold" style="color: var(--nuit);"> Actualités & Événements</h2>
      <div class="w-20 h-1 mx-auto mt-4 rounded-full" style="background: linear-gradient(90deg, var(--ocre), var(--or));"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      @for(item of visibleItems();track item.id){
        <article class=" card-hover rounded-2xl overflow-hidden shadow-md" style="background: white;">
        <div class="h-48 relative overflow-hidden">
            <img 
            class="object-cover w-full"
            fill
            [alt]="item.titre"
            [title]="item.titre"
            [ngSrc]="item.image || 'https://images.unsplash.com/photo-1492724441997-5dc865305da7'" />
          <div class="absolute top-3 left-3">
            <span class="news-tag" style="background: var(--rouge); color: white;">{{item.countries.pays}}</span>
          </div>
        </div>
        <div class="p-6">
          <p class="text-xs mb-2 font-semibold" style="color: var(--ocre);">📅 {{ formatedDate(item.datearticle) }}</p>
          <h3 class="font-display text-lg font-bold mb-2" style="color: var(--nuit);">{{item.titre}}</h3>
          <p class="text-sm leading-relaxed text-[#555]">
            {{item.chapeau}}
          </p>
          <a [routerLink]="['/actualites',item.slug]" fragment="actualites" class="block mx-auto mt-4 text-sm font-semibold transition-colors bg-[#E8A020] text-white p-3 rounded-full text-center">La suite →</a>
        </div>
      </article>
      }
      <div class="col-span-3 flex justify-center">
        <p-button
          aria-label="Voir plus"
          [icon]="hasMore() ? 'pi pi-plus' : 'pi pi-minus'"
          [label]="hasMore() ? ' Voir plus' : ' Voir moins'"
          class=" w-1/3 flex justify-center"
          (onClick)="toggleItems()"
        />
      </div>
      

    </div>

    <!-- Annonce urgente -->
    
    <lib-ag-message 
      [isAside]="isAside()"
      [ag]="agMessage()"
    />

  </div>
</section>
  
  `,
  styleUrl: './news.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class News implements OnInit{

  
  /**************************
   * INJECT
   */
  private readonly platformId = inject(PLATFORM_ID);
  private readonly messageService=inject(MessageApiService);
   readonly sanitizer=inject(DomSanitizer);
 
  /*****************************
   * SIGNALS
   */
  
   readonly isBrowser = signal(false);
   readonly news =input<ArticleDetail[]>([]);
   readonly ag = signal<MessageDetail>({} as MessageDetail);
   readonly visibleCount=signal<number>(3);

  readonly agMessage = computed(() => {
    const msg = this.ag()?.message ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(msg);
  });
   hasMore=computed(()=>{
    return this.visibleCount()< this.news().length;
   });
   protected visibleItems=computed(()=>{
    return this.news().slice(0,this.visibleCount());
   });
   protected formatedDate(dateParution:string | Date | null){
    if (!dateParution) return '';
    const date = typeof dateParution === 'string'
    ? new Date(dateParution)
    : dateParution;
    return this.datePipe.transform(date,"dd MMM yyyy", undefined, 'fr-FR');
   }
   readonly loading = signal(true);
   readonly isAside = signal(false);
   /*tabChange =output<Tab>();
   imgNitoukou=input<string>();
   imgNdiki=input<string>();
   imgYingui=input<string>();
   tabVisible = signal(false);*/
  /*********************
   * CONSTRUCTEUR
   */
  constructor() {
    this.isBrowser.set(isPlatformBrowser(inject(PLATFORM_ID)));
    
  }
  /*************************
   * INJECT
   */
     private readonly datePipe = inject(DatePipe);
   /*********************
   * METHODS
   */
  toggleItems() {
    if (this.visibleCount() >= this.news().length) {
      this.visibleCount.set(3);
    } else {
      this.visibleCount.update(value => value + 3);
    }
  }
  ngOnInit(): void {
    if(!this.isBrowser()) return;
    this.loadAG()
   
  }
  private loadAG() {
    this.loading.set(true);
    return this.messageService.getAGmessage().subscribe({
      next:(res)=>{
        // const {data,success,message}=res as unknown as Message
        this.ag.set(res.data as unknown as MessageDetail);
        this.loading.set(false);

      }
      ,
      error: () => {
        this.loading.set(false); // ✅ éviter blocage
      }
    });
  }
  
  
}


