import { Route } from '@angular/router';


export const featurePublicRoutes: Route[] = [
  { 
    path: '',
     loadComponent:()=> import('./feature-public/feature-public').then(m=>m.FeaturePublic)
    },
];
