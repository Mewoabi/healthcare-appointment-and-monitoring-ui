import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { AdminStore } from '../../../core/stores/admin.store';
import { IconComponent } from '../../../shared/icon/icon.component';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';

type RoleFilter = 'All' | 'Patient' | 'Doctor' | 'Admin';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, StatusTagComponent],
})
export class AdminUsersComponent implements OnInit {
  readonly adminStore = inject(AdminStore);
  search = signal('');
  role = signal<RoleFilter>('All');

  roleFilters: RoleFilter[] = ['All', 'Patient', 'Doctor', 'Admin'];

  ngOnInit(): void {
    this.adminStore.loadUsers();
  }

  filtered = computed(() => {
    const s = this.search().toLowerCase();
    const r = this.role();
    return this.adminStore.users().filter((u) =>
      (r === 'All' || u.role === r.toUpperCase()) &&
      (!s || u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s))
    );
  });

  statusKey(status: string): string {
    return status === 'PENDING' ? 'PENDING_APPROVAL' : status;
  }

  initials(name: string): string {
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('');
  }
}
