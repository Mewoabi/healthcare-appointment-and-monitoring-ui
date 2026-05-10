import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminStats, AdminUser, AuditLog } from '../../models';
import { unwrap } from '../../http/api-response';
import { AdminApi } from '../admin.api';

@Injectable()
export class HttpAdminApi implements AdminApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/admin';

  stats(): Observable<AdminStats> {
    return this.http.get<any>(`${this.base}/stats`).pipe(unwrap());
  }

  auditLogs(): Observable<AuditLog[]> {
    return this.http.get<any>(`${this.base}/audit`).pipe(
      unwrap(),
      map((page: any) => page.content ?? page),
    );
  }

  users(): Observable<AdminUser[]> {
    return this.http.get<any>(`${environment.apiBaseUrl}/users`).pipe(
      unwrap(),
      map((page: any) => page.content ?? page),
    );
  }
}
