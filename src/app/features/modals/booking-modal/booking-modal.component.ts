import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingData, Doctor } from '../../../core/models';
import { addDays, fmt, TODAY } from '../../../core/util/format';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, FormsModule],
})
export class BookingModalComponent {
  doctor = input.required<Doctor>();
  close = output<void>();
  confirm = output<BookingData>();

  step = signal(1);
  selectedDate = signal(2);
  selectedSlot = signal<string | null>(null);
  reason = signal('');
  virtual = signal(false);

  readonly slots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
  readonly taken = ['09:30', '11:30', '13:00', '15:30'];

  dateOptions = computed(() =>
    [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(TODAY, i, 9))
  );

  fmtDay = fmt.day;
  fmtDateLong = fmt.dateLong;

  canContinue = computed(() => {
    if (this.step() === 1) return this.selectedSlot() !== null;
    return true;
  });

  next(): void {
    if (this.step() < 3) this.step.update((s) => s + 1);
  }

  back(): void {
    if (this.step() > 1) this.step.update((s) => s - 1);
  }

  submit(): void {
    this.confirm.emit({
      doctor: this.doctor(),
      date: this.dateOptions()[this.selectedDate()],
      slot: this.selectedSlot() ?? '14:00',
      reason: this.reason(),
      virtual: this.virtual(),
    });
  }
}
