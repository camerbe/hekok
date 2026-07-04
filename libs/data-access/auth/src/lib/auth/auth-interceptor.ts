import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from './local-storage-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const localStorageService = inject(LocalStorageService);
   const token = localStorageService.getToken();
    if(token){
    const autReq = req.clone({
      /*withCredentials: true,*/ 
      setHeaders:{
        // 'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Headers':'*',
        // 'Content-Type':'application/json',
        // 'Accept':'*/*',
        // 'mode': 'no-cors',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        'Accept': 'application/json',
        //'Authorization':`Bearer ${token}`
      }
    });
    return next(autReq);
  }
  return next(req);
};
