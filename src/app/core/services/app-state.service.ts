import { Injectable, signal, effect } from '@angular/core';
import { Doctor, Palette, Role } from '../models';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  readonly authed = signal(true);
  readonly role = signal<Role>('patient');
  readonly bookDoctor = signal<Doctor | null>(null);
  readonly vitalOpen = signal(false);
  readonly showNotif = signal(false);
  readonly toast = signal<string | null>(null);
  readonly palette = signal<Palette>('sage');

  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      this.applyPalette(this.palette());
    });
  }

  showToast(message: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(null), 3500);
  }

  setRole(role: Role): void {
    this.role.set(role);
  }

  private applyPalette(p: Palette): void {
    const root = document.documentElement;
    if (p === 'ocean') {
      root.style.setProperty('--sage', '#3a6f7a');
      root.style.setProperty('--sage-deep', '#1f4a55');
      root.style.setProperty('--sage-soft', '#b3cdd2');
      root.style.setProperty('--sage-tint', '#d8e6e9');
    } else if (p === 'warm') {
      root.style.setProperty('--sage', '#9a5a3c');
      root.style.setProperty('--sage-deep', '#6b3a22');
      root.style.setProperty('--sage-soft', '#e3c9b9');
      root.style.setProperty('--sage-tint', '#f2e3d6');
    } else {
      root.style.setProperty('--sage', '#5a6f5a');
      root.style.setProperty('--sage-deep', '#3d4f3d');
      root.style.setProperty('--sage-soft', '#c9d3c1');
      root.style.setProperty('--sage-tint', '#e6ebde');
    }
  }
}
