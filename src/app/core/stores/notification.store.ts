import { inject, Injectable, signal } from '@angular/core';
import { NOTIFICATION_API } from '../api/notification.api';
import { Notification } from '../models';

@Injectable({ providedIn: 'root' })
export class NotificationStore {
  private readonly api = inject(NOTIFICATION_API);

  readonly notifications = signal<Notification[]>([]);
  readonly unreadCount = signal(0);
  readonly loading = signal(false);

  load(): void {
    this.loading.set(true);
    this.api.mine().subscribe({
      next: (list) => {
        this.notifications.set(list);
        this.unreadCount.set(list.filter((n) => n.unread).length);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  markRead(id: number): void {
    this.api.markRead(id).subscribe({
      next: () => {
        this.notifications.update((list) => list.map((n) => n.id === id ? { ...n, unread: false } : n));
        this.unreadCount.update((c) => Math.max(0, c - 1));
      },
    });
  }

  markAllRead(): void {
    this.api.markAllRead().subscribe({
      next: () => {
        this.notifications.update((list) => list.map((n) => ({ ...n, unread: false })));
        this.unreadCount.set(0);
      },
    });
  }
}
