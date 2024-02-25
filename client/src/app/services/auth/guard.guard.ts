import { CanActivateFn } from '@angular/router';
import {AuthService} from "../auth.service";
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import {map} from "rxjs";

export const isUserLoggedIn: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("essa");
  return authService.loggedIn.pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/auth/signin']);
        return false;
      }

      return true;
    })
  );
};

export const isUserAdmin: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("essa");
  return authService.isAdmin().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/auth/signin']);
        return false;
      }

      return true;
    })
  );
};
export const isManagerOrAdmin: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("essa");
  return authService.isAdminOrManager().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/auth/signin']);
        return false;
      }

      return true;
    })
  );
};
