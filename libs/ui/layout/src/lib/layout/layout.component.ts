import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { StatComponent } from '@org/front-nav';
import {Communaute } from '@org/communaute'

import {News} from '@org/news';
import {CultureBanen} from '@org/culture-banen';

import { ArticleDetail, UserDetail } from '@org/shared';
import { HomeStore } from './home-store';
import { ArticleApiService, CanonicalService, JsonLdService } from '@org/article-api';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Bureau } from '@org/bureau';
import { APP_CONFIG } from '@org/config';

type Tab = 'ndiki' | 'nitoukou' | 'yingui';

@Component({
  selector: 'lib-layout-front',
  imports: [
    StatComponent,
    Communaute,
    News,
    CultureBanen,
    Bureau
    
  ],
  providers: [
    
    HomeStore
  ],
  
  template: `
   
    <!-- ═══════════════════════════════════════════
     HERO / PRÉSENTATION
    ═══════════════════════════════════════════ -->
<section id="accueil" class="hero-section flex flex-col items-center justify-center px-4 py-24 relative z-10">

  <!-- Decorative circles -->
  <div class="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 border-2" style="border-color: var(--ocre);"></div>
  <div class="absolute top-28 right-18 w-44 h-44 rounded-full opacity-8 border" style="border-color: var(--or); right: 3.5rem;"></div>
  <div class="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-8 border" style="border-color: var(--vert);"></div>

  <!-- Adinkra decoration top -->
  <div class="flex gap-6 mb-8 animate-fade-in">
    <svg class="adinkra-symbol" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="none" stroke="#E8A020" stroke-width="1.5" opacity="0.6"/>
      <circle cx="24" cy="24" r="10" fill="none" stroke="#C8651A" stroke-width="1.5" opacity="0.6"/>
      <circle cx="24" cy="24" r="3" fill="#E8A020" opacity="0.8"/>
      <line x1="24" y1="4" x2="24" y2="44" stroke="#E8A020" stroke-width="1" opacity="0.3"/>
      <line x1="4" y1="24" x2="44" y2="24" stroke="#E8A020" stroke-width="1" opacity="0.3"/>
    </svg>
    <svg class="adinkra-symbol" viewBox="0 0 48 48">
      <path d="M24 4 L44 24 L24 44 L4 24 Z" fill="none" stroke="#C8651A" stroke-width="1.5" opacity="0.6"/>
      <path d="M24 12 L36 24 L24 36 L12 24 Z" fill="none" stroke="#E8A020" stroke-width="1.5" opacity="0.6"/>
      <circle cx="24" cy="24" r="4" fill="#B5251E" opacity="0.7"/>
    </svg>
    <svg class="adinkra-symbol" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="none" stroke="#2D6A4F" stroke-width="1.5" opacity="0.6"/>
      <path d="M14 24 Q24 10 34 24 Q24 38 14 24" fill="none" stroke="#E8A020" stroke-width="1.5" opacity="0.6"/>
    </svg>
  </div>

  <p class="animate-fade-up delay-1 text-sm font-semibold tracking-widest uppercase mb-3" style="color: var(--or);">
    ✦ Ensemble nous sommes plus forts ✦
  </p>

  <h1 class="font-display text-center animate-fade-up delay-2" style="color: var(--sable); font-size: clamp(2.8rem, 7vw, 5rem); line-height: 1.1; max-width: 900px;">
    Le Munen en nous,<br>
    <span style="color: var(--or);">la force en chacun</span>
  </h1>

  <div class="w-24 h-1 my-6 rounded-full animate-fade-up delay-3" style="background: linear-gradient(90deg, var(--rouge), var(--or));"></div>

  <p class="font-lora text-center animate-fade-up delay-3 max-w-2xl text-lg leading-relaxed" style="color: rgba(245,230,200,0.80);">
    Hekok (les Banen du Benelux) est un espace de rencontre, de mémoire et de fraternité.
    Nous célébrons nos racines, honorons nos ancêtres et construisons ensemble un avenir rayonnant.
    <em style="color: var(--or);">Hekok</em> — « Je suis parce que nous sommes. »
  </p>

  <div class="flex flex-wrap gap-4 justify-center mt-3 animate-fade-up delay-4">
    
    <lib-stat
      [membreactif]="homeStore.stats().data.actifs"
      [duree]="homeStore.stats().data.histoire"
    /> 
  </div>
  
</section>

<div class="divider-kente"></div>
<lib-communaute
  (tabChange)="showTab($event)"
  [imgNitoukou]="homeStore.imgNitoukou()"
  [imgNdiki]="homeStore.imgNdiki()"
  [imgYingui]="homeStore.imgYingui()"
  [linkNitoukou]="homeStore.linkNitoukou()"
  [linkNdiki]="homeStore.linkNdiki()"
  [linkYingui]="homeStore.linkYingui()"
/>
<div class="divider-kente"></div>
<lib-news
  [news]="homeStore.banenNews()"
/>
<div class="divider-kente"></div>
<lib-culture-banen
  [culture]="homeStore.culture()"
/>
<div class="divider-kente"></div>
<lib-bureau [team]="team()"/>

  `,
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutFrontComponent{

  
  /**************************
   * INJECT
   */
  private readonly platformId = inject(PLATFORM_ID);
  readonly articleService = inject(ArticleApiService);
  
  readonly homeStore = inject(HomeStore);
  readonly canonicalService = inject(CanonicalService);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  readonly jsonLdService = inject(JsonLdService);
  protected readonly config = inject(APP_CONFIG);

/***********************
   * SIGNALS
   */

  isMenuOpen = signal(false);
  readonly isBrowser = signal(isPlatformBrowser(this.platformId));
  readonly article = signal<ArticleDetail>({} as ArticleDetail);
  //readonly culture = signal<ArticleDetail[]>([]);
  readonly team = this.homeStore.team;
  /**********************************
   * COMPUTED
   */
  readonly baseUrl = computed(() => {
    if (!this.isBrowser()) {
      return '';
    }

    return `${window.location.protocol}//${window.location.host}`;
  });

  readonly logoUrl = computed(
    () => `${this.baseUrl()}/assets/logo/logo-hekok-trans.png`
  );

  readonly currentArticle = computed<ArticleDetail | null>(() => {
    return this.homeStore.banenNews()?.[0] ?? null;
  });

  readonly currentUrl = computed(() => {
    return `${this.baseUrl()}${this.router.url}`;
  });

  
  /*********************
   * CONSTRUCTEUR
   */
  constructor() {
    
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    if (!this.isBrowser()) return;
    this.homeStore.loadNews();
    //this.homeStore.loadCinema();
    
    effect(() => {
            
      const article = this.currentArticle();
      //console.log('Article →', this.article());
      if (!article) {
        return;
      }
      this.updateSeo(article);
      this.setupCanonicalUrls();
      this.setupJsonLd();
    });
    
    
  }
  /*************************
   * METHODS
   */
  toggleMenu(isOpen: boolean) {
    this.isMenuOpen.set(isOpen);
  }
  showTab(id:Tab){
    console.log(`id ${id}`);
  }
  
  private setupCanonicalUrls() {
    const currentUrl = `${this.baseUrl()}${this.router.url}`;
    const rssUrl=`${this.config.baseUrl}/api/rss`;
    const rssCulture=`${this.config.baseUrl}/api/rss/culture`;
    const rssCommunaute=`${this.config.baseUrl}/api/rss/communaute`;
    this.canonicalService.setCanonicalURL(currentUrl);
    this.canonicalService.setAmpCanonicalURL(`${this.baseUrl()}/amp${this.router.url}`);
    this.canonicalService.setRssURL(rssUrl);
    this.canonicalService.setRssURL(rssCulture);
    this.canonicalService.setRssURL(rssCommunaute);
  }
  private setupMetaTags() {
    const tmpTitre = 'Actualités du peuple Banen du Cameroun et de sa Diaspora, Banen du Benelux | Hekok.org';
    const dynamicDescription = `À la une : ${this.article().titre}.`;
    const finalDescription = dynamicDescription.substring(0, 155).trim();
    const logoUrl = `${this.baseUrl()}/assets/logo/logo-hekok-trans.png`;
    const currentUrl = `${this.baseUrl()}${this.router.url}`;
    //console.log('currentUrl:', currentUrl);

    // Batch update pour réduire les reflows
    this.titleService.setTitle(tmpTitre);

    this.metaService.addTags([
      { name: 'description', content: finalDescription },
      { name: 'keywords', content: 'Hekok, Banen du Benelux, communauté Banen, rassemblement culturel, lions indomptables, diaspora camerounaise, diaspora africaine, Douala, Yaoundé, Bruxelles, fraternité' },

      // Open Graph
      { property: 'og:title', content: tmpTitre },
      { property: 'og:description', content: finalDescription },
      { property: 'og:image', content: logoUrl },
      { property: 'og:image:alt', content: tmpTitre },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: 'article' },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:locale:alternate', content: 'en-us' },
      { property: 'og:site_name', content: 'Hekok.org' },

      // Twitter
      { name: 'twitter:title', content: tmpTitre },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: logoUrl },
      { name: 'twitter:image:alt', content: tmpTitre },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@camer.be' },
      { name: 'twitter:creator', content: '@camerbe' },
      { name: 'twitter:url', content: currentUrl }
    ]);
  }
  // private loadCulture() {
  //   this.articleService.getCulture().subscribe({
  //     next: (culture) => {
  //       this.culture.set(culture.data as unknown as ArticleDetail[]);
  //       console.log('Culture Banen →', this.culture());
  //     }
  //   });
  // }
  private setupJsonLd(): void {
    const jsonLdArticles = this.homeStore.news().slice(0, 10);
    const today = new Date().toISOString().slice(0, 19) + '+00:00';

    const listElements = jsonLdArticles.map((article, index) => {
      const articleDate = new Date(article.datearticle??'').toISOString().slice(0, 19) + '+00:00';
      const year = new Date(article.datearticle?? '').getFullYear();
      const articleUrl = `${this.baseUrl()}/actualites/${article.slug}`;

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl
          },
          "headline": article.titre,
          "description": article.chapeau,
          "articleSection": `${article.typearticles.typearticle}`,
          "keywords": article.keyword.split(',').map(k => k.trim()),
          "inLanguage": "fr-FR",
          "url": articleUrl,
          "datePublished": articleDate,
          "dateModified": today,
          "isAccessibleForFree": "True",
          "copyrightYear": year,
          "author": { "@type": "Person", "name": article.auteur },
          "editor": { "@type": "Person", "name": article.source },
          "publisher": {
            "@type": "Organization",
            "name": "Camer.be",
            "url": "https://www.camer.be",
            "logo": {
              "@type": "ImageObject",
              "url": this.logoUrl,
              "width": 190,
              "height": 52
            }
          },
          "image": {
            "@type": "ImageObject",
            "url": article.image,
            "width": 850,
            "height": 600,
            "caption": `${article.countries.pays} :: ${article.titre} - Hekok.org`
          },
          "contentLocation": {
            "@type": "Place",
            "name": article.countries.pays
          },
          "articleBody": article.article,
          "interactionStatistic": [{
            "@type": "InteractionCounter",
            "interactionType": {
              "@type": "http://schema.org/ReadAction"
            },
            "userInteractionCount": article.hit
          }],
          "sameAs": [
            "https://www.facebook.com/camergroup",
            "https://x.com/camerbe"
          ]
        }
      };
    });

    const jsonLdGlobal = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": this.titleService.getTitle(),
      "description": this.metaService.getTag('name=description')?.content,
      "url": `${this.baseUrl()}${this.router.url}`,
      "mainContentOfPage": {
        "@type": "ItemList",
        "itemListElement": listElements
      }
    };

    this.jsonLdService.setJsonLd([jsonLdGlobal]);
  }
  // private initializeBaseUrl() {
  //   if (typeof window !== 'undefined') {
  //     const base = `${window.location.protocol}//${window.location.host}`;
  //     this.baseUrl.set(base);
  //     this.logoUrl.set(`${base}/assets/images/camer-logo.png`);
  //   }
  // }
  private updateSeo(article: ArticleDetail): void {
    const title =
      'Actualités du peuple Banen du Cameroun et de sa Diaspora | Hekok.org';
      
    const description =
      `À la une : ${article.titre}`
        .substring(0, 155)
        .trim();
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Hekok, Banen, diaspora camerounaise, Benelux, culture africaine'
    });

    // Open Graph
    this.metaService.updateTag({
      property: 'og:title',
      content: title
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: description
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: this.logoUrl()
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website'
    });

    // Twitter
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    this.metaService.updateTag({
      name: 'twitter:title',
      content: title
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content: description
    });

    this.metaService.updateTag({
      name: 'twitter:image',
      content: this.logoUrl()
    });
    this.setupCanonicalUrls();
  }
  
}
