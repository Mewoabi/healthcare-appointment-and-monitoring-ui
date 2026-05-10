import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';
import { AuthStore } from '../../core/stores/auth.store';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, FormsModule],
})
export class AuthComponent {
  private readonly state = inject(AppStateService);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  email = signal('maren.h@example.com');
  password = signal('demo');

  login(): void {
    const email = this.email();
    const password = this.password();
    this.authStore.login(email, password);

    const sub = setInterval(() => {
      if (this.authStore.isAuthed()) {
        clearInterval(sub);
        const role = this.authStore.role();
        if (role) this.state.setRole(role);
        this.state.authed.set(true);
        this.router.navigate([`/${role ?? 'patient'}/dashboard`]);
      }
      if (!this.authStore.loading()) {
        clearInterval(sub);
      }
    }, 50);
  }
}
