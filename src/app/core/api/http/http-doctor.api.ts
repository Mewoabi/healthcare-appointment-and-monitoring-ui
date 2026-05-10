import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DocPatient, Doctor } from '../../models';
import { unwrap } from '../../http/api-response';
import { DoctorApi } from '../doctor.api';

@Injectable()
export class HttpDoctorApi implements DoctorApi {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl + '/doctors';

  list(params?: { status?: string; specialization?: string; q?: string }): Observable<Doctor[]> {
    let hp = new HttpParams();
    if (params?.status) hp = hp.set('status', params.status);
    if (params?.specialization) hp = hp.set('specialization', params.specialization);
    if (params?.q) hp = hp.set('q', params.q);
    return this.http.get<any>(this.base, { params: hp }).pipe(
      unwrap(),
      map((page: any) => page.content ?? page),
    );
  }

  get(id: number): Observable<Doctor> {
    return this.http.get<any>(`${this.base}/${id}`).pipe(unwrap());
  }

  pending(): Observable<Doctor[]> {
    return this.http.get<any>(`${this.base}/pending`).pipe(unwrap());
  }

  approve(id: number): Observable<void> {
    return this.http.post<any>(`${this.base}/${id}/approve`, {}).pipe(unwrap());
  }

  reject(id: number): Observable<void> {
    return this.http.post<any>(`${this.base}/${id}/reject`, {}).pipe(unwrap());
  }

  patients(doctorId: number): Observable<DocPatient[]> {
    return this.http.get<any>(`${this.base}/${doctorId}/patients`).pipe(unwrap());
  }
}
