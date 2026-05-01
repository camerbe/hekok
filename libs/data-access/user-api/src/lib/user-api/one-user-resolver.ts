import { ResolveFn } from '@angular/router';
import { UserApiService } from './user-api-service';
import { inject } from '@angular/core';
import { UserDetail, UserListResponse } from '@org/shared';
import { map } from 'rxjs';

export const oneUserResolver: ResolveFn<UserDetail | null> = (route) => {
  const userId = route.paramMap.get('id');
  if (!userId)  return null;
  return inject(UserApiService).getById(userId).pipe(
    map((res) => {
      const { data,success,message } = res as unknown as UserListResponse
      const user = data as unknown as UserDetail;
      return success && user ? user : null;
    }
  ));
};
