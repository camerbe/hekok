import { Route } from '@angular/router';
import { oneArticleResolver } from '@org/article-api';


export const appRoutes: Route[] = 
[
  { 
    path: '', 
    pathMatch: 'full' ,
    redirectTo: 'accueil', 
    
  },
  {
    path: 'accueil',
    loadComponent:()=>import('@org/layout').then(m=>m.LayoutFrontComponent),
  },
  {
    path: 'actualites/:slug',
    loadComponent:()=>import('@org/article-component').then(m=>m.ArticleComponent),
    resolve:{oneArticle:oneArticleResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'communautes/:slug',
    loadComponent:()=>import('@org/article-component').then(m=>m.ArticleComponent),
    resolve:{oneArticle:oneArticleResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    redirectTo: 'accueil',
  },
];
