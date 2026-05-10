import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PatientStore } from '../../../core/stores/patient.store';

interface PrefRow { label: string; desc: string; on: boolean; }

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientProfileComponent implements OnInit {
  readonly patientStore = inject(PatientStore);

  ngOnInit(): void {
    this.patientStore.loadMe();
  }

  get patient() { return this.patientStore.patient(); }

  prefs = signal<PrefRow[]>([
    { label: 'Appointment reminders', desc: 'Email, 24h prior', on: true },
    { label: 'SMS reminders', desc: '1h before appointment', on: true },
    { label: 'Vital alerts', desc: 'Warning + Critical', on: true },
    { label: 'Weekly health digest', desc: 'Summary every Sunday', on: false },
    { label: 'Marketing', desc: 'Product news', on: false },
    { label: 'Research invitations', desc: 'Anonymized study opt-ins', on: false },
  ]);

  togglePref(index: number): void {
    this.prefs.update((p) => p.map((r, i) => i === index ? { ...r, on: !r.on } : r));
  }
}
