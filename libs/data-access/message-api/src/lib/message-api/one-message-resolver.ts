import { ResolveFn } from '@angular/router';
import { Message, MessageDetail } from '@org/shared';
import { MessageApiService } from './message-api-service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const oneMessageResolver: ResolveFn<MessageDetail|null> = (route) => {
  const messageId = route.paramMap.get('id');
  if (!messageId) return null;
  return inject(MessageApiService).getById(messageId).pipe(
    map((res) => {
      const { data, success, message } = res as unknown as Message;
      const messageDetail = data as unknown as MessageDetail;
      return success && messageDetail ? messageDetail : null;
    })
  );
 
};
