import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DoctorStore } from '../../../core/stores/doctor.store';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-admin-approvals',
  templateUrl: './admin-approvals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class AdminApprovalsComponent implements OnInit {
  readonly doctorStore = inject(DoctorStore);

  ngOnInit(): void {
    this.doctorStore.pending();
  }

  get pendingDoctors() { return this.doctorStore.doctors(); }

  approve(id: number): void { this.doctorStore.approve(id); }
  reject(id: number): void { this.doctorStore.reject(id); }
}
