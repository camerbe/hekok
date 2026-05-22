import { inject, Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { Message, MessageCreateDto, TypeMessage } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService extends AbstractCrudApi<Message> {
  private readonly config = inject(APP_CONFIG);
  protected override baseUrl: string = this.config.apiUrl + '/messages'  ;
  

  store(payload: MessageCreateDto) {
    return this.http.post<Message>(this.baseUrl, payload);  
  }
  getTypemessages() {
    return this.http.get<TypeMessage[]>(this.config.apiUrl + '/messagetype');
  }
  getAGmessage() {
    return this.http.get<Message>(this.baseUrl + '/ag');
  }
  
}
