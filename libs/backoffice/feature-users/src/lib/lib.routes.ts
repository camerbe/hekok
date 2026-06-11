import { Route } from '@angular/router';
import { FeatureUsers } from './feature-users/feature-users';
import { FeatureUsersList } from './feature-users/feature-users-list';
import { userListResolver,oneUserResolver } from '@org/user-api';

export const featureUsersRoutes: Route[] = [
  { 
    path: '', 
    component: FeatureUsers 
  },
  { 
    path: 'show/:id', 
    resolve: { oneUserResolver: oneUserResolver } ,
    component: FeatureUsers 
  },
  { 
    path: 'list', 
    resolve: { userListResolver: userListResolver } ,
    component: FeatureUsersList 
  },
  
];
