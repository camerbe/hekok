import { inject, Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { User, UserCreateDto,UserListResponse } from '@org/shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends AbstractCrudApi<UserListResponse> {
  private readonly config = inject(APP_CONFIG);
  protected override baseUrl: string = this.config.apiUrl + '/users'  ;
  protected  baseUrlRegister: string = this.config.apiUrl  + '/register'  ;
  
  register(user: UserCreateDto) {
    return this.http.post<User>(this.baseUrlRegister, user)
    .pipe( map((res) => {
      return res.data
    }));  
  }
  getTeam() {
    return this.http.get<User>(`${this.baseUrl}/team`);
     
  }
  
}
