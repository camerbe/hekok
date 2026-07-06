import { inject, Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { Video, VideoCreateDto } from '@org/shared';
import { AuthService } from '@org/auth';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoApiService extends AbstractCrudApi<Video> {
  private readonly config = inject(APP_CONFIG);
  private readonly authService = inject(AuthService);
  protected override baseUrl: string = this.config.apiUrl + '/videos'  ;

  store(video: VideoCreateDto) {
    return this.authService.csrf().pipe(
      switchMap(() => this.http.post<Video>(this.baseUrl, video, { withCredentials: true }))
    );
  }

  getRandomVideo() {
    return this.authService.csrf().pipe(
      switchMap(() => this.http.get<Video>(`${this.baseUrl}/one`, { withCredentials: true }))
    );
  }
  getVideoList() {
    return this.authService.csrf().pipe(
      switchMap(() => this.http.get<Video>(`${this.baseUrl}/list`, { withCredentials: true }))
    );
  }

}
