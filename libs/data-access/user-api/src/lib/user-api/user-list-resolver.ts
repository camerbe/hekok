import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User, UserDetail } from '@org/shared';
import { UserApiService } from './user-api-service';
import { map } from 'rxjs';


export const userListResolver: ResolveFn<UserDetail[]> = () => {
  return inject(UserApiService).getAll().pipe(
    map(res => {
      const tmpData = res as unknown as User
      const users = tmpData['data'] as unknown as  UserDetail[];
      return users?? null;
    }) 
  );
};
