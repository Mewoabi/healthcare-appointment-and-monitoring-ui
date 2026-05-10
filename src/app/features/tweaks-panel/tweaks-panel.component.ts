import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';
import { DoctorStore } from '../../core/stores/doctor.store';
import { Palette, Role } from '../../core/models';
import { IconComponent } from '../../shared/icon/icon.component';

interface PageEntry { id: string; label: string; }

const PAGES_BY_ROLE: Record<Role, PageEntry[]> = {
  patient: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'vitals', label: 'My vitals' },
    { id: 'find-doctor', label: 'Find a doctor' },
    { id: 'profile', label: 'Profile' },
  ],
  doctor: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'patients', label: 'Patients' },
    { id: 'availability', label: 'Availability' },
    { id: 'profile', label: 'Profile' },
  ],
  admin: [
    { id: 'dashboard', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'approvals', label: 'Approvals' },
    { id: 'audit', label: 'Audit log' },
    { id: 'settings', label: 'Settings' },
  ],
};

@Component({
  selector: 'app-tweaks-panel',
  templateUrl: './tweaks-panel.component.html',
  styleUrl: './tweaks-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class TweaksPanelComponent {
  readonly state = inject(AppStateService);
  readonly doctorStore = inject(DoctorStore);
  readonly router = inject(Router);

  open = signal(false);

  pages = computed(() => PAGES_BY_ROLE[this.state.role()]);

  currentPage = computed(() => {
    const segments = this.router.url.split('/').filter(Boolean);
    return segments[segments.length - 1] || 'dashboard';
  });

  roles: Array<[Role, string]> = [['patient', 'Patient'], ['doctor', 'Doctor'], ['admin', 'Admin']];
  palettes: Array<[Palette, string]> = [['sage', 'Sage'], ['ocean', 'Ocean'], ['warm', 'Warm']];

  setRole(role: Role): void {
    this.state.setRole(role);
    this.router.navigate([`/${role}/dashboard`]);
  }

  setPage(pageId: string): void {
    this.router.navigate([`/${this.state.role()}/${pageId}`]);
  }

  setPalette(palette: Palette): void {
    this.state.palette.set(palette);
  }

  openBooking(): void {
    const doctors = this.doctorStore.doctors();
    if (doctors.length) this.state.bookDoctor.set(doctors[0]);
    this.open.set(false);
  }

  openVitals(): void {
    this.state.vitalOpen.set(true);
    this.open.set(false);
  }

  viewLogin(): void {
    this.state.authed.set(false);
    this.open.set(false);
    this.router.navigate(['/auth']);
  }
}
