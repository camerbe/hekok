import { computed, inject, PLATFORM_ID } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState,withHooks } from '@ngrx/signals';
import { ArticleDetail, StatResponse, UserDetail, VideoDetail } from '@org/shared';
import { ArticleApiService } from '@org/article-api';
import { MembreApiService } from '@org/membre-api';
import { VideoApiService } from '@org/video-api';
import { isPlatformBrowser } from '@angular/common';
import { UserApiService } from '@org/user-api';  
type HomeState = {
  
  news: ArticleDetail[];
  //cinema: VideoDetail[];
  team: UserDetail[]; // Replace with actual team member type
  stats: StatResponse;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}
const initialState: HomeState = {
  // Initialize your home state here
  news: [],
  //cinema: [],
  team: [],
  stats: { success: false, data: { actifs: 0, histoire: 0 } },
  loading: false,
  error: null,
  loaded: false
};


export const HomeStore= signalStore(
  { providedIn: 'root' },

  withState(initialState),
  withComputed((store) => {
    const culture = computed(() => {
      return store.news().filter(article => article.typearticles?.typearticle?.toLowerCase() === 'peuple banen' || article.typearticles?.typearticle?.toLowerCase() === 'langue' || article.typearticles?.typearticle?.toLowerCase() === 'territoire');
    });
    const communautes = computed(() => {
      return store.news().filter(article => article.typearticles?.typearticle?.toLowerCase() === 'ndikiniméki' ||
      article.typearticles?.typearticle?.toLowerCase() === 'nitoukou' ||
      article.typearticles?.typearticle?.toLowerCase() === 'yingui');
    });
    const communautesMap = computed(() => {
      const map: Record<string, { image?: string; link?: string }> = {};
      const tmpCommunautes = communautes();
      for (const c of tmpCommunautes) {
        const key = c.typearticles?.typearticle?.toLowerCase();
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

    return {
      banenNews: computed(() => store.news().filter(article => article.typearticles?.typearticle?.toLowerCase() === 'article')),
      culture : computed(() => {
      return store.news().filter(article => article.typearticles?.typearticle?.toLowerCase() === 'peuple banen' || article.typearticles?.typearticle?.toLowerCase() === 'langue' || article.typearticles?.typearticle?.toLowerCase() === 'territoire');
      }),
      isLoading: computed(() => store.loading()),
      hasError: computed(() => !!store.error()),
      communautesMap,
      imgNdiki: computed(() => communautesMap()['ndikiniméki']?.image),
      imgNitoukou: computed(() => communautesMap()['nitoukou']?.image),
      imgYingui: computed(() => communautesMap()['yingui']?.image),
      linkNdiki: computed(() => communautesMap()['ndikiniméki']?.link),
      linkNitoukou: computed(() => communautesMap()['nitoukou']?.link),
      linkYingui: computed(() => communautesMap()['yingui']?.link),
    };
  }),
  withMethods((store,membreService = inject(MembreApiService),articleService = inject(ArticleApiService),
    platformId = inject(PLATFORM_ID),
    //videoService = inject(VideoApiService),
    userService = inject(UserApiService)
  )=>({
    // Define your methods here
    loadNews() {
      patchState(store, { loading: true, error: null });
      articleService.getAllBanen().subscribe({
        next: (news) => {
          patchState(store, { news: news.data as unknown as ArticleDetail[], loading: false });
        },
        error: (error) => {
          patchState(store, { error: 'Failed to load news', loading: false });
        }
       });
    },
    loadStats() {
      membreService.getStat().subscribe({
        next: (stats) => {
          patchState(store, { stats,loading: false });
        },
        error: (error) => {
          patchState(store, { error: 'Failed to load stats', loading: false });
        }
       });
    },
    // loadCinema() {
    //     if (!isPlatformBrowser(platformId)) return;
    //     patchState(store, { loading: true, error: null });
    //     videoService.getVideoList().subscribe({
    //       next: (cinema) => {
    //         patchState(store, { cinema: cinema.data as unknown as VideoDetail[], loading: false });
    //       },
    //       error: (error) => {
    //         patchState(store, { error: 'Failed to load cinema', loading: false });
    //       }
    //      });
    //   },
      loadTeam() {
        if (!isPlatformBrowser(platformId)) return;
        patchState(store, { loading: true, error: null });
        userService.getTeam().subscribe({
          next: (team) => {
            patchState(store, { team: team.data as unknown as UserDetail[], loading: false });
          },
          error: (error) => {
            patchState(store, { error: 'Failed to load team', loading: false });
          }
         });
      },

  })),
  withHooks({
    
    onInit(store) {
      const platformId = inject(PLATFORM_ID);
       if (!isPlatformBrowser(platformId)) return;
      store.loadNews();
      store.loadStats();
      //store.loadCinema();
      store.loadTeam();
    }
  })
);


