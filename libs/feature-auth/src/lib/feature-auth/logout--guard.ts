import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@org/auth';

export const logoutGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.logout(); 
  router.navigate(['/auth/login']);
  return false;
};
