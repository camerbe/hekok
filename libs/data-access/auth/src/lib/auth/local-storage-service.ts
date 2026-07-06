import { Injectable } from "@angular/core";


const TOKEN='sanctumToken';
const ROLE='role';
const NAME='name';
const EXPIRED_TIME='expiredTime';
const EMAIL='email';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setToken(data:string){
    localStorage.setItem(TOKEN,data);
  }
  setRole(data:string){    
    localStorage.setItem(ROLE,data);    
  }
  setName(data:string){
    localStorage.setItem(NAME,data);
  }
  setExpiredTime(time: number) {
    localStorage.setItem(EXPIRED_TIME, time.toString());
  }
  setEmail(email: string) {
    localStorage.setItem(EMAIL, email);
  }

  getExpiredTime(): number | null {
    const value = localStorage.getItem(EXPIRED_TIME);
    return value ? Number(value) : null;
  }
  getToken():string{
    return localStorage.getItem(TOKEN) || '';
  }
  getRole():string{
    return localStorage.getItem(ROLE) || '';
    
  }
  getName():string{
    return localStorage.getItem(NAME) || '';
    
  }
  getEmail():string{
    return localStorage.getItem(EMAIL) || '';
  }
  removeEmail(){
    localStorage.removeItem(EMAIL);
  }
  removeToken(){
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(ROLE);
    localStorage.removeItem(NAME);
    localStorage.removeItem(EXPIRED_TIME);
  }
}