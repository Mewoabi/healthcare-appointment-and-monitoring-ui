import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';
import { IconComponent } from '../../shared/icon/icon.component';
import { Role } from '../../core/models';
import { BookingModalComponent } from '../../features/modals/booking-modal/booking-modal.component';
import { VitalEntryModalComponent } from '../../features/modals/vital-entry-modal/vital-entry-modal.component';
import { NotifPanelComponent } from '../../features/modals/notif-panel/notif-panel.component';
import { TweaksPanelComponent } from '../../features/tweaks-panel/tweaks-panel.component';
import { AuthStore } from '../../core/stores/auth.store';
import { NotificationStore } from '../../core/stores/notification.store';
import { DoctorStore } from '../../core/stores/doctor.store';

interface NavSection { section: string; }
interface NavItem { id: string; icon: string; label: string; count?: number; }
type NavEntry = NavSection | NavItem;

function isSection(e: NavEntry): e is NavSection { return 'section' in e; }

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent, BookingModalComponent, VitalEntryModalComponent, NotifPanelComponent, TweaksPanelComponent],
})
export class ShellComponent implements OnInit {
  readonly state = inject(AppStateService);
  readonly authStore = inject(AuthStore);
  readonly notificationStore = inject(NotificationStore);
  readonly doctorStore = inject(DoctorStore);
  readonly router = inject(Router);

  isSection = isSection;

  navByRole: Record<Role, NavEntry[]> = {
    patient: [
      { section: 'Care' },
      { id: 'dashboard', icon: 'home', label: 'Dashboard' },
      { id: 'appointments', icon: 'calendar', label: 'Appointments', count: 3 },
      { id: 'vitals', icon: 'activity', label: 'My vitals' },
      { id: 'find-doctor', icon: 'search', label: 'Find a doctor' },
      { section: 'Account' },
      { id: 'profile', icon: 'user', label: 'Profile' },
    ],
    doctor: [
      { section: 'Practice' },
      { id: 'dashboard', icon: 'home', label: 'Dashboard' },
      { id: 'calendar', icon: 'calendar', label: 'Calendar' },
      { id: 'patients', icon: 'users', label: 'Patients', count: 142 },
      { id: 'availability', icon: 'clock', label: 'Availability' },
      { section: 'Account' },
      { id: 'profile', icon: 'user', label: 'Profile' },
    ],
    admin: [
      { section: 'Operations' },
      { id: 'dashboard', icon: 'home', label: 'Overview' },
      { id: 'users', icon: 'users', label: 'Users', count: 1248 },
      { id: 'approvals', icon: 'shield', label: 'Approvals', count: 1 },
      { id: 'audit', icon: 'file', label: 'Audit log' },
      { section: 'System' },
      { id: 'settings', icon: 'settings', label: 'Settings' },
    ],
  };

  nav = computed(() => this.navByRole[this.state.role()]);

  identity = computed(() => {
    const user = this.authStore.currentUser();
    if (user) return { name: user.name, initials: user.name.split(' ').map((n) => n[0]).slice(0, 2).join('') };
    const r = this.state.role();
    if (r === 'patient') return { name: 'Maren Holloway', initials: 'MH' };
    if (r === 'doctor') return { name: 'Dr. Amara Okonkwo', initials: 'AO' };
    return { name: 'Admin · Tessa K.', initials: 'TK' };
  });

  roleTag = computed(() => {
    const r = this.state.role();
    if (r === 'patient') return 'Patient portal';
    if (r === 'doctor') return 'Clinician';
    return 'Operations';
  });

  unreadCount = computed(() => this.notificationStore.unreadCount());

  roleLinks: Array<[Role, string]> = [
    ['patient', 'Patient · Maren'],
    ['doctor', 'Doctor · Dr. Okonkwo'],
    ['admin', 'Admin · Tessa'],
  ];

  ngOnInit(): void {
    this.notificationStore.load();
    this.doctorStore.load();
  }

  navItemPath(id: string): string {
    return `/${this.state.role()}/${id}`;
  }

  setRole(role: Role): void {
    this.state.setRole(role);
    this.router.navigate([`/${role}/dashboard`]);
  }

  signOut(): void {
    this.authStore.logout();
    this.state.authed.set(false);
  }

  toggleNotif(e: Event): void {
    e.stopPropagation();
    this.state.showNotif.update((v) => !v);
  }

  closeNotif(): void {
    this.state.showNotif.set(false);
  }
}
