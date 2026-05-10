import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, CalendarEvent, ScheduleSlot } from '../models';

export interface AppointmentApi {
  myUpcoming(): Observable<Appointment[]>;
  search(params?: { patientId?: number; doctorId?: number; status?: string }): Observable<Appointment[]>;
  get(id: number): Observable<Appointment>;
  book(req: { doctorId: number; scheduledAt: string; reason: string; isVirtual?: boolean; durationMinutes?: number }): Observable<Appointment>;
  cancel(id: number, reason: string): Observable<Appointment>;
  confirm(id: number): Observable<Appointment>;
  complete(id: number, notes?: string): Observable<Appointment>;
  reschedule(id: number, newTime: string): Observable<Appointment>;
  scheduleToday(doctorId: number): Observable<ScheduleSlot[]>;
  calendar(doctorId: number, from: string, to: string): Observable<CalendarEvent[]>;
}

export const APPOINTMENT_API = new InjectionToken<AppointmentApi>('APPOINTMENT_API');
