import { Route } from '@angular/router';

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
                loadChildren: () => import('@org/feature-users').then(m => m.featureUsersRoutes)
            },
            {
                path: 'articles',
                loadChildren: () => import('@org/feature-articles').then(m => m.featureArticlesRoutes)
            },
            {
                path: 'membres',
                loadChildren: () => import('@org/feature-membre').then(m => m.featureMembreRoutes)
            },
            {
                path: 'messages',
                loadChildren: () => import('@org/feature-messages').then(m => m.featureMessagesRoutes)
            },
            {
                path: 'typemessages',
                loadChildren: () => import('@org/feature-typemessages').then(m => m.featureTypemessagesRoutes)
            },

        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('@org/feature-auth').then(m => m.featureAuthRoutes)
    }
];
