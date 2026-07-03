import { Article, ArticleDetail, Message, MessageDetail, VideoDetail } from '@org/shared';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { ArticleApiService, ArticleMetaService, CanonicalService, JsonLdService } from '@org/article-api';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { MessageApiService } from '@org/message-api';
import { HomeStore } from '@org/layout';
import { VideoApiService } from '@org/video-api';


type ArticleState = {
  // Define the shape of your article state here
  articles: ArticleDetail[];
  selectedArticle: ArticleDetail | null;
  messageAg: MessageDetail | null;
  cinema: VideoDetail[];
  dateModif: string | null;
  error: string | null;
};  
const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
  messageAg: null,
  dateModif: null,
  cinema: [],
  error: null
};

export const ArticleStore = signalStore(
  withState(initialState),
  withComputed((store,
      sanitizer = inject(DomSanitizer),
      router = inject(Router),
      platformId = inject(PLATFORM_ID),
      homeStore = inject(HomeStore)
    )=>({
    agMessage: computed(() => {
      const msg = store.messageAg()?.message ?? '';
      return sanitizer.bypassSecurityTrustHtml(msg);
    }),   
    imageAlt:computed(() => {
      const selectedArticle = store.selectedArticle();
      if (!selectedArticle) {
        return 'Default image alt text';
      }
      const title = selectedArticle.titre ??'';
      const country= selectedArticle.countries.pays ?? '';
      return title.includes(country)
      ? title
      : `${country} :: ${title}`;
    }),
     
    articleCounter : computed(() => {
      const hits = store.selectedArticle()?.hit;
      return typeof hits === 'number' ? hits : Number(hits ?? 0);
    }),

    info:computed(()=>{
      const article=store.selectedArticle()?.article?? '';
      return sanitizer.bypassSecurityTrustHtml(article);
    }),
    sameArticles: computed(() => {
      const selected = store.selectedArticle();
      if (!selected) return homeStore.news().slice(0, 6); // Return first 6 articles if no article is selected
      
      return homeStore.news().filter(a => a.id != selected.id).slice(0, 6);
 
      
    }),
  })),
  withMethods((store, 
    articleApiService = inject(ArticleApiService), 
    router = inject(Router), 
    jsonLdService = inject(JsonLdService), canonicalService=inject(CanonicalService), articleMetaService=inject(ArticleMetaService), 
    platformId = inject(PLATFORM_ID), 
    videoService = inject(VideoApiService),
    messageService=inject(MessageApiService)) => ({

    articleUrl : computed(()=>{
      if (!isPlatformBrowser(platformId)) return;
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const currentUrl = `${baseUrl}${router.url}`;
      return currentUrl.split('#')[0];
    }),
    logoUrl: computed(() => {
      if (!isPlatformBrowser(platformId)) return;
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      return `${baseUrl}/assets/logo/logo-hekok-trans.png`;
    }),
    fallbackImage: computed(() => {
      return 'https://images.unsplash.com/photo-1492724441997-5dc865305da7';
    }),
    
    wordCount : computed(() => {
      const article = store.selectedArticle();
      if (!article || !article.article) {
        return 0;
      }
      const text = article.article.replace(/<[^>]+>/g, '');
      const words = text.trim().split(/\s+/);
      return words.length;
    }),
    
  })),
  
  withMethods((store,
    articleApiService = inject(ArticleApiService),
    router = inject(Router),
    jsonLdService = inject(JsonLdService),
    canonicalService=inject(CanonicalService),
    articleMetaService=inject(ArticleMetaService),
    platformId = inject(PLATFORM_ID),
    videoService = inject(VideoApiService),
    messageService=inject(MessageApiService)

    ) => ({
    loadMostReaded() {
      if (!isPlatformBrowser(platformId)) return;
       articleApiService.getMostReaded().subscribe((articles) => {
        
        const articleDetails = articles.data as unknown as ArticleDetail[];
        
        patchState(store, { articles: articleDetails });
        
        
      });
    },
    loadAG(){
      if (!isPlatformBrowser(platformId)) return;
      messageService.getAGmessage()
      .subscribe({
          next:(res)=>{
          const {data,success,message}=res as unknown as Message
          const agMessage = data as unknown as MessageDetail;
           patchState(store, { messageAg: agMessage });
        }
      });
    },
    loadCinema() {
        console.log('loadCinema called');
        if (!isPlatformBrowser(platformId)) return;
        
        videoService.getVideoList().subscribe({
          next: (cinema) => {
            patchState(store, { cinema: cinema.data as unknown as VideoDetail[]});
          },
          error: (error) => {
             
            patchState(store, { error: 'Failed to load cinema' });
          }
         });
      },
    setFromRoute(data: ArticleDetail) {
      patchState(store, { selectedArticle: data ,
        dateModif: new Date().toISOString(),
      });
    },
        
    updateJsonLd() {
      if (!isPlatformBrowser(platformId)) return;
      const article = store.selectedArticle();
      if (!article) return;

      const articleDate = article?.datearticle
    ? new Date(article.datearticle).toISOString().slice(0, 19) + '+00:00'
    : undefined;

      const today = new Date().toISOString().slice(0, 19) + '+00:00';
      
      const year = article?.datearticle
    ? new Date(article.datearticle).getFullYear()
    : undefined;
      const baseUrl = `${window.location.protocol}//${window.location.host}`;

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}${router.url}`
        },
        "headline": article.titre,
        "description": article.chapeau,
        "articleSection": {
          "@value": `${article.typearticles.typearticle}`,
          "@language": "fr-FR"
        },
        "keywords": article.keyword.split(',').map(k => k.trim()),
        "inLanguage": "fr-FR",
        "url": `${baseUrl}${router.url}`,
        "datePublished": articleDate,
        "dateModified": today,
        "isAccessibleForFree": "True",
        "copyrightYear": year,
        "author": {
          "@type": "Person",
          "name": article.auteur,
        },
        "editor": {
          "@type": "Person",
          "name": article.source
        },
        "publisher": {
          "@type": "Organization",
          "name": "hekok.org",
          "url": "https://www.hekok.org",
          "logo": {
            "@type": "ImageObject",
            "url": store.logoUrl(),
            "width": 190,
            "height": 52
          }
        },
        "image": [{
          "@type": "ImageObject",
          "url": article.image,
          "width": 850,
          "height": 600,
          "caption": `${article.countries.pays} :: ${article.titre} - Hekok.org`
        }],
        "contentLocation": {
          "@type": "Place",
          "name": article.countries.pays
        },
        "articleBody": article.article,
        "wordCount": {
          "@type": "QuantitativeValue",
          "value": store.wordCount(),
          "unitText": "Words"
        },
        "interactionStatistic": [{
          "@type": "InteractionCounter",
          "interactionType": { "@type": "ReadAction" },
          "userInteractionCount": article.hit
        }],
        "sameAs": [
          "https://www.facebook.com/camergroup",
          "https://x.com/camerbe"
        ],
      };

      jsonLdService.setJsonLd(jsonLd);
    },
    
    updateMetaAndCanonical(article: ArticleDetail) {
      if (!isPlatformBrowser(platformId)) return;
      articleMetaService.updateArticleMeta(article);
      
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const currentUrl = `${baseUrl}${router.url}`;
      
      const canonicalUrl=currentUrl.split('#')[0];

      //this.articleUrl.set(currentUrl);
      //canonicalService.setCanonicalURL(canonicalUrl);
      canonicalService.setAmpCanonicalURL(canonicalUrl);
      
    }
   
  
  })),
  withHooks({
      onInit(store) {
        if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
        store.loadMostReaded();
        store.loadAG();
        store.loadCinema();
      }
  }),  
);
