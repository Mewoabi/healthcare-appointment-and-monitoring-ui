import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Notification } from '../../models';
import { NotificationApi } from '../notification.api';
import { SEED_NOTIFICATIONS } from './seeds';

@Injectable()
export class MockNotificationApi implements NotificationApi {
  private notifications = [...SEED_NOTIFICATIONS];

  mine(unreadOnly?: boolean): Observable<Notification[]> {
    let result = [...this.notifications];
    if (unreadOnly) result = result.filter((n) => n.unread);
    return of(result).pipe(delay(environment.mockLatencyMs));
  }

  unreadCount(): Observable<number> {
    return of(this.notifications.filter((n) => n.unread).length).pipe(delay(environment.mockLatencyMs));
  }

  markRead(id: number): Observable<void> {
    const idx = this.notifications.findIndex((n) => n.id === id);
    if (idx >= 0) this.notifications[idx] = { ...this.notifications[idx], unread: false };
    return of(undefined).pipe(delay(environment.mockLatencyMs));
  }

  markAllRead(): Observable<void> {
    this.notifications = this.notifications.map((n) => ({ ...n, unread: false }));
    return of(undefined).pipe(delay(environment.mockLatencyMs));
  }
}
