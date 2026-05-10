import { inject, Injectable, signal } from '@angular/core';
import { AVAILABILITY_API } from '../api/availability.api';
import { AvailabilitySlot, BookableSlot } from '../models';

@Injectable({ providedIn: 'root' })
export class AvailabilityStore {
  private readonly api = inject(AVAILABILITY_API);

  readonly slots = signal<AvailabilitySlot[]>([]);
  readonly bookableSlots = signal<BookableSlot[]>([]);
  readonly loading = signal(false);

  load(doctorId: number): void {
    this.loading.set(true);
    this.api.list(doctorId).subscribe({
      next: (list) => { this.slots.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  loadBookable(doctorId: number, date: string): void {
    this.api.bookableSlots(doctorId, date).subscribe({
      next: (list) => this.bookableSlots.set(list),
    });
  }

  create(doctorId: number, slot: Partial<AvailabilitySlot>): void {
    this.api.create(doctorId, slot).subscribe({
      next: (s) => this.slots.update((list) => [...list, s]),
    });
  }

  update(id: number, slot: Partial<AvailabilitySlot>): void {
    this.api.update(id, slot).subscribe({
      next: (s) => this.slots.update((list) => list.map((x) => x.id === id ? s : x)),
    });
  }

  remove(id: number): void {
    this.api.remove(id).subscribe({
      next: () => this.slots.update((list) => list.filter((x) => x.id !== id)),
    });
  }
}
