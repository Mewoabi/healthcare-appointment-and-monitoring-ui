import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { AppStateService } from '../../../core/services/app-state.service';
import { VitalStore } from '../../../core/stores/vital.store';
import { fmt } from '../../../core/util/format';
import { IconComponent } from '../../../shared/icon/icon.component';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';
import { TrendChartComponent } from '../../../shared/trend-chart/trend-chart.component';

type MetricKey = 'systolicBP' | 'diastolicBP' | 'heartRate' | 'weight' | 'temperature' | 'oxygenSaturation';
type RangeKey = '7d' | '30d';

interface Metric { key: MetricKey; label: string; unit: string; color: string; }

@Component({
  selector: 'app-patient-vitals',
  templateUrl: './patient-vitals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, StatusTagComponent, TrendChartComponent],
})
export class PatientVitalsComponent implements OnInit {
  readonly vitalStore = inject(VitalStore);
  readonly state = inject(AppStateService);

  fmt = fmt;
  metric = signal<MetricKey>('systolicBP');
  range = signal<RangeKey>('30d');

  metrics: Metric[] = [
    { key: 'systolicBP', label: 'Systolic BP', unit: 'mmHg', color: '#c2614a' },
    { key: 'diastolicBP', label: 'Diastolic BP', unit: 'mmHg', color: '#a13a2c' },
    { key: 'heartRate', label: 'Heart rate', unit: 'bpm', color: '#3d4f3d' },
    { key: 'weight', label: 'Weight', unit: 'kg', color: '#5a6f5a' },
    { key: 'temperature', label: 'Temperature', unit: '°C', color: '#c08a2c' },
    { key: 'oxygenSaturation', label: 'SpO₂', unit: '%', color: '#5a6f5a' },
  ];

  ngOnInit(): void {
    this.vitalStore.load(101);
  }

  recent = computed(() => this.vitalStore.vitals()[0]);

  series = computed(() => {
    const days = this.range() === '7d' ? 7 : 30;
    const key = this.metric();
    return this.vitalStore.vitals().slice(0, days).map((v) => v[key] as number).reverse();
  });

  activeMetric = computed(() => this.metrics.find((m) => m.key === this.metric())!);

  openVital(): void { this.state.vitalOpen.set(true); }
}
