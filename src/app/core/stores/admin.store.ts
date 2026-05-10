import { inject, Injectable, signal } from '@angular/core';
import { ADMIN_API } from '../api/admin.api';
import { AdminStats, AdminUser, AuditLog } from '../models';

@Injectable({ providedIn: 'root' })
export class AdminStore {
  private readonly api = inject(ADMIN_API);

  readonly stats = signal<AdminStats | null>(null);
  readonly users = signal<AdminUser[]>([]);
  readonly auditLogs = signal<AuditLog[]>([]);
  readonly loading = signal(false);

  loadStats(): void {
    this.loading.set(true);
    this.api.stats().subscribe({
      next: (s) => { this.stats.set(s); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  loadUsers(): void {
    this.loading.set(true);
    this.api.users().subscribe({
      next: (list) => { this.users.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  loadAudit(): void {
    this.loading.set(true);
    this.api.auditLogs().subscribe({
      next: (list) => { this.auditLogs.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
