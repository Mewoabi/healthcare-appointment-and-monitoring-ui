import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models';

export interface NotificationApi {
  mine(unreadOnly?: boolean): Observable<Notification[]>;
  unreadCount(): Observable<number>;
  markRead(id: number): Observable<void>;
  markAllRead(): Observable<void>;
}

export const NOTIFICATION_API = new InjectionToken<NotificationApi>('NOTIFICATION_API');
