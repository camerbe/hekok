import { Route } from '@angular/router';
import { articleByIdResolver, articleListResolver, oneArticleResolver } from '@org/article-api';
export const featureArticlesRoutes: Route[] = [
  { 
    path: '',
    loadComponent: () => import('./feature-articles/feature-articles').then(m => m.FeatureArticles) ,
  },
  {
    path:'show/:id',
    resolve: { articleByIdResolver: articleByIdResolver }   ,
     loadComponent: () => import('./feature-articles/feature-articles').then(m => m.FeatureArticles) ,
  },
  {
    path: 'slug/:slug',
    resolve: { oneArticleResolver: oneArticleResolver }   ,
    loadComponent: () => import('./feature-articles/feature-articles').then(m => m.FeatureArticles)  ,
  },
  {
    path: 'list',
    resolve: { articleListResolver: articleListResolver }   ,
    loadComponent: () => import('./feature-articles/feature-article-list.component').then(m => m.FeatureArticleListComponent) ,
  } 
];
