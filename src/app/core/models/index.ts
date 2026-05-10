export type Role = 'patient' | 'doctor' | 'admin';
export type Palette = 'sage' | 'ocean' | 'warm';
export type AlertLevel = 'NORMAL' | 'WARNING' | 'CRITICAL';
export type AppointmentStatus = 'CONFIRMED' | 'PENDING' | 'BOOKED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'IN_PROGRESS';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'PENDING_APPROVAL';
export type NotifKind = 'appt' | 'vital' | 'alert' | 'system';
export type NotifType = 'IN_APP' | 'EMAIL' | 'SMS';
export type AuditAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT';
  active: boolean;
  emailVerified: boolean;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
  expiresAt: string;
}

export interface Doctor {
  id: number;
  name: string;
  initials: string;
  specialization: string;
  subSpecialization: string;
  qualifications: string;
  experienceYears: number;
  hospital: string;
  bio: string;
  fee: number;
  rating: number;
  reviews: number;
  status: 'ACTIVE' | 'PENDING_APPROVAL';
  licenseNumber: string;
  nextSlot: string;
}

export interface Patient {
  id: number;
  name: string;
  initials: string;
  email: string;
  dob: string;
  age: number;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  allergies: string;
  chronicConditions: string;
  insurance: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  scheduledAt: Date;
  status: AppointmentStatus;
  reason: string;
  isVirtual?: boolean;
  durationMin?: number;
  meetingLink?: string;
  notes?: string;
  cancelReason?: string;
  doctorName?: string;
  doctorSpec?: string;
  hospital?: string;
}

export interface VitalRecord {
  id?: number;
  timestamp: Date;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  weight: number;
  height: number;
  bmi: number;
  alertLevel: AlertLevel;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotifType;
  status: string;
  when: string;
  unread: boolean;
  kind: NotifKind;
}

export interface DocPatient {
  id: number;
  name: string;
  initials: string;
  age: number;
  lastVisit: string;
  flag: AlertLevel | null;
  reason: string;
}

export interface ScheduleSlot {
  time: string;
  patient: string;
  reason: string;
  status: AppointmentStatus | 'IN_PROGRESS';
  virtual?: boolean;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'DOCTOR' | 'PATIENT' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  joined: string;
  license: string;
}

export interface AdminStats {
  totalUsers: number;
  patients: number;
  doctors: number;
  admins: number;
  apptToday: number;
  apptWeek: number;
  apptCompletion: number;
  criticalVitals24h: number;
  pendingDoctors: number;
  failedNotifs: number;
  revenueWeek: number;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  actor: string;
  action: AuditAction;
  entity: string;
  entityId: number | null;
  ip: string;
  userAgent: string;
}

export interface AvailabilitySlot {
  id: number;
  day: string;
  start: string;
  end: string;
  duration: number;
  recurring: boolean;
  active: boolean;
}

export interface CalendarEvent {
  day: number;
  hour: number;
  dur: number;
  title: string;
  patient: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface BookableSlot {
  start: string;
  end: string;
  taken: boolean;
}

export interface BookingData {
  doctor: Doctor;
  date: Date;
  slot: string;
  reason: string;
  virtual: boolean;
}
