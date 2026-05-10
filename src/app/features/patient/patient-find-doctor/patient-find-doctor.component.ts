import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { AppStateService } from '../../../core/services/app-state.service';
import { DoctorStore } from '../../../core/stores/doctor.store';
import { Doctor } from '../../../core/models';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-patient-find-doctor',
  templateUrl: './patient-find-doctor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class PatientFindDoctorComponent implements OnInit {
  readonly doctorStore = inject(DoctorStore);
  readonly state = inject(AppStateService);

  search = signal('');
  filter = signal('All');

  ngOnInit(): void {
    this.doctorStore.load();
  }

  activeSpecs = computed(() => {
    const s = new Set(this.doctorStore.doctors().filter((d) => d.status === 'ACTIVE').map((d) => d.specialization));
    return ['All', ...Array.from(s)];
  });

  doctors = computed(() => {
    const s = this.search().toLowerCase();
    const f = this.filter();
    return this.doctorStore.doctors().filter((d) =>
      d.status === 'ACTIVE' &&
      (f === 'All' || d.specialization === f) &&
      (!s || d.name.toLowerCase().includes(s))
    );
  });

  openBook(d: Doctor): void { this.state.bookDoctor.set(d); }
}
