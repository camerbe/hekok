import { Route } from '@angular/router';
import { roleGuard } from '@org/shell';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('@org/layout').then(m => m.LayoutAdminComponent),
        
        children: [
            {
                path: 'users',
                loadChildren: () => import('@org/feature-users').then(m => m.featureUsersRoutes),
                canActivate: [roleGuard],
                data: { roles: ['Admin'] }
            },
            {
                path: 'articles',
                loadChildren: () => import('@org/feature-articles').then(m => m.featureArticlesRoutes),
                canActivate: [roleGuard],
                data: { roles: ['Admin'] }
            },
            {
                path: 'membres',
                loadChildren: () => import('@org/feature-membre').then(m => m.featureMembreRoutes),
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Tre'] }
            },
            {
                path: 'messages',
                loadChildren: () => import('@org/feature-messages').then(m => m.featureMessagesRoutes),
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Sec'] }
            },
            {
                path: 'typemessages',
                loadChildren: () => import('@org/feature-typemessages').then(m => m.featureTypemessagesRoutes),
                canActivate: [roleGuard],
                data: { roles: ['Admin'] }
            },
            {
                path: 'videos',
                loadChildren: () => import('@org/feature-videos').then(m => m.featureVideosRoutes),
                canActivate: [roleGuard],
                data: { roles: ['Admin'] }
            },

        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('@org/feature-auth').then(m => m.featureAuthRoutes)
        // path: 'auth',
        
    }
];
