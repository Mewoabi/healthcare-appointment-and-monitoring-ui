import { inject, Injectable, signal } from '@angular/core';
import { VITAL_API } from '../api/vital.api';
import { VitalRecord } from '../models';

@Injectable({ providedIn: 'root' })
export class VitalStore {
  private readonly api = inject(VITAL_API);

  readonly vitals = signal<VitalRecord[]>([]);
  readonly loading = signal(false);

  load(patientId: number): void {
    this.loading.set(true);
    this.api.list(patientId).subscribe({
      next: (list) => { this.vitals.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  record(req: {
    patientId: number;
    systolicBP: number;
    diastolicBP: number;
    heartRate: number;
    temperature: number;
    oxygenSaturation: number;
    weight: number;
    height: number;
  }): void {
    this.api.record(req).subscribe({
      next: (v) => this.vitals.update((list) => [v, ...list]),
    });
  }
}
