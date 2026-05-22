import { Article, ArticleDetail } from '@org/shared';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { ArticleApiService } from '@org/article-api';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

type ArticleState = {
  // Define the shape of your article state here
  articles: ArticleDetail[];
  news: ArticleDetail[];
  cultureBanen: ArticleDetail[];
  selectedArticle: ArticleDetail | null;
  
  dateModif: string | null;
};  
const initialState: ArticleState = {
  articles: [],
  news: [],
  cultureBanen: [],
  selectedArticle: null,
  
  dateModif: null,
   
};
export const GlobalArticleStore = signalStore(
  withState(initialState),
  withComputed((store,
      sanitizer = inject(DomSanitizer),
       router = inject(Router),
       platformId = inject(PLATFORM_ID)
    )=>({
    info: computed(() => {
      const art = store.selectedArticle()?.article ?? '';
      return sanitizer.bypassSecurityTrustHtml(art);
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

    articleUrl : computed(()=>{
      if (!isPlatformBrowser(platformId)) return;
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const currentUrl = `${baseUrl}${router.url}`;
      return currentUrl.split('#')[0];
    }),
    logoUrl: computed(() => {
      if (!isPlatformBrowser(platformId)) return;
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      return `${baseUrl}}/assets/logo/logo-hekok-trans.png`;
    }),
    fallbackImage: computed(() => {
      return 'https://picsum.photos/850/600';
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
  withMethods((store, articleService = inject(ArticleApiService)) => ({

    setFromRoute(data: ArticleDetail) {
      patchState(store, { selectedArticle: data ,
        dateModif: new Date().toISOString(),
      });
    },
    loadArticles() {
      articleService.getCommunautes()
        .subscribe(communautes => {
          const {data,success,message}=communautes as unknown as Article;
          const communautesdetails = data as unknown as ArticleDetail[];
          patchState(store, { articles: communautesdetails });
      });
    },
    loadNews() {
      articleService.getNews()
      .subscribe(news => {
        const {data,success,message}=news as unknown as Article;
        const newsdetails = data as unknown as ArticleDetail[]; 
        patchState(store, { news: newsdetails });
      });
    },
    loadCultureBanen() {
      articleService.getCultureBanen().subscribe(cultureBanen => {
        const {data,success,message}=cultureBanen as unknown as Article;
        const cultureBandetails = data as unknown as ArticleDetail[];
        patchState(store, { cultureBanen: cultureBandetails });
      });
    },
  })) 










);
