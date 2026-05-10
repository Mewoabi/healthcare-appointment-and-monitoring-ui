import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ADMIN_API } from './admin.api';
import { APPOINTMENT_API } from './appointment.api';
import { AUTH_API } from './auth.api';
import { AVAILABILITY_API } from './availability.api';
import { DOCTOR_API } from './doctor.api';
import { NOTIFICATION_API } from './notification.api';
import { PATIENT_API } from './patient.api';
import { VITAL_API } from './vital.api';
import { HttpAdminApi } from './http/http-admin.api';
import { HttpAppointmentApi } from './http/http-appointment.api';
import { HttpAuthApi } from './http/http-auth.api';
import { HttpAvailabilityApi } from './http/http-availability.api';
import { HttpDoctorApi } from './http/http-doctor.api';
import { HttpNotificationApi } from './http/http-notification.api';
import { HttpPatientApi } from './http/http-patient.api';
import { HttpVitalApi } from './http/http-vital.api';
import { MockAdminApi } from './mock/mock-admin.api';
import { MockAppointmentApi } from './mock/mock-appointment.api';
import { MockAuthApi } from './mock/mock-auth.api';
import { MockAvailabilityApi } from './mock/mock-availability.api';
import { MockDoctorApi } from './mock/mock-doctor.api';
import { MockNotificationApi } from './mock/mock-notification.api';
import { MockPatientApi } from './mock/mock-patient.api';
import { MockVitalApi } from './mock/mock-vital.api';

export function provideApi(): EnvironmentProviders {
  const useMock = environment.useMockApi;
  return makeEnvironmentProviders([
    { provide: AUTH_API, useClass: useMock ? MockAuthApi : HttpAuthApi },
    { provide: APPOINTMENT_API, useClass: useMock ? MockAppointmentApi : HttpAppointmentApi },
    { provide: VITAL_API, useClass: useMock ? MockVitalApi : HttpVitalApi },
    { provide: DOCTOR_API, useClass: useMock ? MockDoctorApi : HttpDoctorApi },
    { provide: PATIENT_API, useClass: useMock ? MockPatientApi : HttpPatientApi },
    { provide: NOTIFICATION_API, useClass: useMock ? MockNotificationApi : HttpNotificationApi },
    { provide: ADMIN_API, useClass: useMock ? MockAdminApi : HttpAdminApi },
    { provide: AVAILABILITY_API, useClass: useMock ? MockAvailabilityApi : HttpAvailabilityApi },
  ]);
}
