import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Message, MessageDetail } from '@org/shared';
import { MessageApiService } from './message-api-service';
import { map } from 'rxjs';

export const messageListResolver: ResolveFn<MessageDetail[]> = () => {
  return inject(MessageApiService).getAll().pipe(map(res => {
    const tmpData = res as unknown as Message;
    const messages = tmpData['data'] as unknown as MessageDetail[];
    return messages?? null;
  })); 
};
