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
    return this.http.get<Article>(`${this.baseUrl}/pays/countries`);
  }
  getTypeArticles() {
    return this.http.get<Article>(`${this.baseUrl}/type/articles`);
  }
  searchArticle(value:string){
    return this.http.get<Article>(`${this.baseUrl}/search/${value}`);
  }
}
