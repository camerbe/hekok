import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Membre, MembreDetail } from '@org/shared';
import { MembreApiService } from './membre-api.service';
import { map } from 'rxjs';

export const membreListResolver: ResolveFn<MembreDetail[]> = () => {

  return inject(MembreApiService).getAll().pipe(map(res => {
    const tmpData = res as unknown as Membre;
    const membres = tmpData['data'] as unknown as MembreDetail[];
    return membres?? null;
  }));
};
