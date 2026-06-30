import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'actualites/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'communautes/:slug',
    renderMode: RenderMode.Server,
  },
];
