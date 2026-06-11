import { ResolveFn } from '@angular/router';
import { Video, VideoDetail } from '@org/shared';
import { VideoApiService } from './video-api-service';
import { map } from 'rxjs';
import { inject } from '@angular/core';

export const videoListResolver: ResolveFn<VideoDetail[]|null> = () => {
  return inject(VideoApiService).getAll().pipe(map(res => {
        const { data } = res as unknown as Video;
        const videos = data as unknown as VideoDetail[];
    return videos?? null;
  }));
};
