import { inject, Injectable, signal } from '@angular/core';
import { APPOINTMENT_API } from '../api/appointment.api';
import { Appointment, CalendarEvent, ScheduleSlot } from '../models';

@Injectable({ providedIn: 'root' })
export class AppointmentStore {
  private readonly api = inject(APPOINTMENT_API);

  readonly appointments = signal<Appointment[]>([]);
  readonly scheduleToday = signal<ScheduleSlot[]>([]);
  readonly calendarEvents = signal<CalendarEvent[]>([]);
  readonly loading = signal(false);

  loadAll(): void {
    this.loading.set(true);
    this.api.search().subscribe({
      next: (list) => { this.appointments.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  loadUpcoming(): void {
    this.loading.set(true);
    this.api.myUpcoming().subscribe({
      next: (list) => { this.appointments.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  loadScheduleToday(doctorId: number): void {
    this.api.scheduleToday(doctorId).subscribe({
      next: (slots) => this.scheduleToday.set(slots),
    });
  }

  loadCalendar(doctorId: number, from: string, to: string): void {
    this.api.calendar(doctorId, from, to).subscribe({
      next: (events) => this.calendarEvents.set(events),
    });
  }

  book(req: { doctorId: number; scheduledAt: string; reason: string; isVirtual?: boolean; durationMinutes?: number }): void {
    this.api.book(req).subscribe({
      next: (appt) => this.appointments.update((list) => [...list, appt]),
    });
  }

  cancel(id: number, reason: string): void {
    this.api.cancel(id, reason).subscribe({
      next: (updated) => this.appointments.update((list) => list.map((a) => a.id === id ? updated : a)),
    });
  }

  reschedule(id: number, newTime: string): void {
    this.api.reschedule(id, newTime).subscribe({
      next: (updated) => this.appointments.update((list) => list.map((a) => a.id === id ? updated : a)),
    });
  }
}
