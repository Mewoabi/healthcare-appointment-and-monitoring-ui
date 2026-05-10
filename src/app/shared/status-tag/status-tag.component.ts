import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type StatusKey =
  | 'PENDING' | 'BOOKED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  | 'IN_PROGRESS' | 'NORMAL' | 'WARNING' | 'CRITICAL' | 'ACTIVE' | 'INACTIVE'
  | 'PENDING_APPROVAL';

interface TagConfig { variant: string; label: string; }

const STATUS_MAP: Record<StatusKey, TagConfig> = {
  PENDING: { variant: 'amber', label: 'Pending' },
  BOOKED: { variant: 'sage', label: 'Booked' },
  CONFIRMED: { variant: 'sage', label: 'Confirmed' },
  COMPLETED: { variant: 'ink', label: 'Completed' },
  CANCELLED: { variant: 'clay', label: 'Cancelled' },
  NO_SHOW: { variant: 'clay', label: 'No-show' },
  IN_PROGRESS: { variant: 'amber', label: 'In session' },
  NORMAL: { variant: 'sage', label: 'Normal' },
  WARNING: { variant: 'amber', label: 'Warning' },
  CRITICAL: { variant: 'crimson', label: 'Critical' },
  ACTIVE: { variant: 'sage', label: 'Active' },
  INACTIVE: { variant: 'clay', label: 'Inactive' },
  PENDING_APPROVAL: { variant: 'amber', label: 'Pending' },
};

@Component({
  selector: 'app-status-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="'tag ' + config().variant">
      <span class="dot"></span>
      {{ config().label }}
    </span>
  `,
})
export class StatusTagComponent {
  status = input.required<string>();

  config = computed<TagConfig>(() => {
    return STATUS_MAP[this.status() as StatusKey] ?? { variant: '', label: this.status() };
  });
}
