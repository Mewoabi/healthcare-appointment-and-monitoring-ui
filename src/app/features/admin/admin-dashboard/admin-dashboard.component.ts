import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminStore } from '../../../core/stores/admin.store';
import { fmt } from '../../../core/util/format';
import { IconComponent } from '../../../shared/icon/icon.component';
import { TrendChartComponent } from '../../../shared/trend-chart/trend-chart.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TrendChartComponent],
})
export class AdminDashboardComponent implements OnInit {
  readonly adminStore = inject(AdminStore);
  readonly router = inject(Router);

  fmt = fmt;

  ngOnInit(): void {
    this.adminStore.loadStats();
  }

  stats = computed(() => this.adminStore.stats());

  apptSeries = [58, 64, 71, 65, 78, 92, 41, 52, 73, 78, 81, 85, 68, 89, 95, 78, 88, 94, 102, 87, 76, 84, 91, 99, 82, 71, 88, 92, 87, 87];

  auditRows = [
    ['10:42', 'Dr. Amara Okonkwo', 'UPDATE', 'VitalRecord #VR-2891', '10.0.4.18'],
    ['10:38', 'Maren Holloway', 'CREATE', 'VitalRecord #VR-2891', '82.31.114.6'],
    ['10:30', 'system', 'CREATE', 'Notification #N-9421 (CRITICAL alert)', '—'],
    ['10:14', 'admin@polaris.health', 'UPDATE', 'User #87 (status: ACTIVE)', '10.0.0.5'],
    ['09:58', 'Dr. Henrik Vasquez', 'LOGIN', '—', '78.144.22.91'],
    ['09:46', 'Dr. Pia Sundqvist', 'UPDATE', 'Appointment #A-1124', '78.144.22.110'],
  ];

  distData = [
    { label: 'Patients', value: 1102, color: '#5a6f5a' },
    { label: 'Doctors', value: 142, color: '#c08a2c' },
    { label: 'Admins', value: 4, color: '#3a463e' },
  ];
  distTotal = 1248;

  goto(path: string): void { this.router.navigate(['/admin/' + path]); }
}
