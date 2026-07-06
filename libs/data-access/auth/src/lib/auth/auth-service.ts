import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository, LoginCredentials,User, UserApiResponse,Role, ROLE_PERMISSIONS } from '@org/shared';  
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { APP_CONFIG } from '@org/config';
import { LocalStorageService } from './local-storage-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthRepository {

  private http=inject(HttpClient);
  private config=inject(APP_CONFIG);
  private userRole:Role='Pre';
  private localStorageService=inject(LocalStorageService);

  login(credentials: LoginCredentials): Observable<UserApiResponse> {
     return this.http.post<UserApiResponse>(`${this.config.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap(res => {
        const { message, success, token, user } = res;
        this.localStorageService.setToken(res.token);
        this.localStorageService.setRole(res.user.role);
        this.localStorageService.setName(res.user.nom+' '+res.user.prenom);
        this.userRole = res.user.role as Role;
        const expiresInMs = 1 * 60 * 60 * 1000;
        this.localStorageService.setExpiredTime(Date.now() + expiresInMs);

      }),
      //map(res =>res.data),  
      catchError(err => throwError(() => err))
    );
  }
  logout(): Observable<void> {
    const token = this.localStorageService.getToken();
    this.localStorageService.removeToken();
    return this.http.post<void>(`${this.config.apiUrl}/logout`, { token: token });
  }
  isTokenExpired(): boolean {
    const expiredTime = this.localStorageService.getExpiredTime();
    console.log('Expired time:', expiredTime);
    console.log('isExpired:', !expiredTime || Date.now() > expiredTime);
    return !expiredTime || Date.now() > expiredTime;
  }
  csrf() {
    return this.http.get(`${this.config.baseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
  }

  forgotPassword(data: any) {
    return this.csrf().pipe(
      switchMap(() => this.http.post(`${this.config.apiUrl}/forgot-password`, data, { withCredentials: true }))
    );
  }
   
  resetPassword(data: any) {
    return this.csrf().pipe(
      switchMap(() => this.http.post(`${this.config.apiUrl}/reset-password`, data, { withCredentials: true }))
    );
  }
   
  verifyEmail(url: string) {
    console.log(`${url}`);
    return this.csrf().pipe(
      switchMap(() => this.http.get(`${url}`, { withCredentials: true }))
    );
  } 

  getRole():Role  {
    return this.userRole;
  }

  hasRole(roles: Role[]): boolean {
    return roles.includes(this.userRole);
  }

  hasPermission(permission: string): boolean {
   const perms = ROLE_PERMISSIONS[this.userRole] as Record<string, boolean> | undefined;
   return perms?.[permission] ?? false;
  }
}