import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Article, ArticleDetail } from '@org/shared';
import { map } from 'rxjs';
import { ArticleApiService } from './article-api-service';

export const oneArticleResolver: ResolveFn<ArticleDetail | null> = (route) => {
  const slug= route.paramMap.get('slug');
  if (!slug) return null;
  return inject(ArticleApiService).getBySlug(slug).pipe(
    map((res) => {
      const { data, success, message } = res as unknown as Article;
      const articleDetail = data as unknown as ArticleDetail;
      return success && articleDetail ? articleDetail : null;
    })
  );
};
