import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminStats, AdminUser, AuditLog } from '../../models';
import { AdminApi } from '../admin.api';
import { SEED_ADMIN_STATS, SEED_ADMIN_USERS } from './seeds';

@Injectable()
export class MockAdminApi implements AdminApi {
  stats(): Observable<AdminStats> {
    return of({ ...SEED_ADMIN_STATS }).pipe(delay(environment.mockLatencyMs));
  }

  auditLogs(): Observable<AuditLog[]> {
    return of([
      { id: 1, timestamp: '2026-05-06T10:42:18Z', actor: 'Dr. Amara Okonkwo', action: 'UPDATE' as const, entity: 'VitalRecord', entityId: 2891, ip: '10.0.4.18', userAgent: 'Chrome 124 / macOS' },
      { id: 2, timestamp: '2026-05-06T10:38:05Z', actor: 'Maren Holloway', action: 'CREATE' as const, entity: 'VitalRecord', entityId: 2891, ip: '82.31.114.6', userAgent: 'Safari 17 / iOS' },
      { id: 3, timestamp: '2026-05-06T10:30:00Z', actor: 'system', action: 'CREATE' as const, entity: 'Notification', entityId: 9421, ip: '—', userAgent: 'scheduler' },
      { id: 4, timestamp: '2026-05-06T10:14:33Z', actor: 'admin@polaris.health', action: 'UPDATE' as const, entity: 'User', entityId: 87, ip: '10.0.0.5', userAgent: 'Firefox 124 / Linux' },
      { id: 5, timestamp: '2026-05-06T10:02:18Z', actor: 'Dr. Henrik Vasquez', action: 'READ' as const, entity: 'PatientProfile', entityId: 203, ip: '78.144.22.91', userAgent: 'Chrome 124 / Win 11' },
      { id: 6, timestamp: '2026-05-06T09:58:11Z', actor: 'Dr. Henrik Vasquez', action: 'LOGIN' as const, entity: '—', entityId: null, ip: '78.144.22.91', userAgent: 'Chrome 124 / Win 11' },
      { id: 7, timestamp: '2026-05-06T09:46:52Z', actor: 'Dr. Pia Sundqvist', action: 'UPDATE' as const, entity: 'Appointment', entityId: 1124, ip: '78.144.22.110', userAgent: 'Chrome 124 / macOS' },
      { id: 8, timestamp: '2026-05-06T09:30:01Z', actor: 'system', action: 'CREATE' as const, entity: 'Notification', entityId: 9418, ip: '—', userAgent: 'scheduler' },
      { id: 9, timestamp: '2026-05-06T09:18:44Z', actor: 'Maren Holloway', action: 'LOGIN' as const, entity: '—', entityId: null, ip: '82.31.114.6', userAgent: 'Safari 17 / iOS' },
      { id: 10, timestamp: '2026-05-06T08:52:30Z', actor: 'admin@polaris.health', action: 'UPDATE' as const, entity: 'DoctorProfile', entityId: 32, ip: '10.0.0.5', userAgent: 'Firefox 124 / Linux' },
    ]).pipe(delay(environment.mockLatencyMs));
  }

  users(): Observable<AdminUser[]> {
    return of([...SEED_ADMIN_USERS]).pipe(delay(environment.mockLatencyMs));
  }
}
