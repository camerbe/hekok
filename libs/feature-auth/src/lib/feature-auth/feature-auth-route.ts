import { Route } from "@angular/router";
import { logoutGuard } from "./logout--guard";


export const featureAuthRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import('./login').then(m => m.LoginComponent)  
    },
    {
        path: 'logout',
        canActivate: [logoutGuard],
        loadComponent: () => import('./logout.component').then(m => m.LogoutComponent)
        
    }
    

]