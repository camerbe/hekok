import { Route } from '@angular/router';
import { videoIdResolver, videoListResolver } from '@org/video-api';

export const featureVideosRoutes: Route[] = [
  { 
    path: '', 
    loadComponent: () => import('./feature-videos/feature-videos').then(m => m.FeatureVideos) ,
  },
  {
    path:'show/:id',
    resolve: { videoIdResolver: videoIdResolver }   ,
    loadComponent: () => import('./feature-videos/feature-videos').then(m => m.FeatureVideos) ,
  },
  
  {
    path: 'list',
    resolve: { 
      videoListResolver: videoListResolver }  ,
    loadComponent: () => import('./feature-videos/feature-video-list').then(m => m.FeatureVideoList) ,
  } 
];
