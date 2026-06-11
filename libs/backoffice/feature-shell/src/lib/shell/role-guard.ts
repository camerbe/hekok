import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@org/auth';
import { Role } from '@org/shared';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const allowedRoles = route.data['roles'] as Role[];
  // console.log('Allowed roles for this route:', allowedRoles);
  if (!allowedRoles) return true;
  // console.log('User role:', auth.getRole());
  // console.log('User has any allowed roles:', auth.hasRole(allowedRoles));
  return auth.hasRole(allowedRoles);
};
