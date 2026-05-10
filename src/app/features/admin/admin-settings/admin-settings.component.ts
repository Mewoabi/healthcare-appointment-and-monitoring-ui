import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusTagComponent } from '../../../shared/status-tag/status-tag.component';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatusTagComponent],
})
export class AdminSettingsComponent {}
