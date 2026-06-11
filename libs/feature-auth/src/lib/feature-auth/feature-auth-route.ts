import { Route } from "@angular/router";
import { logoutGuard } from "./logout--guard";


export const featureAuthRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import('./login').then(m => m.LoginComponent)  
    },
    {
        path: 'reset-password/:token',
        loadComponent: () => import('./feature-users-upd-pw').then(m => m.FeatureUsersUpdPw)  
    },
    {
        path: 'email/verify',
        loadComponent: () => import('./feature-verify-email').then(m => m.FeatureVerifyEmail)  
    },
    
    {
        path: 'logout',
        canActivate: [logoutGuard],
        loadComponent: () => import('./logout.component').then(m => m.LogoutComponent)
        
    }
    

]