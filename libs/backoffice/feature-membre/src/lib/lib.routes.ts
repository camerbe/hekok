import { Route } from '@angular/router';
import { membreListResolver, oneMembreResolver } from '@org/membre-api';


export const featureMembreRoutes: Route[] = [
  { 
    path: '', 
    loadComponent: () => import('./feature-membre/feature-membre.component').then(m => m.FeatureMembreComponent) ,
  },
  {
    path: 'show/:id',
    resolve: {oneMembreResolver: oneMembreResolver},
    loadComponent: () => import('./feature-membre/feature-membre.component').then(m => m.FeatureMembreComponent) ,
  },
  {
    path: 'list',
    resolve: {membreListResolver: membreListResolver},
    loadComponent: () => import('./feature-membre/feature-membre-list').then(m => m.FeatureMembreList) ,
  }


];
