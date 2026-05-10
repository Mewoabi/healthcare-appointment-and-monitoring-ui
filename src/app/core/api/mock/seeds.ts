import {
  AdminStats,
  AdminUser,
  Appointment,
  AvailabilitySlot,
  CalendarEvent,
  DocPatient,
  Doctor,
  Notification,
  Patient,
  ScheduleSlot,
  VitalRecord,
} from '../../models';
import { addDays, TODAY } from '../../util/format';

export const SEED_DOCTORS: Doctor[] = [
  {
    id: 1, name: 'Dr. Amara Okonkwo', initials: 'AO',
    specialization: 'Cardiology', subSpecialization: 'Interventional Cardiology',
    qualifications: 'MBBS, MD, FACC', experienceYears: 14,
    hospital: "St. Bartholomew's Medical Centre",
    bio: 'Focused on preventive cardiology and complex coronary intervention. Sees patients across all age groups; particular interest in women\'s cardiac health.',
    fee: 180, rating: 4.9, reviews: 312, status: 'ACTIVE', licenseNumber: 'MC-44192',
    nextSlot: 'Today, 14:30',
  },
  {
    id: 2, name: 'Dr. Henrik Vasquez', initials: 'HV',
    specialization: 'Endocrinology', subSpecialization: 'Diabetes & Metabolism',
    qualifications: 'MD, PhD', experienceYears: 9,
    hospital: 'Riverside Health Pavilion',
    bio: 'Specializes in Type 1 and Type 2 diabetes management, thyroid disorders, and continuous glucose monitoring program design.',
    fee: 150, rating: 4.7, reviews: 198, status: 'ACTIVE', licenseNumber: 'MC-39184',
    nextSlot: 'Tomorrow, 09:00',
  },
  {
    id: 3, name: 'Dr. Lin Marchetti', initials: 'LM',
    specialization: 'General Practice', subSpecialization: 'Family Medicine',
    qualifications: 'MBBS, DGM', experienceYears: 11,
    hospital: 'Northgate Family Clinic',
    bio: 'Continuity-of-care GP with a calm, unhurried bedside manner. Routine check-ups, chronic disease oversight, and minor procedures.',
    fee: 90, rating: 4.8, reviews: 472, status: 'ACTIVE', licenseNumber: 'MC-41087',
    nextSlot: 'Today, 16:15',
  },
  {
    id: 4, name: 'Dr. Pia Sundqvist', initials: 'PS',
    specialization: 'Dermatology', subSpecialization: 'Medical Dermatology',
    qualifications: 'MBBS, MD (Derm.)', experienceYears: 7,
    hospital: "St. Bartholomew's Medical Centre",
    bio: 'Adult and pediatric dermatology. Eczema, psoriasis, acne, and dermoscopic skin cancer screening.',
    fee: 160, rating: 4.6, reviews: 144, status: 'ACTIVE', licenseNumber: 'MC-50223',
    nextSlot: 'Fri, 10:00',
  },
  {
    id: 5, name: 'Dr. Reuben Halevy', initials: 'RH',
    specialization: 'Pulmonology', subSpecialization: 'Sleep Medicine',
    qualifications: 'MBBS, MD, FCCP', experienceYears: 17,
    hospital: 'Riverside Health Pavilion',
    bio: 'Asthma, COPD, sleep apnoea evaluation. Coordinates with our home pulse-oximetry monitoring programme.',
    fee: 175, rating: 4.9, reviews: 256, status: 'ACTIVE', licenseNumber: 'MC-31288',
    nextSlot: 'Mon, 11:30',
  },
  {
    id: 6, name: 'Dr. Amelia Tao', initials: 'AT',
    specialization: 'Obstetrics', subSpecialization: 'Maternal-Fetal Medicine',
    qualifications: 'MBBS, MD, FRCOG', experienceYears: 12,
    hospital: 'Riverside Health Pavilion',
    bio: 'Pregnancy care from first trimester through postpartum. High-risk pregnancy management.',
    fee: 195, rating: 4.9, reviews: 289, status: 'PENDING_APPROVAL', licenseNumber: 'MC-52109',
    nextSlot: 'Pending approval',
  },
];

export const SEED_PATIENT: Patient = {
  id: 101, name: 'Maren Holloway', initials: 'MH',
  email: 'maren.h@example.com',
  dob: '1992-03-14', age: 34, gender: 'Female', bloodGroup: 'A+',
  emergencyContact: 'Theo Holloway · +44 7700 900142',
  allergies: 'Penicillin (rash)',
  chronicConditions: 'Mild hypertension (controlled)',
  insurance: 'Northwind Mutual · Plan 884-21B',
};

export const SEED_APPOINTMENTS: Appointment[] = [
  { id: 501, patientId: 101, doctorId: 1, scheduledAt: addDays(TODAY, 0, 14, 30), status: 'CONFIRMED', reason: 'Follow-up — BP medication review', isVirtual: false, durationMin: 30 },
  { id: 502, patientId: 101, doctorId: 3, scheduledAt: addDays(TODAY, 3, 10, 0), status: 'PENDING', reason: 'Annual physical examination', isVirtual: false, durationMin: 45 },
  { id: 503, patientId: 101, doctorId: 5, scheduledAt: addDays(TODAY, 8, 11, 30), status: 'CONFIRMED', reason: 'Sleep study consultation', isVirtual: true, durationMin: 30, meetingLink: 'polaris.health/v/r-ksu-23p' },
  { id: 504, patientId: 101, doctorId: 1, scheduledAt: addDays(TODAY, -14, 14, 30), status: 'COMPLETED', reason: 'Routine cardiac check', isVirtual: false, durationMin: 30, notes: 'BP well controlled at 128/82. Continue Amlodipine 5mg. Recheck in 14 days.' },
  { id: 505, patientId: 101, doctorId: 4, scheduledAt: addDays(TODAY, -32, 9, 0), status: 'COMPLETED', reason: 'Skin lesion check', isVirtual: false, durationMin: 20, notes: 'Benign nevus, no biopsy required. Reassurance given.' },
  { id: 506, patientId: 101, doctorId: 2, scheduledAt: addDays(TODAY, -45, 15, 0), status: 'CANCELLED', reason: 'Diabetes screening (deferred)', cancelReason: 'Patient request — rescheduling' },
];

export const SEED_NOTIFICATIONS: Notification[] = [
  { id: 901, title: 'Appointment confirmed', message: 'Dr. Amara Okonkwo confirmed your 14:30 visit today.', type: 'IN_APP', status: 'PENDING', when: '12 min ago', unread: true, kind: 'appt' },
  { id: 902, title: 'Vitals reminder', message: "It's been 3 days since your last blood pressure reading.", type: 'IN_APP', status: 'PENDING', when: '2 hr ago', unread: true, kind: 'vital' },
  { id: 903, title: 'Reading flagged', message: 'Your BP reading on Apr 30 (162/102) was elevated. Please review with Dr. Okonkwo.', type: 'IN_APP', status: 'READ', when: 'Yesterday', unread: false, kind: 'alert' },
  { id: 904, title: 'Reminder — tomorrow', message: 'Annual physical with Dr. Lin Marchetti, Sat 10:00.', type: 'EMAIL', status: 'SENT', when: '2 days ago', unread: false, kind: 'appt' },
  { id: 905, title: 'Welcome to Polaris Health', message: 'Your account is verified. Start by completing your profile.', type: 'EMAIL', status: 'READ', when: 'Apr 12', unread: false, kind: 'system' },
];

export const SEED_DOC_PATIENTS: DocPatient[] = [
  { id: 101, name: 'Maren Holloway', initials: 'MH', age: 34, lastVisit: 'Apr 22', flag: 'WARNING', reason: 'BP follow-up' },
  { id: 102, name: 'Yusuf Aldemir', initials: 'YA', age: 58, lastVisit: 'Apr 28', flag: null, reason: 'Post-op review' },
  { id: 103, name: 'Beatrix Fournier', initials: 'BF', age: 41, lastVisit: 'May 1', flag: 'WARNING', reason: 'Cholesterol panel' },
  { id: 104, name: 'Kenji Saito', initials: 'KS', age: 29, lastVisit: 'May 4', flag: null, reason: 'Palpitations work-up' },
  { id: 105, name: 'Iolanda Brava', initials: 'IB', age: 67, lastVisit: 'Apr 18', flag: 'CRITICAL', reason: 'Heart failure' },
  { id: 106, name: 'Mateo Reyes', initials: 'MR', age: 52, lastVisit: 'Apr 30', flag: null, reason: 'Annual check' },
  { id: 107, name: 'Greta Lindqvist', initials: 'GL', age: 38, lastVisit: 'May 2', flag: null, reason: 'Pre-op clearance' },
];

export const SEED_DOC_SCHEDULE_TODAY: ScheduleSlot[] = [
  { time: '09:00', patient: 'Yusuf Aldemir', reason: 'Post-op review', status: 'COMPLETED' },
  { time: '09:45', patient: 'Beatrix Fournier', reason: 'Cholesterol panel review', status: 'COMPLETED' },
  { time: '10:30', patient: 'Kenji Saito', reason: 'Palpitations — ECG follow-up', status: 'COMPLETED' },
  { time: '11:15', patient: 'Mateo Reyes', reason: 'Annual cardiac check', status: 'IN_PROGRESS' },
  { time: '13:00', patient: 'Iolanda Brava', reason: 'Heart failure — telemedicine', status: 'CONFIRMED', virtual: true },
  { time: '14:30', patient: 'Maren Holloway', reason: 'BP medication review', status: 'CONFIRMED' },
  { time: '15:15', patient: 'Greta Lindqvist', reason: 'Pre-op clearance', status: 'PENDING' },
  { time: '16:00', patient: 'Tobias Frey', reason: 'New patient intake', status: 'PENDING' },
];

export const SEED_ADMIN_USERS: AdminUser[] = [
  { id: 1, name: 'Dr. Amelia Tao', email: 'atao@polaris.health', role: 'DOCTOR', status: 'PENDING', joined: 'May 2, 2026', license: 'MC-52109' },
  { id: 2, name: 'Dr. Amara Okonkwo', email: 'aokonkwo@polaris.health', role: 'DOCTOR', status: 'ACTIVE', joined: 'Jan 14, 2026', license: 'MC-44192' },
  { id: 3, name: 'Maren Holloway', email: 'maren.h@example.com', role: 'PATIENT', status: 'ACTIVE', joined: 'Apr 12, 2026', license: '—' },
  { id: 4, name: 'Dr. Henrik Vasquez', email: 'hvasquez@polaris.health', role: 'DOCTOR', status: 'ACTIVE', joined: 'Feb 8, 2026', license: 'MC-39184' },
  { id: 5, name: 'Yusuf Aldemir', email: 'yusuf.a@example.com', role: 'PATIENT', status: 'ACTIVE', joined: 'Mar 22, 2026', license: '—' },
  { id: 6, name: 'Iolanda Brava', email: 'iolanda.b@example.com', role: 'PATIENT', status: 'ACTIVE', joined: 'Mar 1, 2026', license: '—' },
  { id: 7, name: 'Caspar Lund', email: 'caspar.l@example.com', role: 'PATIENT', status: 'INACTIVE', joined: 'Feb 19, 2026', license: '—' },
  { id: 8, name: 'Dr. Pia Sundqvist', email: 'psundqvist@polaris.health', role: 'DOCTOR', status: 'ACTIVE', joined: 'Mar 18, 2026', license: 'MC-50223' },
];

export const SEED_ADMIN_STATS: AdminStats = {
  totalUsers: 1248, patients: 1102, doctors: 142, admins: 4,
  apptToday: 87, apptWeek: 612, apptCompletion: 0.94,
  criticalVitals24h: 3, pendingDoctors: 1, failedNotifs: 2, revenueWeek: 47280,
};

export const SEED_AVAILABILITY_SLOTS: AvailabilitySlot[] = [
  { id: 1, day: 'Monday', start: '09:00', end: '13:00', duration: 30, recurring: true, active: true },
  { id: 2, day: 'Tuesday', start: '09:00', end: '13:00', duration: 30, recurring: true, active: true },
  { id: 3, day: 'Wednesday', start: '09:00', end: '17:00', duration: 30, recurring: true, active: true },
  { id: 4, day: 'Thursday', start: '09:00', end: '13:00', duration: 30, recurring: true, active: true },
  { id: 5, day: 'Friday', start: '13:00', end: '17:00', duration: 45, recurring: true, active: true },
];

export const SEED_CALENDAR_EVENTS: CalendarEvent[] = [
  { day: 0, hour: 9, dur: 1, title: 'Consult', patient: 'Klaus Berger', status: 'completed' },
  { day: 0, hour: 10.5, dur: 0.5, title: 'Telemedicine', patient: 'Greta L.', status: 'completed' },
  { day: 0, hour: 14, dur: 1, title: 'BP follow-up', patient: 'Maren H.', status: 'completed' },
  { day: 1, hour: 9, dur: 1.5, title: 'New patient intake', patient: 'Tobias F.', status: 'completed' },
  { day: 1, hour: 13, dur: 1, title: 'Cardiac echo review', patient: 'Iolanda B.', status: 'completed' },
  { day: 1, hour: 15.5, dur: 0.5, title: 'Phone consult', patient: 'Mateo R.', status: 'completed' },
  { day: 2, hour: 9, dur: 0.75, title: 'Post-op review', patient: 'Yusuf A.', status: 'completed' },
  { day: 2, hour: 10, dur: 0.75, title: 'Lipid panel', patient: 'Beatrix F.', status: 'completed' },
  { day: 2, hour: 11, dur: 0.75, title: 'ECG follow-up', patient: 'Kenji S.', status: 'completed' },
  { day: 2, hour: 11.25, dur: 0.75, title: 'Annual check', patient: 'Mateo R.', status: 'pending' },
  { day: 2, hour: 13, dur: 1, title: 'Telehealth', patient: 'Iolanda B.', status: 'confirmed' },
  { day: 2, hour: 14.5, dur: 0.5, title: 'BP review', patient: 'Maren H.', status: 'confirmed' },
  { day: 2, hour: 15.25, dur: 0.75, title: 'Pre-op clearance', patient: 'Greta L.', status: 'pending' },
  { day: 2, hour: 16, dur: 1, title: 'New intake', patient: 'Tobias F.', status: 'pending' },
  { day: 3, hour: 9, dur: 1, title: 'Consult', patient: 'Klaus B.', status: 'confirmed' },
  { day: 3, hour: 11, dur: 0.5, title: 'Echo review', patient: 'Vita N.', status: 'confirmed' },
  { day: 3, hour: 14, dur: 1.5, title: 'Pre-op', patient: 'Marcellus B.', status: 'confirmed' },
  { day: 4, hour: 10, dur: 0.5, title: 'Consult', patient: 'Sasha K.', status: 'confirmed' },
  { day: 4, hour: 13.5, dur: 1, title: 'Telemedicine', patient: 'Iolanda B.', status: 'confirmed' },
  { day: 5, hour: 9, dur: 0.5, title: 'Phone follow-up', patient: 'Beatrix F.', status: 'pending' },
];

export function generateVitals(): VitalRecord[] {
  const seed = (n: number) => {
    let x = Math.sin(n + 1) * 10000;
    return x - Math.floor(x);
  };
  const out: VitalRecord[] = [];
  for (let i = 30; i >= 0; i--) {
    const sysBase = 128 + Math.sin(i * 0.4) * 6 + (seed(i * 3) - 0.5) * 4;
    const diaBase = 82 + Math.cos(i * 0.4) * 4 + (seed(i * 3 + 1) - 0.5) * 3;
    const hr = 74 + Math.sin(i * 0.3) * 5 + (seed(i * 3 + 2) - 0.5) * 4;
    const w = 64.2 + Math.sin(i * 0.15) * 0.4 + (seed(i * 3 + 3) - 0.5) * 0.3;
    const t = 36.6 + (seed(i * 3 + 4) - 0.5) * 0.4;
    const o = 97 + seed(i * 3 + 5) * 1.5;
    out.push({
      timestamp: addDays(TODAY, -i, 8 + Math.floor(seed(i) * 4), 0),
      systolicBP: Math.round(sysBase),
      diastolicBP: Math.round(diaBase),
      heartRate: Math.round(hr),
      temperature: Number(t.toFixed(1)),
      oxygenSaturation: Number(o.toFixed(0)),
      weight: Number(w.toFixed(1)),
      height: 168,
      bmi: Number((w / (1.68 * 1.68)).toFixed(1)),
      alertLevel: i === 5 ? 'WARNING' : 'NORMAL',
    });
  }
  out[25].systolicBP = 162;
  out[25].diastolicBP = 102;
  out[25].alertLevel = 'WARNING';
  return out.reverse();
}
