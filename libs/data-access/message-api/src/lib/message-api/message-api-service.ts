import { inject, Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { Message, MessageCreateDto, TypeMessage } from '@org/shared';
import { AuthService } from '@org/auth';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService extends AbstractCrudApi<Message> {
  private readonly config = inject(APP_CONFIG);
  private readonly authService = inject(AuthService);
  protected override baseUrl: string = this.config.apiUrl + '/messages'  ;
  
  

  store(payload: MessageCreateDto) {
    return this.authService.csrf().pipe(
      switchMap(() => this.http.post<Message>(this.baseUrl, payload, { withCredentials: true }))
    );
  }
  getTypemessages() {
    return this.authService.csrf().pipe(
      switchMap(() => this.http.get<TypeMessage[]>(this.config.apiUrl + '/messagetype', { withCredentials: true }))
    );
  }
  getAGmessage() {
    return this.authService.csrf().pipe(
      switchMap(() => this.http.get<Message>(this.baseUrl + '/ag', { withCredentials: true }))
    );
  }
  
}
