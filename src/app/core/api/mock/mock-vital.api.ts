import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { VitalRecord } from '../../models';
import { VitalApi } from '../vital.api';
import { generateVitals } from './seeds';

@Injectable()
export class MockVitalApi implements VitalApi {
  private vitals = generateVitals();

  list(_patientId: number): Observable<VitalRecord[]> {
    return of([...this.vitals]).pipe(delay(environment.mockLatencyMs));
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
  }): Observable<VitalRecord> {
    const bmi = Number((req.weight / ((req.height / 100) ** 2)).toFixed(1));
    let alertLevel: VitalRecord['alertLevel'] = 'NORMAL';
    if (req.systolicBP >= 180 || req.diastolicBP >= 100 || req.oxygenSaturation < 90) alertLevel = 'CRITICAL';
    else if (req.systolicBP >= 140 || req.diastolicBP >= 90 || req.oxygenSaturation < 95) alertLevel = 'WARNING';

    const record: VitalRecord = {
      timestamp: new Date(),
      systolicBP: req.systolicBP,
      diastolicBP: req.diastolicBP,
      heartRate: req.heartRate,
      temperature: req.temperature,
      oxygenSaturation: req.oxygenSaturation,
      weight: req.weight,
      height: req.height,
      bmi,
      alertLevel,
    };
    this.vitals.unshift(record);
    return of(record).pipe(delay(environment.mockLatencyMs));
  }
}
