import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Article, ArticleDetail } from '@org/shared';
import { ArticleApiService } from './article-api-service';
import { map } from 'rxjs';

export const articleListResolver: ResolveFn<ArticleDetail[] | null> = () => {
  return inject(ArticleApiService).getAll().pipe(map(res => {
    const { data ,success, message} = res as unknown as Article;
    const articles = data as unknown as ArticleDetail[];
    return articles?? null;
  }));
};
