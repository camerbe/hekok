import { Injectable } from '@angular/core';
import { AbstractCrudApi } from '@org/http';
import { APP_CONFIG } from '@org/config';
import { Video } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class VideoApiService extends AbstractCrudApi<Video> {
  protected override baseUrl: string = APP_CONFIG + '/videos'  ;
  
}
