import { Injectable } from "@angular/core";


const TOKEN='sanctumToken';
const ROLE='role';
const NAME='name';
const EXPIRED_TIME='expiredTime';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setToken(data:string){
    sessionStorage.setItem(TOKEN,data);
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

  getExpiredTime(): number | null {
    const value = localStorage.getItem(EXPIRED_TIME);
    return value ? Number(value) : null;
  }
  getToken():string{
    return sessionStorage.getItem(TOKEN) || '';
  }
  getRole():string{
    return localStorage.getItem(ROLE) || '';
    
  }
  getName():string{
    return localStorage.getItem(NAME) || '';
    
  }
  removeToken(){
    sessionStorage.removeItem(TOKEN);
    localStorage.removeItem(ROLE);
    localStorage.removeItem(NAME);
    localStorage.removeItem(EXPIRED_TIME);
  }
}