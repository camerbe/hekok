import { Route } from '@angular/router';
import { FeatureTypemessages } from './feature-typemessages/feature-typemessages';

import { typeMessageListResolver, oneTypeMessageResolver } from '@org/typemessage-api';

export const featureTypemessagesRoutes: Route[] = [
  { 
    path: '', 
    loadComponent: () => import('./feature-typemessages/feature-typemessages').then(m => m.FeatureTypemessages) ,
    
  },
  { 
    path: 'list', 
    resolve: { typeMessageListResolver: typeMessageListResolver } ,
    loadComponent: () => import('./feature-typemessages/feature-type-message-list').then(m => m.FeatureTypeMessageList) ,
   
  },
   { 
    path: 'show/:id', 
    resolve: { oneTypeMessageResolver: oneTypeMessageResolver } ,
    component: FeatureTypemessages 
  },
];
