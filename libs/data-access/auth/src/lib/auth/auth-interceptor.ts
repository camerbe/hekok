import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from './local-storage-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const localStorageService = inject(LocalStorageService);
   const token = localStorageService.getToken();
   console.log('Token at request time:', token);
    if(token){
    const autReq = req.clone({
      withCredentials: true,
      setHeaders:{
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Credentials': 'true',
         'Access-Control-Allow-Headers':'*',
         'Content-Type':'application/json',
        //'X-Auth-Token':`${token}`,
        // 'mode': 'no-cors',
        ...(token ? { 'X-Auth-Token': `Bearer ${token}` } : {}),
        //...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        'Accept': 'application/json',
        //'Authorization':`Bearer ${token}`
      }
    });
    return next(autReq);
  }
  return next(req);
};
