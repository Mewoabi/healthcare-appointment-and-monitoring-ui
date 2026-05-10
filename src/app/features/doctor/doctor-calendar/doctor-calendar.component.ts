import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AppointmentStore } from '../../../core/stores/appointment.store';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-doctor-calendar',
  templateUrl: './doctor-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class DoctorCalendarComponent implements OnInit {
  readonly appointmentStore = inject(AppointmentStore);

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dates = ['May 4', 'May 5', 'May 6', 'May 7', 'May 8', 'May 9', 'May 10'];
  hours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  ngOnInit(): void {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1).toISOString();
    const to = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 8).toISOString();
    this.appointmentStore.loadCalendar(1, from, to);
  }

  get events() { return this.appointmentStore.calendarEvents(); }

  eventTop(e: { hour: number }): string { return `${(e.hour - 8) * 64 + 4}px`; }
  eventHeight(e: { dur: number }): string { return `${e.dur * 64 - 8}px`; }
  eventLeft(e: { day: number }): string { return `calc(60px + ${e.day} * (100% - 60px) / 7 + 4px)`; }
  eventWidth(): string { return `calc((100% - 60px) / 7 - 8px)`; }
}
