import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Appointment, CalendarEvent, ScheduleSlot } from '../../models';
import { unwrap } from '../../http/api-response';
import { AppointmentApi } from '../appointment.api';
import { toAppointment } from './adapters';

@Injectable()
export class HttpAppointmentApi implements AppointmentApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/appointments';

  myUpcoming(): Observable<Appointment[]> {
    return this.http.get<any>(`${this.base}/me/upcoming`).pipe(
      unwrap<any[]>(),
      map((list) => list.map(toAppointment)),
    );
  }

  search(params?: { patientId?: number; doctorId?: number; status?: string }): Observable<Appointment[]> {
    let hp = new HttpParams();
    if (params?.patientId) hp = hp.set('patientId', params.patientId);
    if (params?.doctorId) hp = hp.set('doctorId', params.doctorId);
    if (params?.status) hp = hp.set('status', params.status);
    return this.http.get<any>(this.base, { params: hp }).pipe(
      unwrap(),
      map((page: any) => (page.content ?? page).map(toAppointment)),
    );
  }

  get(id: number): Observable<Appointment> {
    return this.http.get<any>(`${this.base}/${id}`).pipe(unwrap(), map(toAppointment));
  }

  book(req: { doctorId: number; scheduledAt: string; reason: string; isVirtual?: boolean; durationMinutes?: number }): Observable<Appointment> {
    return this.http.post<any>(this.base, req).pipe(unwrap(), map(toAppointment));
  }

  cancel(id: number, reason: string): Observable<Appointment> {
    return this.http.post<any>(`${this.base}/${id}/cancel`, { reason }).pipe(unwrap(), map(toAppointment));
  }

  confirm(id: number): Observable<Appointment> {
    return this.http.post<any>(`${this.base}/${id}/confirm`, {}).pipe(unwrap(), map(toAppointment));
  }

  complete(id: number, notes?: string): Observable<Appointment> {
    return this.http.post<any>(`${this.base}/${id}/complete`, { notes }).pipe(unwrap(), map(toAppointment));
  }

  reschedule(id: number, newTime: string): Observable<Appointment> {
    return this.http.post<any>(`${this.base}/${id}/reschedule`, { newScheduledAt: newTime }).pipe(unwrap(), map(toAppointment));
  }

  scheduleToday(doctorId: number): Observable<ScheduleSlot[]> {
    return this.http.get<any>(`${environment.apiBaseUrl}/doctors/${doctorId}/schedule/today`).pipe(unwrap());
  }

  calendar(doctorId: number, from: string, to: string): Observable<CalendarEvent[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<any>(`${environment.apiBaseUrl}/doctors/${doctorId}/calendar`, { params }).pipe(unwrap());
  }
}
