import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Video, VideoDetail } from '@org/shared';
import { map } from 'rxjs';
import { VideoApiService } from './video-api-service';

export const videoIdResolver: ResolveFn<VideoDetail | null> = (route) => {
  const id= route.paramMap.get('id');
  return inject(VideoApiService).getById(id!).pipe(
    map((res) => {
      const { data, success } = res as unknown as Video;
      const videoDetail = data as unknown as VideoDetail;
      return success && videoDetail ? videoDetail : null;
    })
  );
};
