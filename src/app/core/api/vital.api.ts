import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { VitalRecord } from '../models';

export interface VitalApi {
  list(patientId: number): Observable<VitalRecord[]>;
  record(req: {
    patientId: number;
    systolicBP: number;
    diastolicBP: number;
    heartRate: number;
    temperature: number;
    oxygenSaturation: number;
    weight: number;
    height: number;
  }): Observable<VitalRecord>;
}

export const VITAL_API = new InjectionToken<VitalApi>('VITAL_API');
