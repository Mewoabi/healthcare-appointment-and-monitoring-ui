import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Notification } from '../../models';
import { unwrap } from '../../http/api-response';
import { NotificationApi } from '../notification.api';

@Injectable()
export class HttpNotificationApi implements NotificationApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/notifications';

  mine(unreadOnly?: boolean): Observable<Notification[]> {
    let params = new HttpParams();
    if (unreadOnly) params = params.set('unreadOnly', 'true');
    return this.http.get<any>(`${this.base}/me`, { params }).pipe(
      unwrap(),
      map((page: any) => page.content ?? page),
    );
  }

  unreadCount(): Observable<number> {
    return this.http.get<any>(`${this.base}/me/unread-count`).pipe(
      unwrap(),
      map((data: any) => data.count),
    );
  }

  markRead(id: number): Observable<void> {
    return this.http.post<any>(`${this.base}/${id}/read`, {}).pipe(unwrap());
  }

  markAllRead(): Observable<void> {
    return this.http.post<any>(`${this.base}/me/read-all`, {}).pipe(unwrap());
  }
}
