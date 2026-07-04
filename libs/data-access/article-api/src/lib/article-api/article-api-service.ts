import { inject, Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { Article, ArticleCreateDto } from '@org/shared';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleApiService extends AbstractCrudApi<Article> {
  private readonly config = inject(APP_CONFIG);
  protected override baseUrl: string = this.config.apiUrl + '/articles'  ;

  private ensureCsrf() {
    return this.http.get(`${this.config.baseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
  }

  store(article: ArticleCreateDto) {
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.post<Article>(this.baseUrl, article, { withCredentials: true }))
    );
    //return this.http.post<Article>(this.baseUrl, article);
  }
  getBySlug(slug: string) {
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.get<Article>(`${this.baseUrl}/slug/${slug}`, {
        withCredentials: true
      }))
    );
  }
  getCountries() {
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.get<Article>(`${this.baseUrl}/pays/countries`, {
        withCredentials: true
      }))
    );
  }
  getTypeArticles() {
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.get<Article>(`${this.baseUrl}/type/articles`, {
        withCredentials: true
      }))
    );
  }
  // getCommunautes() {
  //   return this.http.get<Article>(`${this.baseUrl}/banen`);
  // }
  getAllBanen() {
    
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.get<Article>(`${this.baseUrl}/banen`, {
        withCredentials: true
      }))
    );
  }
  getNews() {
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.get<Article>(`${this.baseUrl}/news`, {
        withCredentials: true
      }))
    );
  }
  getMostReaded() {
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.get<Article>(`${this.baseUrl}/mostreaded`, {
        withCredentials: true
      }))
    );
  }
  searchArticle(value:string){
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.get<Article>(`${this.baseUrl}/search/${value}`, {
        withCredentials: true
      }))
    );
  }
  getCulture() {
    //console.log('getCulture banen called');
    return this.ensureCsrf().pipe(
      switchMap(() => this.http.get<Article>(`${this.baseUrl}/culture/banen`, {
        withCredentials: true
      }))
    );
  }

}
