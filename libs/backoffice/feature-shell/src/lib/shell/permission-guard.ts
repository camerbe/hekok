import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@org/auth';

export const permissionGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const permission = route.data?.['permission'] as keyof Permissions;
  if (!permission) return true;
  return auth.hasPermission(permission);
};
