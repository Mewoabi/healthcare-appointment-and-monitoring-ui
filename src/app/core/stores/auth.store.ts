import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_API } from '../api/auth.api';
import { AuthUser, Role } from '../models';

const TOKEN_KEY = 'polaris.jwt';
const USER_KEY = 'polaris.user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly api = inject(AUTH_API);
  private readonly router = inject(Router);

  readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly currentUser = signal<AuthUser | null>(this.loadStoredUser());
  readonly loading = signal(false);

  readonly isAuthed = computed(() => !!this.token());
  readonly role = computed<Role | null>(() => {
    const u = this.currentUser();
    if (!u) return null;
    return u.role.toLowerCase() as Role;
  });

  login(email: string, password: string): void {
    this.loading.set(true);
    this.api.login(email, password).subscribe({
      next: (res) => {
        this.persist(res.token, res.user);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  register(name: string, email: string, password: string, role: string): void {
    this.loading.set(true);
    this.api.register(name, email, password, role).subscribe({
      next: (res) => {
        this.persist(res.token, res.user);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  logout(): void {
    this.api.logout().subscribe();
    this.clearAuth();
    this.router.navigate(['/auth']);
  }

  bootstrap(): Promise<void> {
    const t = this.token();
    if (!t) return Promise.resolve();
    return new Promise((resolve) => {
      this.api.me().subscribe({
        next: (user) => {
          this.currentUser.set(user);
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          resolve();
        },
        error: () => {
          this.clearAuth();
          resolve();
        },
      });
    });
  }

  clearAuth(): void {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  private persist(token: string, user: AuthUser): void {
    this.token.set(token);
    this.currentUser.set(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private loadStoredUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
