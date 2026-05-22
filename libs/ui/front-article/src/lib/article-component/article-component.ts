import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, PLATFORM_ID, signal } from '@angular/core';

import { DatePipe,isPlatformBrowser, NgOptimizedImage } from '@angular/common';

import { registerLocaleData } from '@angular/common';


import { ArticleDetail, MessageDetail } from '@org/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import localeFr from '@angular/common/locales/fr';
import {AgMessage} from '@org/ag-message'
import { ArticleStore } from './article-store';
import { MostReaded } from '@org/most-readed';

registerLocaleData(localeFr);

type ArticleRouteData = {
  oneArticle: ArticleDetail;
};

@Component({
  selector: 'lib-article-component',
  imports: [
    NgOptimizedImage,
    CardModule,
    AgMessage,
    MostReaded
  ],
  providers: [
    ArticleStore,
    DatePipe, // ✅ CRITIQUE: Fournir DatePipe
    { provide: LOCALE_ID, useValue: 'fr-FR' } // ✅ Optionnel: définir la locale
],
  template: `
  <section id="actualites" class="adinkra-bg py-15 px-4">
    <div class="text-center mb-10 ">
      <p class="text-sm font-semibold tracking-widest uppercase mb-2" style="color: var(--ocre);">✦ La vie de notre communauté ✦</p>
      <h2 class="font-display text-4xl md:text-5xl font-bold" style="color: var(--nuit);"> Actualités & Événements</h2>
      <div class="w-20 h-1 mx-auto mt-4 rounded-full" style="background: linear-gradient(90deg, var(--ocre), var(--or));"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="actualites">
      <article itemscope itemtype="https://schema.org/NewsArticle" class="col-span-2 card-hover rounded-2xl bg-white">
         <!-- ✅ Meta tags avec signals optimisés -->
        <meta itemprop="mainEntityOfPage" [attr.content]="articleStore.articleUrl()" />
        <meta itemprop="headline" [attr.content]="articleStore.selectedArticle()?.titre" />
        <meta itemprop="thumbnailUrl" [attr.content]="articleStore.selectedArticle()?.image" />
        <meta itemprop="description" [attr.content]="articleStore.selectedArticle()?.chapeau" />
        <meta itemprop="datePublished" [attr.content]="articleStore.selectedArticle()?.datearticle" />
        <meta itemprop="dateModified" [attr.content]="articleStore.dateModif()" />

         <!-- ✅ Publisher info -->
        <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
          <meta itemprop="name" content="Hekok.org" />
          <span itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
            <meta itemprop="url" [attr.content]="articleStore.logoUrl()" />
            <meta itemprop="width" content="190" />
            <meta itemprop="height" content="52" />
          </span>
        </span>
        <!-- ✅ Author info -->
        <div itemprop="author" itemscope itemtype="https://schema.org/Person">
          <meta itemprop="name" [attr.content]="articleStore.selectedArticle()?.auteur" />
          <meta itemprop="url" [attr.content]="articleStore.articleUrl()" />
        </div>
         <!-- ✅ Image info -->
        <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
          <meta itemprop="url" [attr.content]="articleStore.selectedArticle()?.image" />
          <meta itemprop="width" [attr.content]="850" />
          <meta itemprop="height" [attr.content]="600" />
        </div>

        <p-card 
          class="relative"
        >
          <ng-template #header>
            <div class="h-96 relative overflow-hidden">
              <img 
            class="object-cover rounded-t-2xl"
            fill
            [alt]="articleStore.imageAlt()"
            [title]="articleStore.imageAlt()"
            [ngSrc]="articleStore.selectedArticle()?.image || articleStore.fallbackImage()" />
            </div>
        
          </ng-template>

          <ng-template #title> 
            <h1 itemprop="headline" class="uppercase font-display text-lg font-bold mb-2 p-3 md:px-8 text-[#1A0F05] border-b-1 border-b-gray-100 ">{{articleStore.selectedArticle()?.titre}}</h1>               
          </ng-template>
          <ng-template #subtitle>
            <time
              itemprop="datePublished"
              [attr.datetime]="articleStore.selectedArticle()?.datearticle"
            > 
            <p class="text-xs mb-2 font-semibold p-3 md:px-8" style="color: var(--ocre);"><span class="pi pi-asterisk mr-2"></span>{{articleStore.selectedArticle()?.source}} : {{articleStore.selectedArticle()?.auteur}}<span class="mx-2">📅 {{ formatedDate(articleStore.selectedArticle()?.datearticle) }}</span> <i class="pi pi-eye ml-2"></i> {{articleStore.articleCounter()}}</p>
            </time>
          </ng-template>
          <p class="prose prose-lg max-w-none font-lora text-md leading-relaxed px-4 md:px-8 mb-3 md:mb-10 text-justify article-content article-content" style="color: var(--nuit);" [innerHTML]="articleStore.info()" itemprop="articleBody"></p>
        </p-card>
  
      </article>
      <aside class="col-span-1">
        <lib-most-readed 
          [mostReadedArticles]="articleStore.articles()"
        ></lib-most-readed>
        <lib-ag-message 
          [ag]="articleStore.agMessage()"
        />
      </aside>
    </div>
  </section>
  `,
  styleUrl: './article-component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ArticleComponent  {

  /***********************
   * SIGNALS
   */
  readonly isBrowser = signal(false);
  
  protected formatedDate(dateParution?: string | Date | null){
    if (!dateParution) return '';
    const date =
    typeof dateParution === 'string'
      ? new Date(dateParution)
      : dateParution;

    return this.datePipe.transform(date, 'dd MMM yyyy', undefined, 'fr-FR');
   }
  
  
  /**************************
   * INJECT
   */
  private readonly platformId = inject(PLATFORM_ID);
  
 
  private readonly activatedRoute=inject(ActivatedRoute);
   private readonly datePipe = inject(DatePipe);
   
   private readonly router=inject(Router);
  
   readonly articleStore=inject(ArticleStore);
  /*********************
   * CONSTRUCTEUR
   */
  constructor() {
    this.isBrowser.set(isPlatformBrowser(inject(PLATFORM_ID)));
    
    this.activatedRoute.data
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data) => {
          const result=data as ArticleRouteData;
          this.articleStore.setFromRoute(result.oneArticle);
          
          this.articleStore.updateMetaAndCanonical(result.oneArticle);
          this.articleStore.updateJsonLd();
          
        },
        error: (err) => console.error(err)
    });
    //this.loadAG();
    effect(() => {
      this.articleStore.articles();
      this.articleStore.messageAg();
    });
    
    
  }
  

  /********************************
   * METHODS
   */
  
}
