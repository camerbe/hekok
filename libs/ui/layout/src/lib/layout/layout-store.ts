import { Injectable, signal, inject, computed } from '@angular/core';
import { MembreApiService } from '@org/membre-api';
import { ArticleApiService } from '@org/article-api';
import { ArticleDetail } from '@org/shared';

import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutStore {
  // STATE
  private readonly _membreactif = signal<number>(0);
  private readonly _duree = signal<number>(0);
  private readonly _communautes = signal<ArticleDetail[]>([]);
  private readonly _news = signal<ArticleDetail[]>([]);
  // SELECTORS (public)
  readonly membreactif = this._membreactif.asReadonly();
  readonly duree = this._duree.asReadonly();
  readonly news = this._news.asReadonly();

  // use inject() to satisfy @angular-eslint/prefer-inject
  private readonly membreService = inject(MembreApiService);
  private readonly articleService = inject(ArticleApiService);
  
  // 🔥 CORE: computed map (single source of truth)
  readonly communautesMap = computed(() => {
    const map: Record<string, { image?: string; link?: string }> = {};

    for (const c of this._communautes()) {
      const key = c.typearticles?.typearticle?.toLowerCase();

      // console.log('API ITEM →', c);
      // console.log('KEY →', key);

      if (!key) continue;

      const type = c.typearticles?.typearticle?.toLowerCase();
      const slug = c.slug;

      map[key] = {
        image: c.image ?? undefined,
        link: type && slug ? `${slug}` : undefined
      };
    }

    return map;
  });

   // 🎯 derived selectors (clean API)
  readonly imgNdiki = computed(() => this.communautesMap()['ndikiniméki']?.image);
  readonly imgNitoukou = computed(() => this.communautesMap()['nitoukou']?.image);
  readonly imgYingui = computed(() => this.communautesMap()['yingui']?.image);

  readonly linkNdiki = computed(() => this.communautesMap()['ndikiniméki']?.link);
  readonly linkNitoukou = computed(() => this.communautesMap()['nitoukou']?.link);
  readonly linkYingui = computed(() => this.communautesMap()['yingui']?.link);

  // ACTION
  load() {
    forkJoin({
      stats: this.membreService.getStat(),
      communautes: this.articleService.getCommunautes(),
      news: this.articleService.getNews()
    }).subscribe({
      next: ({ stats, communautes, news }) => {
        const { actifs, histoire } = stats.data;

        this._membreactif.set(actifs);
        this._duree.set(histoire);
        
        this._communautes.set(communautes.data as unknown as ArticleDetail[]);
        
        this._news.set(news.data as unknown as ArticleDetail[]);
      },
      error: (err) => console.error(err)
    });
  }
  
}
