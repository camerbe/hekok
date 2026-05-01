import { ResolveFn } from '@angular/router';
import { TypeArticleDetail, TypeMessage } from '@org/shared';
import { TypeMessageApiService } from './type-message-api-service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const typeMessageListResolver: ResolveFn<TypeArticleDetail[]> = () => {
  return inject(TypeMessageApiService).getAll().pipe(
    map(res => {
      const tmpData = res as unknown as TypeMessage;
      const typemessages = tmpData['data'] as unknown as TypeArticleDetail[];
      return typemessages ?? null;
    })
  );
  
};
