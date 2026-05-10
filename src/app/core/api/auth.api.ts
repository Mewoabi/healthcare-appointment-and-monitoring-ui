import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, AuthUser } from '../models';

export interface AuthApi {
  login(email: string, password: string): Observable<AuthResponse>;
  register(name: string, email: string, password: string, role: string): Observable<AuthResponse>;
  logout(): Observable<void>;
  me(): Observable<AuthUser>;
}

export const AUTH_API = new InjectionToken<AuthApi>('AUTH_API');
