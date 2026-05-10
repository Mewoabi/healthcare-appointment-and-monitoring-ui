import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Appointment, CalendarEvent, ScheduleSlot } from '../../models';
import { addDays, TODAY } from '../../util/format';
import { AppointmentApi } from '../appointment.api';
import { SEED_APPOINTMENTS, SEED_CALENDAR_EVENTS, SEED_DOC_SCHEDULE_TODAY } from './seeds';

@Injectable()
export class MockAppointmentApi implements AppointmentApi {
  private appointments = [...SEED_APPOINTMENTS];
  private nextId = 600;

  myUpcoming(): Observable<Appointment[]> {
    const now = TODAY.getTime();
    return of(
      this.appointments
        .filter((a) => a.scheduledAt.getTime() >= now && a.status !== 'CANCELLED')
        .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())
    ).pipe(delay(environment.mockLatencyMs));
  }

  search(_params?: { patientId?: number; doctorId?: number; status?: string }): Observable<Appointment[]> {
    return of([...this.appointments]).pipe(delay(environment.mockLatencyMs));
  }

  get(id: number): Observable<Appointment> {
    return of(this.appointments.find((a) => a.id === id)!).pipe(delay(environment.mockLatencyMs));
  }

  book(req: { doctorId: number; scheduledAt: string; reason: string; isVirtual?: boolean; durationMinutes?: number }): Observable<Appointment> {
    const appt: Appointment = {
      id: this.nextId++,
      patientId: 101,
      doctorId: req.doctorId,
      scheduledAt: new Date(req.scheduledAt),
      status: 'BOOKED',
      reason: req.reason,
      isVirtual: req.isVirtual ?? false,
      durationMin: req.durationMinutes ?? 30,
    };
    this.appointments.push(appt);
    return of(appt).pipe(delay(environment.mockLatencyMs));
  }

  cancel(id: number, reason: string): Observable<Appointment> {
    const idx = this.appointments.findIndex((a) => a.id === id);
    this.appointments[idx] = { ...this.appointments[idx], status: 'CANCELLED', cancelReason: reason };
    return of(this.appointments[idx]).pipe(delay(environment.mockLatencyMs));
  }

  confirm(id: number): Observable<Appointment> {
    const idx = this.appointments.findIndex((a) => a.id === id);
    this.appointments[idx] = { ...this.appointments[idx], status: 'CONFIRMED' };
    return of(this.appointments[idx]).pipe(delay(environment.mockLatencyMs));
  }

  complete(id: number, notes?: string): Observable<Appointment> {
    const idx = this.appointments.findIndex((a) => a.id === id);
    this.appointments[idx] = { ...this.appointments[idx], status: 'COMPLETED', notes };
    return of(this.appointments[idx]).pipe(delay(environment.mockLatencyMs));
  }

  reschedule(id: number, newTime: string): Observable<Appointment> {
    const idx = this.appointments.findIndex((a) => a.id === id);
    this.appointments[idx] = { ...this.appointments[idx], scheduledAt: new Date(newTime) };
    return of(this.appointments[idx]).pipe(delay(environment.mockLatencyMs));
  }

  scheduleToday(_doctorId: number): Observable<ScheduleSlot[]> {
    return of([...SEED_DOC_SCHEDULE_TODAY]).pipe(delay(environment.mockLatencyMs));
  }

  calendar(_doctorId: number, _from: string, _to: string): Observable<CalendarEvent[]> {
    return of([...SEED_CALENDAR_EVENTS]).pipe(delay(environment.mockLatencyMs));
  }
}
