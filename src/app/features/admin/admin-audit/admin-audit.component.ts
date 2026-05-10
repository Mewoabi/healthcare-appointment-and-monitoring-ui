import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AdminStore } from '../../../core/stores/admin.store';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-admin-audit',
  templateUrl: './admin-audit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class AdminAuditComponent implements OnInit {
  readonly adminStore = inject(AdminStore);

  tones: Record<string, string> = {
    CREATE: 'sage', UPDATE: 'amber', DELETE: 'clay', LOGIN: 'ink', LOGOUT: 'ink', READ: '',
  };

  ngOnInit(): void {
    this.adminStore.loadAudit();
  }

  get rows() { return this.adminStore.auditLogs(); }
}
