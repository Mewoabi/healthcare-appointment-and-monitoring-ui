import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models';

export interface PatientApi {
  me(): Observable<Patient>;
  get(id: number): Observable<Patient>;
  list(): Observable<Patient[]>;
}

export const PATIENT_API = new InjectionToken<PatientApi>('PATIENT_API');
