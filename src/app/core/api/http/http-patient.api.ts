import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Patient } from '../../models';
import { unwrap } from '../../http/api-response';
import { PatientApi } from '../patient.api';

@Injectable()
export class HttpPatientApi implements PatientApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/patients';

  me(): Observable<Patient> {
    return this.http.get<any>(`${this.base}/me`).pipe(unwrap());
  }

  get(id: number): Observable<Patient> {
    return this.http.get<any>(`${this.base}/${id}`).pipe(unwrap());
  }

  list(): Observable<Patient[]> {
    return this.http.get<any>(this.base).pipe(unwrap());
  }
}
