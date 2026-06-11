import { inject, Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { Video, VideoCreateDto } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class VideoApiService extends AbstractCrudApi<Video> {
   private readonly config = inject(APP_CONFIG);
  protected override baseUrl: string = this.config.apiUrl + '/videos'  ;

  store(video: VideoCreateDto) {
    return this.http.post<Video>(this.baseUrl, video);
  }

  getRandomVideo() {
    return this.http.get<Video>(`${this.baseUrl}/one`);
  }
  getVideoList() {
    return this.http.get<Video>(`${this.baseUrl}/list`);
  }
  
}
