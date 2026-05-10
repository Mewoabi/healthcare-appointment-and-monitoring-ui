import { inject, Injectable, signal } from '@angular/core';
import { PATIENT_API } from '../api/patient.api';
import { Patient } from '../models';

@Injectable({ providedIn: 'root' })
export class PatientStore {
  private readonly api = inject(PATIENT_API);

  readonly patient = signal<Patient | null>(null);
  readonly loading = signal(false);

  loadMe(): void {
    this.loading.set(true);
    this.api.me().subscribe({
      next: (p) => { this.patient.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
