import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DocPatient, Doctor } from '../models';

export interface DoctorApi {
  list(params?: { status?: string; specialization?: string; q?: string }): Observable<Doctor[]>;
  get(id: number): Observable<Doctor>;
  pending(): Observable<Doctor[]>;
  approve(id: number): Observable<void>;
  reject(id: number): Observable<void>;
  patients(doctorId: number): Observable<DocPatient[]>;
}

export const DOCTOR_API = new InjectionToken<DoctorApi>('DOCTOR_API');
