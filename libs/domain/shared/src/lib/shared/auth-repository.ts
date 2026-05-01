import { Observable } from 'rxjs';
import { LoginCredentials } from './login-credentials';
import { UserApiResponse } from './user-detail';
export interface AuthRepository {
  login(credentials: LoginCredentials): Observable<UserApiResponse>;
  
  logout(): Observable<void>;

  isTokenExpired(): boolean;
  
  //refresh(refreshToken: string): Observable<AuthTokens>;
}