import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doctor-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Account</div>
          <h1 class="page-title">Profile</h1>
          <p class="page-sub">Dr. Amara Okonkwo · Cardiology · Interventional</p>
        </div>
      </div>
      <div class="panel">
        <div class="row" style="gap: 18px;">
          <div class="doc-photo" style="width: 80px; height: 80px; font-size: 28px;">AO</div>
          <div>
            <div style="font-family: 'Fraunces', serif; font-size: 28px; letter-spacing: -0.02em;">Dr. Amara Okonkwo</div>
            <div style="color: var(--muted); margin-top: 4px;">Cardiology · Interventional</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DoctorProfileComponent {}
