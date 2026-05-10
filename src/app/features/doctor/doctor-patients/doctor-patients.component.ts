import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { DoctorStore } from '../../../core/stores/doctor.store';
import { IconComponent } from '../../../shared/icon/icon.component';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, StatusTagComponent],
})
export class DoctorPatientsComponent implements OnInit {
  readonly doctorStore = inject(DoctorStore);
  search = signal('');

  ngOnInit(): void {
    this.doctorStore.loadPatients(1);
  }

  filtered = computed(() => {
    const s = this.search().toLowerCase();
    return !s ? this.doctorStore.docPatients() : this.doctorStore.docPatients().filter((p) => p.name.toLowerCase().includes(s));
  });
}
