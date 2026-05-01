import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@org/config';
import { AbstractCrudApi } from '@org/http';
import { Membre, MembreCreateDto } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class MembreApiService extends AbstractCrudApi<Membre> {
 
   private readonly config = inject(APP_CONFIG);
  protected override baseUrl: string = this.config.apiUrl + '/membres'  ;

  store(membre: MembreCreateDto) {
    return this.http.post<Membre>(this.baseUrl, membre);
  }

}
