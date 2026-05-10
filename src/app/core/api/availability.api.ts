import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailabilitySlot, BookableSlot } from '../models';

export interface AvailabilityApi {
  list(doctorId: number): Observable<AvailabilitySlot[]>;
  create(doctorId: number, slot: Partial<AvailabilitySlot>): Observable<AvailabilitySlot>;
  update(id: number, slot: Partial<AvailabilitySlot>): Observable<AvailabilitySlot>;
  remove(id: number): Observable<void>;
  bookableSlots(doctorId: number, date: string): Observable<BookableSlot[]>;
}

export const AVAILABILITY_API = new InjectionToken<AvailabilityApi>('AVAILABILITY_API');
