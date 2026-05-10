import { inject, Injectable, signal } from '@angular/core';
import { DOCTOR_API } from '../api/doctor.api';
import { DocPatient, Doctor } from '../models';

@Injectable({ providedIn: 'root' })
export class DoctorStore {
  private readonly api = inject(DOCTOR_API);

  readonly doctors = signal<Doctor[]>([]);
  readonly docPatients = signal<DocPatient[]>([]);
  readonly loading = signal(false);

  load(params?: { status?: string; specialization?: string; q?: string }): void {
    this.loading.set(true);
    this.api.list(params).subscribe({
      next: (list) => { this.doctors.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  loadPatients(doctorId: number): void {
    this.api.patients(doctorId).subscribe({
      next: (list) => this.docPatients.set(list),
    });
  }

  getDoctorById(id: number): Doctor | undefined {
    return this.doctors().find((d) => d.id === id);
  }

  pending(): void {
    this.loading.set(true);
    this.api.pending().subscribe({
      next: (list) => { this.doctors.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  approve(id: number): void {
    this.api.approve(id).subscribe({
      next: () => this.doctors.update((list) => list.filter((d) => d.id !== id)),
    });
  }

  reject(id: number): void {
    this.api.reject(id).subscribe({
      next: () => this.doctors.update((list) => list.filter((d) => d.id !== id)),
    });
  }
}
