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
  readonly darkMode = signal(localStorage.getItem('dark') === '1');

  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      this.applyPalette(this.palette());
    });
    effect(() => {
      this.applyDark(this.darkMode());
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

  toggleDark(): void {
    this.darkMode.update(v => !v);
  }

  private applyDark(dark: boolean): void {
    const root = document.documentElement;
    localStorage.setItem('dark', dark ? '1' : '0');
    if (dark) {
      root.classList.add('dark');
      root.style.setProperty('--bg', '#0d1525');
      root.style.setProperty('--surface', '#162038');
      root.style.setProperty('--ink', '#e4ecf8');
      root.style.setProperty('--ink-2', '#a8bcd8');
      root.style.setProperty('--muted', '#7a8aae');
      root.style.setProperty('--line', '#1e3058');
      root.style.setProperty('--line-soft', '#162444');
      root.style.setProperty('--sage', '#5aa0e0');
      root.style.setProperty('--sage-deep', '#4a90d0');
      root.style.setProperty('--sage-soft', '#2a4870');
      root.style.setProperty('--sage-tint', '#162440');
      root.style.setProperty('--shadow', '0 1px 0 rgba(0,0,0,0.3), 0 8px 24px -12px rgba(0,0,0,0.5)');
    } else {
      root.classList.remove('dark');
      root.style.removeProperty('--bg');
      root.style.removeProperty('--surface');
      root.style.removeProperty('--ink');
      root.style.removeProperty('--ink-2');
      root.style.removeProperty('--muted');
      root.style.removeProperty('--line');
      root.style.removeProperty('--line-soft');
      root.style.removeProperty('--shadow');
      // Re-apply palette to restore accent colours
      this.applyPalette(this.palette());
    }
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
      root.style.setProperty('--sage', '#4a8fd4');
      root.style.setProperty('--sage-deep', '#1e52a0');
      root.style.setProperty('--sage-soft', '#9ec4e8');
      root.style.setProperty('--sage-tint', '#ddeeff');
    }
  }
}
