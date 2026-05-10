import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DocPatient, Doctor } from '../../models';
import { DoctorApi } from '../doctor.api';
import { SEED_DOC_PATIENTS, SEED_DOCTORS } from './seeds';

@Injectable()
export class MockDoctorApi implements DoctorApi {
  private doctors = [...SEED_DOCTORS];

  list(params?: { status?: string; specialization?: string; q?: string }): Observable<Doctor[]> {
    let result = [...this.doctors];
    if (params?.status) result = result.filter((d) => d.status === params.status);
    if (params?.specialization) result = result.filter((d) => d.specialization === params.specialization);
    if (params?.q) {
      const q = params.q.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q));
    }
    return of(result).pipe(delay(environment.mockLatencyMs));
  }

  get(id: number): Observable<Doctor> {
    return of(this.doctors.find((d) => d.id === id)!).pipe(delay(environment.mockLatencyMs));
  }

  pending(): Observable<Doctor[]> {
    return of(this.doctors.filter((d) => d.status === 'PENDING_APPROVAL')).pipe(delay(environment.mockLatencyMs));
  }

  approve(id: number): Observable<void> {
    const idx = this.doctors.findIndex((d) => d.id === id);
    if (idx >= 0) this.doctors[idx] = { ...this.doctors[idx], status: 'ACTIVE' };
    return of(undefined).pipe(delay(environment.mockLatencyMs));
  }

  reject(id: number): Observable<void> {
    this.doctors = this.doctors.filter((d) => d.id !== id);
    return of(undefined).pipe(delay(environment.mockLatencyMs));
  }

  patients(_doctorId: number): Observable<DocPatient[]> {
    return of([...SEED_DOC_PATIENTS]).pipe(delay(environment.mockLatencyMs));
  }
}
