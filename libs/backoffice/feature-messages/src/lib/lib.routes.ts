import { Route } from '@angular/router';
import { messageListResolver, oneMessageResolver } from '@org/message-api';



export const featureMessagesRoutes: Route[] = [
  { 
    path: '', 
    loadComponent: () => import('./feature-messages/feature-messages').then(m => m.FeatureMessages) , 
  },
  { 
    path: 'list', 
    resolve: { messageListResolver: messageListResolver } ,
    loadComponent: () => import('./feature-messages/feature-messages-list').then(m => m.FeatureMessagesList) ,
  },
  { 
    path: 'show/:id', 
    resolve: { oneMessageResolver: oneMessageResolver } ,
    loadComponent: () => import('./feature-messages/feature-messages').then(m => m.FeatureMessages) ,
  },
];
