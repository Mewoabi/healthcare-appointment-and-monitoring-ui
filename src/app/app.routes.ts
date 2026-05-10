import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'patient/dashboard', pathMatch: 'full' },
      {
        path: 'patient',
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadComponent: () => import('./features/patient/patient-dashboard/patient-dashboard.component').then((m) => m.PatientDashboardComponent) },
          { path: 'appointments', loadComponent: () => import('./features/patient/patient-appointments/patient-appointments.component').then((m) => m.PatientAppointmentsComponent) },
          { path: 'vitals', loadComponent: () => import('./features/patient/patient-vitals/patient-vitals.component').then((m) => m.PatientVitalsComponent) },
          { path: 'find-doctor', loadComponent: () => import('./features/patient/patient-find-doctor/patient-find-doctor.component').then((m) => m.PatientFindDoctorComponent) },
          { path: 'profile', loadComponent: () => import('./features/patient/patient-profile/patient-profile.component').then((m) => m.PatientProfileComponent) },
        ],
      },
      {
        path: 'doctor',
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadComponent: () => import('./features/doctor/doctor-dashboard/doctor-dashboard.component').then((m) => m.DoctorDashboardComponent) },
          { path: 'calendar', loadComponent: () => import('./features/doctor/doctor-calendar/doctor-calendar.component').then((m) => m.DoctorCalendarComponent) },
          { path: 'patients', loadComponent: () => import('./features/doctor/doctor-patients/doctor-patients.component').then((m) => m.DoctorPatientsComponent) },
          { path: 'availability', loadComponent: () => import('./features/doctor/doctor-availability/doctor-availability.component').then((m) => m.DoctorAvailabilityComponent) },
          { path: 'profile', loadComponent: () => import('./features/doctor/doctor-profile/doctor-profile.component').then((m) => m.DoctorProfileComponent) },
        ],
      },
      {
        path: 'admin',
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent) },
          { path: 'users', loadComponent: () => import('./features/admin/admin-users/admin-users.component').then((m) => m.AdminUsersComponent) },
          { path: 'approvals', loadComponent: () => import('./features/admin/admin-approvals/admin-approvals.component').then((m) => m.AdminApprovalsComponent) },
          { path: 'audit', loadComponent: () => import('./features/admin/admin-audit/admin-audit.component').then((m) => m.AdminAuditComponent) },
          { path: 'settings', loadComponent: () => import('./features/admin/admin-settings/admin-settings.component').then((m) => m.AdminSettingsComponent) },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
