import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentStore } from '../../../core/stores/appointment.store';
import { DoctorStore } from '../../../core/stores/doctor.store';
import { fmt, timeGreeting, TODAY } from '../../../core/util/format';
import { IconComponent } from '../../../shared/icon/icon.component';
import { SparklineComponent } from '../../../shared/sparkline/sparkline.component';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, SparklineComponent, StatusTagComponent],
})
export class DoctorDashboardComponent implements OnInit {
  readonly appointmentStore = inject(AppointmentStore);
  readonly doctorStore = inject(DoctorStore);
  readonly router = inject(Router);

  fmt = fmt;
  today = TODAY;
  greeting = timeGreeting();

  ngOnInit(): void {
    this.appointmentStore.loadScheduleToday(1);
    this.doctorStore.loadPatients(1);
  }

  completed = computed(() => this.appointmentStore.scheduleToday().filter((s) => s.status === 'COMPLETED').length);
  pendingCount = computed(() => this.appointmentStore.scheduleToday().filter((s) => s.status === 'PENDING').length);
  flagged = computed(() => this.doctorStore.docPatients().filter((p) => p.flag).length);
  flaggedPatients = computed(() => this.doctorStore.docPatients().filter((p) => p.flag));

  weekSpark = [5, 8, 6, 9, 7, 12, 4];

  goto(path: string): void { this.router.navigate(['/doctor/' + path]); }
}
