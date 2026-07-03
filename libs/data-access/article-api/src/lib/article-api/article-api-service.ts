import { inject, Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { Article, ArticleCreateDto } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class ArticleApiService extends AbstractCrudApi<Article> {
  private readonly config = inject(APP_CONFIG);
  protected override baseUrl: string = this.config.apiUrl + '/articles'  ;

  store(article: ArticleCreateDto) {
    return this.http.post<Article>(this.baseUrl, article);
  }
  getBySlug(slug: string) {
    return this.http.get<Article>(`${this.baseUrl}/slug/${slug}`);
  }
  getCountries() {
    return this.http.get<Article>(`${this.baseUrl}/pays/countries`, {
    withCredentials: true
  });
  }
  getTypeArticles() {
    return this.http.get<Article>(`${this.baseUrl}/type/articles`, {
      withCredentials: true
    });
  }
  // getCommunautes() {
  //   return this.http.get<Article>(`${this.baseUrl}/banen`);
  // }
  getAllBanen() {
    
    return this.http.get<Article>(`${this.baseUrl}/banen`);
  }
  getNews() {
    return this.http.get<Article>(`${this.baseUrl}/news`);
  }
  getMostReaded() {
    return this.http.get<Article>(`${this.baseUrl}/mostreaded`);
  }
  searchArticle(value:string){
    return this.http.get<Article>(`${this.baseUrl}/search/${value}`);
  }
  getCulture() {
    //console.log('getCulture banen called');
    return this.http.get<Article>(`${this.baseUrl}/culture/banen`);
  }

}
