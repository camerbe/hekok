import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractCrudApi<T> {
  protected abstract readonly baseUrl: string;

  protected readonly http=inject(HttpClient);

  protected handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl).pipe(
      catchError(this.handleError)
      );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
      );
  }
  
  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item).pipe(
      catchError(this.handleError)
      );
  } 

  update(id: string, item:T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item).pipe(
      catchError(this.handleError)
      );
  }

  patch(id: string, item: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${id}`, item).pipe(
      catchError(this.handleError)
      );
  }
  
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
      );
  } 

  

}
