import { ResolveFn } from '@angular/router';
import { TypeMessage, TypeMessageDetail } from '@org/shared';
import { TypeMessageApiService } from './type-message-api-service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const oneTypeMessageResolver: ResolveFn<TypeMessageDetail | null> = (route) => {
  const id = route.paramMap.get('id');
  if (!id) return null;
  return inject(TypeMessageApiService).     getById(id).pipe(
    map((res) => {
      const { data, success, message } = res as unknown as TypeMessage;
      const typemessage = data as unknown as TypeMessageDetail;
      return success && typemessage ? typemessage : null;
    })
  );  
 
};
