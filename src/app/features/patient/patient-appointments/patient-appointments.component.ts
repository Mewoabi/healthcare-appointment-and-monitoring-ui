import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../../core/services/app-state.service';
import { AppointmentStore } from '../../../core/stores/appointment.store';
import { DoctorStore } from '../../../core/stores/doctor.store';
import { fmt } from '../../../core/util/format';
import { IconComponent } from '../../../shared/icon/icon.component';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';

type Tab = 'upcoming' | 'past' | 'cancelled';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, StatusTagComponent],
})
export class PatientAppointmentsComponent implements OnInit {
  readonly appointmentStore = inject(AppointmentStore);
  readonly doctorStore = inject(DoctorStore);
  readonly state = inject(AppStateService);
  readonly router = inject(Router);

  fmt = fmt;
  tab = signal<Tab>('upcoming');

  ngOnInit(): void {
    this.appointmentStore.loadAll();
  }

  filtered = computed(() => {
    const t = this.tab();
    return this.appointmentStore.appointments()
      .filter((a) => {
        if (t === 'upcoming') return a.status === 'CONFIRMED' || a.status === 'PENDING' || a.status === 'BOOKED';
        if (t === 'past') return a.status === 'COMPLETED';
        return a.status === 'CANCELLED' || a.status === 'NO_SHOW';
      })
      .sort((a, b) => t === 'upcoming' ? a.scheduledAt.getTime() - b.scheduledAt.getTime() : b.scheduledAt.getTime() - a.scheduledAt.getTime());
  });

  tabs: Array<[Tab, string]> = [['upcoming', 'Upcoming'], ['past', 'Past'], ['cancelled', 'Cancelled']];

  getDoctor(id: number) { return this.doctorStore.getDoctorById(id); }
  openBook(): void { this.router.navigate(['/patient/find-doctor']); }
}
