import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminStats, AdminUser, AuditLog } from '../models';

export interface AdminApi {
  stats(): Observable<AdminStats>;
  auditLogs(): Observable<AuditLog[]>;
  users(): Observable<AdminUser[]>;
}

export const ADMIN_API = new InjectionToken<AdminApi>('ADMIN_API');
