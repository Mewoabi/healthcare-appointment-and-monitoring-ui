import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, AuthUser } from '../../models';
import { unwrap } from '../../http/api-response';
import { AuthApi } from '../auth.api';

@Injectable()
export class HttpAuthApi implements AuthApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/auth';

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<any>(`${this.base}/login`, { email, password }).pipe(unwrap());
  }

  register(name: string, email: string, password: string, role: string): Observable<AuthResponse> {
    return this.http.post<any>(`${this.base}/register`, { name, email, password, role }).pipe(unwrap());
  }

  logout(): Observable<void> {
    return this.http.post<any>(`${this.base}/logout`, {}).pipe(unwrap());
  }

  me(): Observable<AuthUser> {
    return this.http.get<any>(`${this.base}/me`).pipe(unwrap());
  }
}
