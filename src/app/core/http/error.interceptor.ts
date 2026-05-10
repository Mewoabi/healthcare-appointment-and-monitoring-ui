import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../stores/auth.store';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        authStore.clearAuth();
        router.navigate(['/auth']);
      }
      return throwError(() => err);
    }),
  );
};
