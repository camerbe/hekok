import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@org/config';
import { AbstractCrudApi } from '@org/http';
import { Membre, MembreCreateDto, StatResponse } from '@org/shared';
import { AuthService } from '@org/auth';
import { switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MembreApiService extends AbstractCrudApi<Membre> {
 
  private readonly config = inject(APP_CONFIG);
  private readonly authService = inject(AuthService);
  protected override baseUrl: string = this.config.apiUrl + '/membres'  ;

  store(membre: MembreCreateDto) {
    return this.authService.csrf().pipe(
      switchMap(() => this.http.post<Membre>(this.baseUrl, membre, { withCredentials: true }))
    );
  }
  getStat(){
    return this.authService.csrf().pipe(
      switchMap(() => this.http.get<StatResponse>(`${this.baseUrl}/stat`, { withCredentials: true }))
    );
  }
}
