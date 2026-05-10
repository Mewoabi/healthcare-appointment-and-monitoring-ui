import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { AvailabilityStore } from '../../../core/stores/availability.store';
import { IconComponent } from '../../../shared/icon/icon.component';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, StatusTagComponent],
})
export class DoctorAvailabilityComponent implements OnInit {
  readonly availabilityStore = inject(AvailabilityStore);

  ngOnInit(): void {
    this.availabilityStore.load(1);
  }

  slots = computed(() => this.availabilityStore.slots());
}
