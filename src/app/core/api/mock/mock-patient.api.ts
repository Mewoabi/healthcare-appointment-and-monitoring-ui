import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Patient } from '../../models';
import { PatientApi } from '../patient.api';
import { SEED_PATIENT } from './seeds';

@Injectable()
export class MockPatientApi implements PatientApi {
  me(): Observable<Patient> {
    return of({ ...SEED_PATIENT }).pipe(delay(environment.mockLatencyMs));
  }

  get(_id: number): Observable<Patient> {
    return of({ ...SEED_PATIENT }).pipe(delay(environment.mockLatencyMs));
  }

  list(): Observable<Patient[]> {
    return of([{ ...SEED_PATIENT }]).pipe(delay(environment.mockLatencyMs));
  }
}
