import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../../core/services/app-state.service';
import { AppointmentStore } from '../../../core/stores/appointment.store';
import { DoctorStore } from '../../../core/stores/doctor.store';
import { VitalStore } from '../../../core/stores/vital.store';
import { PatientStore } from '../../../core/stores/patient.store';
import { fmt, timeGreeting, TODAY } from '../../../core/util/format';
import { IconComponent } from '../../../shared/icon/icon.component';
import { SparklineComponent } from '../../../shared/sparkline/sparkline.component';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, SparklineComponent, StatusTagComponent],
})
export class PatientDashboardComponent implements OnInit {
  readonly appointmentStore = inject(AppointmentStore);
  readonly doctorStore = inject(DoctorStore);
  readonly vitalStore = inject(VitalStore);
  readonly patientStore = inject(PatientStore);
  readonly state = inject(AppStateService);
  readonly router = inject(Router);

  today = TODAY;
  fmt = fmt;
  greeting = timeGreeting();

  ngOnInit(): void {
    this.appointmentStore.loadAll();
    this.vitalStore.load(101);
    this.patientStore.loadMe();
  }

  upcoming = computed(() =>
    this.appointmentStore.appointments()
      .filter((a) => a.status !== 'CANCELLED' && a.status !== 'COMPLETED')
      .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())
  );

  recent = computed(() => this.vitalStore.vitals()[0]);

  sysSeries = computed(() => this.vitalStore.vitals().slice(0, 14).map((v) => v.systolicBP).reverse());
  hrSeries = computed(() => this.vitalStore.vitals().slice(0, 14).map((v) => v.heartRate).reverse());
  wSeries = computed(() => this.vitalStore.vitals().slice(0, 14).map((v) => v.weight).reverse());

  careTeam = computed(() => this.doctorStore.doctors().slice(0, 3));

  goto(path: string): void { this.router.navigate(['/patient/' + path]); }
  openBook(doctor: any): void { this.state.bookDoctor.set(doctor); }
  openVital(): void { this.state.vitalOpen.set(true); }

  getDoctor(id: number) { return this.doctorStore.getDoctorById(id); }

  apptHour(d: Date): string { return String(d.getHours() % 12 || 12) + ':' + String(d.getMinutes()).padStart(2, '0'); }
  apptMeridiem(d: Date): string { return d.getHours() >= 12 ? 'pm' : 'am'; }
}
