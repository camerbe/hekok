import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Article, ArticleDetail } from '@org/shared';
import { map } from 'rxjs';
import { ArticleApiService } from './article-api-service';

export const articleByIdResolver: ResolveFn<ArticleDetail | null> = (route) => {
  const articleId= route.paramMap.get('id');
  if (!articleId) return null;
   return inject(ArticleApiService).getById(articleId).pipe(
    map((res) => {
      const { data, success, message } = res as unknown as Article;
      const articleDetail = data as unknown as ArticleDetail;
      return success && articleDetail ? articleDetail : null;
    })
  );
};
