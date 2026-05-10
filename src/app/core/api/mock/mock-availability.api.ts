import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AvailabilitySlot, BookableSlot } from '../../models';
import { AvailabilityApi } from '../availability.api';
import { SEED_AVAILABILITY_SLOTS } from './seeds';

@Injectable()
export class MockAvailabilityApi implements AvailabilityApi {
  private slots = [...SEED_AVAILABILITY_SLOTS];
  private nextId = 10;

  list(_doctorId: number): Observable<AvailabilitySlot[]> {
    return of([...this.slots]).pipe(delay(environment.mockLatencyMs));
  }

  create(_doctorId: number, slot: Partial<AvailabilitySlot>): Observable<AvailabilitySlot> {
    const newSlot: AvailabilitySlot = {
      id: this.nextId++,
      day: slot.day ?? 'Monday',
      start: slot.start ?? '09:00',
      end: slot.end ?? '12:00',
      duration: slot.duration ?? 30,
      recurring: slot.recurring ?? true,
      active: slot.active ?? true,
    };
    this.slots.push(newSlot);
    return of(newSlot).pipe(delay(environment.mockLatencyMs));
  }

  update(id: number, slot: Partial<AvailabilitySlot>): Observable<AvailabilitySlot> {
    const idx = this.slots.findIndex((s) => s.id === id);
    if (idx >= 0) this.slots[idx] = { ...this.slots[idx], ...slot };
    return of(this.slots[idx]).pipe(delay(environment.mockLatencyMs));
  }

  remove(id: number): Observable<void> {
    this.slots = this.slots.filter((s) => s.id !== id);
    return of(undefined).pipe(delay(environment.mockLatencyMs));
  }

  bookableSlots(_doctorId: number, _date: string): Observable<BookableSlot[]> {
    const slots: BookableSlot[] = [
      { start: '09:00', end: '09:30', taken: false },
      { start: '09:30', end: '10:00', taken: true },
      { start: '10:00', end: '10:30', taken: false },
      { start: '10:30', end: '11:00', taken: false },
      { start: '11:00', end: '11:30', taken: false },
      { start: '11:30', end: '12:00', taken: true },
      { start: '13:00', end: '13:30', taken: true },
      { start: '13:30', end: '14:00', taken: false },
      { start: '14:00', end: '14:30', taken: false },
      { start: '14:30', end: '15:00', taken: false },
      { start: '15:00', end: '15:30', taken: false },
      { start: '15:30', end: '16:00', taken: true },
    ];
    return of(slots).pipe(delay(environment.mockLatencyMs));
  }
}
