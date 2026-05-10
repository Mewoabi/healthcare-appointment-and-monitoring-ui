import { ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, OnInit, output } from '@angular/core';
import { NotificationStore } from '../../../core/stores/notification.store';
import { IconComponent } from '../../../shared/icon/icon.component';

const ICON_MAP: Record<string, string> = {
  appt: 'calendar',
  vital: 'activity',
  alert: 'flag',
  system: 'shield',
};

@Component({
  selector: 'app-notif-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <div class="notif-pop">
      <div style="padding: 14px 16px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center;">
        <div style="font-family: 'Fraunces', serif; font-size: 18px; letter-spacing: -0.01em;">Notifications</div>
        <button class="btn ghost" style="font-size: 11px; padding: 4px 8px;" (click)="markAllRead()">Mark all read</button>
      </div>
      @for (n of notificationStore.notifications(); track n.id) {
        <div [class]="'notif-row' + (n.unread ? ' unread' : '')">
          <div class="notif-icon">
            <app-icon [name]="iconFor(n.kind)" [size]="14" />
          </div>
          <div class="notif-text" style="flex: 1;">
            <div class="ttl">
              {{ n.title }}
              @if (n.unread) {
                <span class="notif-dot" style="display: inline-block; margin-left: 6px; vertical-align: middle;"></span>
              }
            </div>
            <div style="color: var(--muted); font-size: 12px; margin-top: 2px;">{{ n.message }}</div>
            <div class="when">{{ n.when }} · {{ typeLabel(n.type) }}</div>
          </div>
        </div>
      }
      <div style="padding: 12px; text-align: center; border-top: 1px solid var(--line-soft);">
        <button class="btn ghost" style="width: 100%; justify-content: center; font-size: 12px;">View all →</button>
      </div>
    </div>
  `,
})
export class NotifPanelComponent implements OnInit, OnDestroy {
  readonly notificationStore = inject(NotificationStore);
  close = output<void>();

  private readonly el = inject(ElementRef);
  private handler!: (e: Event) => void;

  ngOnInit(): void {
    this.handler = (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) this.close.emit();
    };
    setTimeout(() => document.addEventListener('click', this.handler), 0);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handler);
  }

  markAllRead(): void { this.notificationStore.markAllRead(); }
  iconFor(kind: string): string { return ICON_MAP[kind] ?? 'bell'; }

  typeLabel(type: string): string {
    if (type === 'EMAIL') return 'Email';
    if (type === 'SMS') return 'SMS';
    return 'In-app';
  }
}
