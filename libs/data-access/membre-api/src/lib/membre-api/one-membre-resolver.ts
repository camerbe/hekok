import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Membre, MembreDetail } from '@org/shared';
import { map } from 'rxjs';
import { MembreApiService } from './membre-api.service';

export const oneMembreResolver: ResolveFn<MembreDetail | null> = (route) => {
  const membreId = route.paramMap.get('id');
  if (!membreId) return null;

  return inject(MembreApiService).getById(membreId).pipe(
    map((res) => {
      const { data, success, message } = res as unknown as Membre;
      const membreDetail = data as unknown as MembreDetail;
      return success && membreDetail ? membreDetail : null;
    })
  );
};
