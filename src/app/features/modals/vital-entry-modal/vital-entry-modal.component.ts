import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertLevel } from '../../../core/models';
import { fmt, TODAY } from '../../../core/util/format';
import { IconComponent } from '../../../shared/icon/icon.component';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';

interface Vitals {
  sys: number; dia: number; hr: number; temp: number;
  spo2: number; weight: number; height: number;
}

@Component({
  selector: 'app-vital-entry-modal',
  templateUrl: './vital-entry-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, FormsModule, StatusTagComponent],
})
export class VitalEntryModalComponent {
  close = output<void>();
  confirm = output<AlertLevel>();

  vitals = signal<Vitals>({ sys: 124, dia: 80, hr: 72, temp: 36.7, spo2: 98, weight: 64.0, height: 168 });

  bmi = computed(() => {
    const v = this.vitals();
    return v.weight && v.height ? (v.weight / ((v.height / 100) ** 2)).toFixed(1) : '—';
  });

  level = computed<AlertLevel>(() => {
    const v = this.vitals();
    if (v.sys >= 180 || v.dia >= 100 || v.spo2 < 90) return 'CRITICAL';
    if (v.sys >= 140 || v.dia >= 90 || v.spo2 < 95) return 'WARNING';
    return 'NORMAL';
  });

  dateTimeLabel = fmt.dateLong(TODAY) + ' · ' + fmt.hour24(TODAY);

  alertBg = computed(() => {
    const l = this.level();
    if (l === 'NORMAL') return 'var(--sage-tint)';
    if (l === 'WARNING') return '#fdf5e3';
    return '#fbeae5';
  });

  alertBorder = computed(() => {
    const l = this.level();
    if (l === 'NORMAL') return 'var(--sage-soft)';
    if (l === 'WARNING') return '#ecdab2';
    return '#e9bfb6';
  });

  alertColor = computed(() => {
    const l = this.level();
    if (l === 'NORMAL') return 'var(--sage-deep)';
    if (l === 'WARNING') return '#6e4c10';
    return 'var(--crimson)';
  });

  alertIcon = computed(() => this.level() === 'NORMAL' ? 'check' : 'flag');

  alertText = computed(() => {
    const l = this.level();
    if (l === 'NORMAL') return 'All values within reference ranges.';
    if (l === 'WARNING') return 'One or more values outside the normal range. Your treating doctor will be notified by email.';
    return 'Critical reading detected. Patient + treating doctor will be alerted immediately by email and SMS.';
  });

  updateField(key: keyof Vitals, value: number): void {
    this.vitals.update((v) => ({ ...v, [key]: value }));
  }

  save(): void {
    this.confirm.emit(this.level());
  }
}
