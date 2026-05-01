import { inject, Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { TypeMessage, TypeMessageCreateDto } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class TypeMessageApiService extends AbstractCrudApi<TypeMessage> {
 
  private readonly config = inject(APP_CONFIG);
  protected override baseUrl: string = this.config.apiUrl + '/typemessages'  ;

  store(payload: TypeMessageCreateDto) {
    return this.http.post<TypeMessage>(this.baseUrl, payload);  
  }
  
}
