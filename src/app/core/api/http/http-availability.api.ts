import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AvailabilitySlot, BookableSlot } from '../../models';
import { unwrap } from '../../http/api-response';
import { AvailabilityApi } from '../availability.api';

@Injectable()
export class HttpAvailabilityApi implements AvailabilityApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  list(doctorId: number): Observable<AvailabilitySlot[]> {
    return this.http.get<any>(`${this.base}/doctors/${doctorId}/availability`).pipe(unwrap());
  }

  create(doctorId: number, slot: Partial<AvailabilitySlot>): Observable<AvailabilitySlot> {
    return this.http.post<any>(`${this.base}/doctors/${doctorId}/availability`, slot).pipe(unwrap());
  }

  update(id: number, slot: Partial<AvailabilitySlot>): Observable<AvailabilitySlot> {
    return this.http.patch<any>(`${this.base}/availability/${id}`, slot).pipe(unwrap());
  }

  remove(id: number): Observable<void> {
    return this.http.delete<any>(`${this.base}/availability/${id}`).pipe(unwrap());
  }

  bookableSlots(doctorId: number, date: string): Observable<BookableSlot[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<any>(`${this.base}/doctors/${doctorId}/bookable-slots`, { params }).pipe(unwrap());
  }
}
