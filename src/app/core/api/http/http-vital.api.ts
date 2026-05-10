import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { VitalRecord } from '../../models';
import { unwrap } from '../../http/api-response';
import { VitalApi } from '../vital.api';
import { toVitalRecord } from './adapters';

@Injectable()
export class HttpVitalApi implements VitalApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/vitals';

  list(patientId: number): Observable<VitalRecord[]> {
    const params = new HttpParams().set('patientId', patientId);
    return this.http.get<any>(this.base, { params }).pipe(
      unwrap(),
      map((page: any) => (page.content ?? page).map(toVitalRecord)),
    );
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
    return this.http.post<any>(this.base, req).pipe(unwrap(), map(toVitalRecord));
  }
}
