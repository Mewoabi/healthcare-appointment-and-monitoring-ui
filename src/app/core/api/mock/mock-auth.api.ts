import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, AuthUser } from '../../models';
import { AuthApi } from '../auth.api';

@Injectable()
export class MockAuthApi implements AuthApi {
  private mockUser(email: string): AuthUser {
    const isDoctor = email.includes('@polaris.health') || email.toLowerCase().startsWith('dr');
    const isAdmin = email.startsWith('admin');
    return {
      id: 1,
      name: isAdmin ? 'Admin User' : isDoctor ? 'Dr. Amara Okonkwo' : 'Maren Holloway',
      email,
      role: isAdmin ? 'ADMIN' : isDoctor ? 'DOCTOR' : 'PATIENT',
      active: true,
      emailVerified: true,
    };
  }

  login(email: string, _password: string): Observable<AuthResponse> {
    const user = this.mockUser(email);
    return of({
      token: 'mock-jwt-token-' + Date.now(),
      user,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    }).pipe(delay(environment.mockLatencyMs));
  }

  register(name: string, email: string, _password: string, role: string): Observable<AuthResponse> {
    return of({
      token: 'mock-jwt-token-' + Date.now(),
      user: { id: 99, name, email, role: role as AuthUser['role'], active: true, emailVerified: false },
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    }).pipe(delay(environment.mockLatencyMs));
  }

  logout(): Observable<void> {
    return of(undefined).pipe(delay(environment.mockLatencyMs));
  }

  me(): Observable<AuthUser> {
    const stored = localStorage.getItem('polaris.user');
    const user: AuthUser = stored
      ? JSON.parse(stored)
      : { id: 1, name: 'Maren Holloway', email: 'maren.h@example.com', role: 'PATIENT', active: true, emailVerified: true };
    return of(user).pipe(delay(environment.mockLatencyMs));
  }
}
